import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

import { useLoadPrices } from '../../../hooks/useLoadPrices';
import { useStripeForm } from '../../../hooks/useStripeForm';
import { SubscriptionType } from '../../../models/interface';
import Loading from '../../../ui/Loading/Loading';
import PlanSelection from './PlanSelection';
import SubscriptionForm from './SubscriptionForm';

type SubscriptionFormLayoutProps = {
  subscriptionType: SubscriptionType;
};

type Status = 'trialing' | 'succeeded';

const SubscriptionFormLayout = ({
  subscriptionType,
}: SubscriptionFormLayoutProps) => {
  const { data, isLoading, error } = useLoadPrices();

  const status: Status = useMemo(
    () => (subscriptionType === 'freeTrial' ? 'trialing' : 'succeeded'),
    [subscriptionType]
  );

  const {
    product,
    setProduct,
    errorMessage,
    isFormProcessing,
    existingCustomer,
    subscription,
    userData,
    handleChange,
    submitHandler,
  } = useStripeForm({ subscriptionType });

  if (error) return null;

  return isLoading ? (
    <Loading />
  ) : (
    <div className="plan">
      <PlanSelection data={data} setProduct={setProduct} />
      {product ? (
        <>
          {subscription.status === status ? (
            <Navigate to={`/customer/${subscription.customer}`} />
          ) : null}
          <SubscriptionForm
            errorMessage={errorMessage}
            existingCustomer={existingCustomer}
            handleChange={handleChange}
            isFormProcessing={isFormProcessing}
            product={product}
            setProduct={setProduct}
            submitHandler={submitHandler}
            userData={userData}
          />
        </>
      ) : null}
    </div>
  );
};

export default SubscriptionFormLayout;
