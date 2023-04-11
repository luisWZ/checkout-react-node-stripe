import { PropsWithChildren } from 'react';
import Loading from '../../../ui/Loading';

type ButtonSubmitProps = PropsWithChildren & {
  disableListener: boolean;
  formIncomplete: boolean;
};

const ButtonSubmit = ({
  children,
  disableListener,
  formIncomplete,
}: ButtonSubmitProps) => {
  return (
    <button id="submit" disabled={disableListener || formIncomplete}>
      {disableListener ? (
        <Loading buttonStyles={true} />
      ) : (
        <span id="button-text">{children}</span>
      )}
    </button>
  );
};

export default ButtonSubmit;
