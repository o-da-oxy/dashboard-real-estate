import { useState } from 'react';
import { H2 } from '../SharedStyledComp.jsx';
import {
  StyledForm,
  StyledModal,
  InputLabel,
  SubmitButton,
  CloseButton,
  ErrorMessage
} from './ModalStyledComp.jsx';

const DeletePropertyModal = ({ isOpen, onClose, onSubmit }) => {
  const [property_id, setPropertyId] = useState();
  const [errorMsg, setErrorMsg] = useState('');

  const handlePropertyIdChange = (event) => {
    setPropertyId(parseInt(event.target.value));
  };

  const handleModalClose = () => {
    setPropertyId('');
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const currentPropertyId = property_id;
      await onSubmit(currentPropertyId);
      handleModalClose();
    } catch (err) {
      setErrorMsg('Failed to delete property');
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      contentLabel="Delete Property"
      ariaHideApp={false}
    >
      <StyledForm onSubmit={handleSubmit}>
        <H2>Delete Property</H2>
        <InputLabel>
          Property Id:
          <input type="number" value={property_id} onChange={handlePropertyIdChange} />
        </InputLabel>
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <SubmitButton type="button" onClick={handleSubmit}>Delete</SubmitButton>
        <CloseButton onClick={handleModalClose}>Cancel</CloseButton>
      </StyledForm>
    </StyledModal>
  );
};

export default DeletePropertyModal;