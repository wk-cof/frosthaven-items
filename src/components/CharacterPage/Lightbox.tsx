import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: zoom-out;
  animation: ${fadeIn} 0.2s ease-out;
`;

const Content = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  animation: ${scaleIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: default;

  img {
    display: block;
    max-width: 100%;
    max-height: 90vh;
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  background: #38bdf8;
  color: #0f172a;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1) rotate(90deg);
    background: #7dd3fc;
  }
`;

interface LightboxProps {
  image: string;
  onClose: () => void;
  basePath: string;
}

export const Lightbox: React.FC<LightboxProps> = ({ image, onClose, basePath }) => {
  const imageUrl = image.includes('ability-cards') || image.startsWith('fh-')
    ? `${basePath}/ability-cards/${image}`
    : `${basePath}/${image}`;

  return (
    <Overlay onClick={onClose}>
      <Content onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <img src={imageUrl} alt="Enlarged" />
      </Content>
    </Overlay>
  );
};
