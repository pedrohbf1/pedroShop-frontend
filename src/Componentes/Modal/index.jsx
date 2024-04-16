import React from 'react';
import styled from 'styled-components';

const Modal = ({ title, message, estado }) => {
  return (
    <ModalOverlay onClick={() => estado(false)} >
      <ModalContent>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <button onClick={() => estado(false)} >Fechar</button>
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
  button {
    background-color: #412CC5; 
    color: white; 
    padding: 10px 15px; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
    transition: all 0.5s;
    &:hover {
      transform: scale(1.05);
    }
  }
`

const Title = styled.h2`
  color: #412CC5;
`;

const Message = styled.p`
  color: #666;
`;
