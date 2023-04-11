import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeView from '../views/home';

const StripeElementsFreeTrial = lazy(
  () => import('../views/elements/SubscriptionFormFreeTrial')
);
const StripeElementsNoTrial = lazy(
  () => import('../views/elements/SubscriptionFormNoTrial')
);
const StripeCheckout = lazy(() => import('../views/checkout/StripeCheckout'));
const CustomerDashboard = lazy(
  () => import('../views/customer/CustomerDashboard')
);
const SubscriptionSuccess = lazy(
  () => import('../views/subscription-success/SubscriptionSuccess')
);

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />

      <Route path="/checkout" element={<StripeCheckout />} />

      <Route path="/elements/*">
        <Route path="free-trial" element={<StripeElementsFreeTrial />} />

        <Route path="no-trial" element={<StripeElementsNoTrial />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>

      <Route path="/customer/:customerId" element={<CustomerDashboard />} />

      <Route path="/subscription-success" element={<SubscriptionSuccess />} />

      <Route path="*" element={<HomeView />} />
    </Routes>
  );
};

export default AppRouter;
