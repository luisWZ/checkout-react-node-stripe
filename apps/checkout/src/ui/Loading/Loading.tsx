import { SpinnerContainer, SpinnerOverlay } from './LoadingStyles';

type LoadingProps = { buttonStyles?: boolean };

const Loading = ({ buttonStyles = false }: LoadingProps) => (
  <SpinnerOverlay buttonStyles={buttonStyles}>
    <SpinnerContainer buttonStyles={buttonStyles} />
  </SpinnerOverlay>
);

export default Loading;
