import Modal from 'react-modal';
import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const InputLabel = styled.label`
  margin-top: 10px;
  font-weight: bold;
  input {
    width: 100%;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #eaeaea;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #a3a3a3;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: -9.5px;
  margin-bottom: -9.5px;
`;