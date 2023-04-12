import { CardElement } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

import type {
  OnInputChange,
  OnSubmit,
  StateProduct,
  UserData,
} from '../../../models/interface';
import ButtonSubmit from './ButtonSubmit';
import TestCards from './TestCards';

type SubscriptionFormProps = {
  errorMessage: string | null;
  existingCustomer: Record<string, string> | null;
  handleChange: OnInputChange;
  isFormProcessing: boolean;
  product: StateProduct['product'];
  setProduct: StateProduct['setProduct'];
  submitHandler: OnSubmit;
  userData: UserData;
};

const SubscriptionForm = ({
  errorMessage,
  existingCustomer,
  handleChange,
  isFormProcessing,
  product,
  setProduct,
  submitHandler,
  userData,
}: SubscriptionFormProps) => {
  const closeForm = () => !isFormProcessing && setProduct(null);

  return (
    <div className="overlay" onClick={closeForm}>
      <div className="sidebar" onClick={(evt) => evt.stopPropagation()}>
        <button disabled={isFormProcessing} className="close-btn" type="button" onClick={closeForm}>
          &times;
        </button>
        <form onSubmit={submitHandler}>
          <h1>Checkout</h1>
          <h3>Subscription:</h3>
          <p className="bg-gray">
            {product?.name}:&ensp;${(product?.amount ?? 0) / 100} /{' '}
            {product?.interval}
          </p>
          <h3>Payment info:</h3>
          <div>
            <input
              onChange={handleChange}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="name"
              value={userData.name}
              required
            />
          </div>
          <div>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={userData.email}
              required
            />
          </div>
          <div>
            <CardElement />
          </div>
          <ButtonSubmit
            disableListener={isFormProcessing}
            formIncomplete={!userData.email || !userData.name}
          >
            Subscribe me
          </ButtonSubmit>
        </form>
        {errorMessage ? (
          <div className="error-msg" id="card-errors" role="alert">
            {errorMessage}
          </div>
        ) : null}
        {existingCustomer ? (
          <Link
            className="existing-customer"
            to={`/customer/${existingCustomer}`}
          >
            Manage subscription
          </Link>
        ) : null}
        <TestCards />
      </div>
    </div>
  );
};

export default SubscriptionForm;
