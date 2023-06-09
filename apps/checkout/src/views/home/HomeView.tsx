import { Link } from 'react-router-dom';

const HomeView = () => (
  <div className='home'>
    <h1>Choose one of the following:</h1>
    <div className='flex'>
      <Link to='/checkout'>Checkout</Link>
      <Link to='/elements/free-trial'>Elements Free Trial</Link>
      <Link to='/elements/no-trial'>Elements No Trial</Link>
    </div>
  </div>
);

export default HomeView;
