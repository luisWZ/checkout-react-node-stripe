import { faker } from '@faker-js/faker/locale/es_MX';

import { useLoadPrices } from '../../hooks/useLoadPrices';
import Loading from '../../ui/Loading/Loading';

const userId = faker.datatype.uuid();
const email = faker.internet.email().toLowerCase();

const StripeCheckout = () => {
  const { data, isLoading, error } = useLoadPrices();

  if (error) return null;

  return isLoading ? (
    <Loading />
  ) : (
    <div className="plans">
      <h1>Choose a plan:</h1>
      <div className="plans__selection">
        {data?.length
          ? data.map((price) => (
              <form
                className="plans__plan"
                key={price.id}
                action="/api/create-checkout-session"
                method="POST"
              >
                <p>{price.product?.name}</p>
                <p>{price.nickname}</p>
                <p>
                  ${price.unit_amount / 100} / {price.recurring?.interval}{' '}
                  <small>(mxn)</small>
                </p>

                <input type="hidden" name="price" value={price.id} />
                <input type="hidden" name="email" value={email} />
                <input type="hidden" name="userId" value={userId} />
                <button>Select</button>
              </form>
            ))
          : null}
      </div>
    </div>
  );
};

export default StripeCheckout;
