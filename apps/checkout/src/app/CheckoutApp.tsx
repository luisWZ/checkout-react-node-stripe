import '../styles/normalize.scss';
import '../styles/styles.scss';

import { Suspense } from 'react';

import Layout from '../ui/Layout';
import Loading from '../ui/Loading';
import AppRouter from '../router/AppRouter';
import { BrowserRouter } from 'react-router-dom';

const CheckoutApp = () => {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Layout>
          <AppRouter />
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
};

export default CheckoutApp;
