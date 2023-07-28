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

const UpdatePropertyModal = ({ isOpen, onClose, onSubmit }) => {
  const [property_id, setPropertyId] = useState('');
  const [district, setDistrict] = useState('');
  const [square_meters, setSquareMeters] = useState('');
  const [price, setPrice] = useState('');
  const [date_built, setDateBuilt] = useState('');
  const [property_type, setPropertyType] = useState('');
  const [realtor_id, setRealtorId] = useState();
  const [errorMsg, setErrorMsg] = useState('');

  const handlePropertyIdChange = (event) => {
    setPropertyId(event.target.value);
  };
  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };
  const handleSquareMetersChange = (event) => {
    setSquareMeters(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleDateBuiltChange = (event) => {
    setDateBuilt(event.target.value);
  };
  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };
  const handleRealtorIdChange = (event) => {
    setRealtorId(parseInt(event.target.value));
  };

  const handleModalClose = () => {
    setPropertyId('');
    setDistrict('');
    setErrorMsg('');
    setSquareMeters('');
    setPrice('');
    setDateBuilt('');
    setPropertyType('');
    setRealtorId('');
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Проверка на пустые поля
    if (
      property_id.trim() === '' ||
      district.trim() === '' ||
      square_meters.trim() === '' ||
      price.trim() === '' ||
      date_built.trim() === '' ||
      property_type.trim() === '' ||
      realtor_id === ''
    ) {
      setErrorMsg('Please fill in all fields');
      return;
    }

    // Проверка на правильность формата поля prorerty_id
    if (isNaN(Number(property_id))) {
      setErrorMsg('Property id must be a number');
      return;
    }

    // Проверка на правильность формата поля square_meters
    if (isNaN(Number(square_meters))) {
      setErrorMsg('Square meters must be a number');
      return;
    }

    // Проверка на правильность формата поля price
    if (isNaN(Number(price))) {
      setErrorMsg('Price must be a number');
      return;
    }

    // Проверка на правильность формата поля date_built (yyyy-mm-dd)
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date_built)) {
      setErrorMsg('Date built must be in format yyyy-mm-dd');
      return;
    }

    onSubmit({
      property_id,
      district,
      square_meters,
      price,
      date_built,
      property_type,
      realtor_id
    });

    handleModalClose();
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Update Property"
      ariaHideApp={false}
    >
      <StyledForm onSubmit={handleSubmit}>
        <H2>Update Property</H2>
        <InputLabel>
          Property Id:
          <input type="number" value={property_id} onChange={handlePropertyIdChange} />
        </InputLabel>
        <InputLabel>
          District:
          <input type="text" value={district} onChange={handleDistrictChange} />
        </InputLabel>
        <InputLabel>
          Square Meters:
          <input type="number" value={square_meters} onChange={handleSquareMetersChange} />
        </InputLabel>
        <InputLabel>
          Price:
          <input type="number" value={price} onChange={handlePriceChange} />
        </InputLabel>
        <InputLabel>
          Date Built:
          <input type="text" value={date_built} onChange={handleDateBuiltChange} />
        </InputLabel>
        <InputLabel>
          Property Type:
          <input type="text" value={property_type} onChange={handlePropertyTypeChange} />
        </InputLabel>
        <InputLabel>
          Realtor ID:
          <input type="number" value={realtor_id} onChange={handleRealtorIdChange} />
        </InputLabel>
        <br />
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        <SubmitButton type="submit">Update</SubmitButton>
        <CloseButton onClick={handleModalClose}>Back</CloseButton>
      </StyledForm>
    </StyledModal>
  );
};

export default UpdatePropertyModal;