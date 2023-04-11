import { PropsWithChildren } from 'react';
import GlobalStyles from './components/GlobalStyles';
import Header from './component/Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyles />
      <Header />
      <main className='main'>{children}</main>
    </>
  );
};

export default Layout;
