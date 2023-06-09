// import styled from '@emotion/styled/macro';
import styled from '@emotion/styled';

type SpinnerOverlayProps = { buttonStyles: boolean };

export const SpinnerOverlay = styled.div<SpinnerOverlayProps>`
  height: ${({ buttonStyles }) => (buttonStyles ? 'auto' : '60vh')};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div<SpinnerOverlayProps>`
  display: inline-block;
  width: ${({ buttonStyles }) => (buttonStyles ? '28px' : '50px')};
  height: ${({ buttonStyles }) => (buttonStyles ? '28px' : '50px')};
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
