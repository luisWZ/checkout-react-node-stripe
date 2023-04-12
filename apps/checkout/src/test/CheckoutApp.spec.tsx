import { render } from '@testing-library/react';

import CheckoutApp from '../CheckoutApp';

describe('CheckoutApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CheckoutApp />);
    expect(baseElement).toBeTruthy();
  });

  // it("should have a greeting as the title", () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   );
  //   expect(getByText(/Welcome checkout/gi)).toBeTruthy();
  // });
});
