import { Product } from '@checkout-stripe/interface';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

import {
  apiCreateFreeTrialSubscription,
  apiCreateNoTrialSubscription,
  apiSetupIntent,
} from '../api/stripeApi';
import { generateFakeUserData } from '../helpers';
import type { UserData } from '../models/interface';
import {
  OnInputChange,
  OnSubmit,
  SubscriptionState,
  SubscriptionType,
} from '../models/interface';

type UseStripeFormProps = {
  subscriptionType: SubscriptionType;
};

const { userId, user } = generateFakeUserData();

export const useStripeForm = ({ subscriptionType }: UseStripeFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [product, setProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFormProcessing, setIsFormProcessing] = useState(false);
  const [existingCustomer, setExistingCustomer] = useState(null);
  const [subscription, setSubscription] = useState<SubscriptionState>({
    status: false,
    customer: '',
  });
  const [userData, setUserData] = useState<UserData>({
    name: user.name,
    email: user.email,
  });

  const handleChange: OnInputChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({ ...userData, [name]: value });
  };

  const submitHandler = selectSubmit(subscriptionType);

  return {
    product,
    setProduct,
    errorMessage,
    isFormProcessing,
    existingCustomer,
    subscription,
    userData,
    handleChange,
    submitHandler,
  };

  function selectSubmit(subscriptionType: SubscriptionType) {
    return subscriptionType === 'freeTrial'
      ? submitHandlerFreeTrial()
      : submitHandlerNoTrial();
  }

  function submitHandlerNoTrial(): OnSubmit {
    return async (evt) => {
      evt.preventDefault();

      const name = userData.name;
      const email = userData.email;

      setErrorMessage('');

      if (!stripe || !elements || !product) {
        return;
      }

      if (!email) {
        setErrorMessage('Please provide an email');
        return;
      }

      setIsFormProcessing(true);

      try {
        const { clientSecret, customerId, customerExist } =
          await apiCreateNoTrialSubscription({
            name,
            email,
            userId,
            priceId: product.priceId,
          });

        if (customerExist) {
          setIsFormProcessing(false);
          setExistingCustomer(customerExist);
          return;
        } else {
          setExistingCustomer(null);
        }

        const card = elements.getElement(CardElement);
        if (!card) return;

        const cardOptions = {
          payment_method: {
            card,
            billing_details: {
              name,
              email,
            },
          },
        };

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          cardOptions
        );

        if (error) throw error;

        setIsFormProcessing(false);

        if (paymentIntent.status === 'succeeded') {
          console.log('paymentIntent', paymentIntent);

          setSubscription({
            status: paymentIntent.status,
            customer: customerId,
          });
        }
      } catch (error) {
        setIsFormProcessing(false);
        setErrorMessage((error as Error).message);
        return;
      }
    };
  }

  function submitHandlerFreeTrial(): OnSubmit {
    return async (evt) => {
      evt.preventDefault();

      const name = userData.name;
      const email = userData.email;

      setErrorMessage('');

      if (!stripe || !elements) return;

      const card = elements.getElement(CardElement);

      if (!card) return;

      if (!email) {
        setErrorMessage('Please provide an email');
        return;
      }

      setIsFormProcessing(true);

      try {
        const { clientSecret, customerId, customerExist } =
          await apiSetupIntent({
            name,
            email,
            userId,
          });

        if (customerExist) {
          setExistingCustomer(customerExist);
          throw new Error('Customer already registered');
        }

        setExistingCustomer(null);

        const { error, setupIntent } = await stripe.confirmCardSetup(
          clientSecret,
          {
            payment_method: {
              card,
              billing_details: {
                name,
                email,
              },
            },
          }
        );

        if (error) throw error;

        if (setupIntent.status === 'succeeded') {
          console.log('setupIntent', setupIntent);

          const subscription = await apiCreateFreeTrialSubscription({
            userId,
            email,
            customerId,
            paymentMethod: setupIntent.payment_method as string,
            priceId: product?.priceId as string,
          });

          console.log('subscription', subscription);

          setSubscription({
            status: subscription?.status as string,
            customer: subscription?.customer as string,
          });

          setIsFormProcessing(false);
        }
      } catch (error) {
        setErrorMessage((error as Error).message);
      } finally {
        setIsFormProcessing(false);
      }
    };
  }
};
