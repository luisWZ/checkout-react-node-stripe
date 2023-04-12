import { Price, Product } from '@checkout-stripe/interface';

import { StateProduct } from '../../../models/interface';

type PlanSelectionProps = {
  setProduct: StateProduct['setProduct'];
  data: Price[];
};

const PlanSelection = ({ data, setProduct }: PlanSelectionProps) => {
  return (
    <div className="plans">
      <h1>Choose a plan:</h1>
      <div className="plans__selection">
        {data?.length
          ? data.map((price) => (
              <div className="plans__plan" key={price.id}>
                <p>{price.product?.name}</p>
                <p>
                  ${price.unit_amount / 100} / {price.recurring?.interval}{' '}
                  <small>(mxn)</small>
                </p>
                <button
                  onClick={() =>
                    setProduct({
                      priceId: price.id,
                      name: price.product?.name,
                      amount: price.unit_amount,
                      interval: price.recurring?.interval,
                    } as Product)
                  }
                >
                  Select
                </button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default PlanSelection;
