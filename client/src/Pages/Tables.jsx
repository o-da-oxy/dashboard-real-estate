import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';
import { H1, H2, StyledDiv } from '../SharedStyledComp.jsx';
import { useEffect, useState } from 'react';
import arrow from '../assets/up-down-solid.svg'
import { animateScroll } from 'react-scroll';
import CreatePropertyModal from '../Modals/CreatePropertyModal.jsx';
import UpdatePropertyModal from '../Modals/UpdatePropertyModal.jsx';
import DeletePropertyModal from '../Modals/DeletePropertyModal.jsx';

const TablesContainer = styled.div`
  width: 1020px;
  height: 440px;
  margin-bottom: -30px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  width: 40px;
  height: 80px;
`;

const Icon = styled.span`
  background-image: url(${arrow});
  background-size: cover;
  position: fixed;
  top: 10px;
  right: 45px;
  width: 30px;
  height: 60px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px 20px;
  margin: 10px;
  font-size: 16px;
  background-color: #f5f5f5;
  border: 2px solid #ccc;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e1e1e1;
  }
`;

const Tables = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Модальные окна для выполнения операций со связанной таблицей
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // Обновление данных после выполнения операций со связанной таблицей
  const [tableKey, setTableKey] = useState(0);

  // Обработчики открытия/закрытия модальных ококн
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };
  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Обработчики отправки запросов на сервер
  const handleCreateSubmit = async (propertyData) => {
    try {
      const response = await fetch('http://localhost:3000/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
      });

      if (!response.ok) {
        throw new Error('Error creating property');
      }

      handleCloseCreateModal();
      alert('Property created successfully!');
      setTableKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error(error);
      alert('Error! Try again!');
    }
  };

  const handleUpdateSubmit = async (propertyData) => {
    try {
      const response = await fetch('http://localhost:3000/properties', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
      });

      if (!response.ok) {
        throw new Error('Error updating property');
      }

      handleCloseUpdateModal();
      alert('Property updated successfully!');
      setTableKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error(error);
      alert('Error! Try again!');
    }
  };

  const handleDeleteSubmit = async (propertyId) => {
    try {
      const response = await fetch('http://localhost:3000/properties', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ property_id: parseInt(propertyId) })
      });

      if (!response.ok) {
        throw new Error('Error deleting property');
      }

      handleCloseDeleteModal();
      alert('Property deleted successfully!');
      setTableKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error(error);
      alert('Error! Try again!');
    }
  };

  // Скролл между двумя таблицами
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = () => {
    if (isScrolled) {
      animateScroll.scrollToTop();
    } else {
      animateScroll.scrollToBottom();
    }
  };

  // Частичная подгрузка записей с сервера
  const getRealtorsData = (params) => {
    const { startRow, endRow } = params || {};
    const limit = endRow-startRow;
    const offset = startRow;

    fetch(`http://localhost:3000/realtors?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        params.successCallback(data);
      })
      .catch((error) => {
        console.error(error);
        params.failCallback();
      });
  };

  const getPropertiesData = (params) => {
    fetch('http://localhost:3000/properties')
      .then((response) => response.json())
      .then((data) => {
        params.successCallback(data);
      })
      .catch((error) => {
        console.error(error);
        params.failCallback();
      });
  };

  const columnDefsRealtors = [
    { headerName: 'ID', field: 'realtor_id', width: 70 },
    { headerName: 'First Name', field: 'first_name' },
    { headerName: 'Last Name', field: 'last_name' },
    { headerName: 'Phone', field: 'phone', width: 130 },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Registration Date',
      field: 'registration_date',
      valueFormatter: (params) => {
        if (!params.value) return '';
        return params.value.split('T')[0];
      }
    },
  ];

  const columnDefsProperties = [
    { headerName: 'ID', field: 'property_id', width: 70 },
    { headerName: 'District', field: 'district' },
    { headerName: 'Square Meters', field: 'square_meters', width: 130 },
    { headerName: 'Price', field: 'price', width: 150 },
    { headerName: 'Date Built',
      field: 'date_built',
      valueFormatter: (params) => {
        if (!params.value) return '';
        return params.value.split('T')[0];
      }
    },
    { headerName: 'Property Type', field: 'property_type', width: 150 },
    { headerName: 'Realtor ID', field: 'realtor_id', width: 100 },
  ];

  // AgGrid Infinite Row Model
  return (
    <div>
      <H1>Tables</H1>
      <H2>Realtors</H2>
      <TablesContainer className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefsRealtors}
          rowModelType="infinite"
          cacheBlockSize={100}
          maxBlocksInCache={10}
          infiniteInitialRowCount={1}
          onGridReady={(params) => {
            params.api.setDatasource({
              getRows: getRealtorsData,
              request: {
                startRow: 0, // offset
                endRow: 100 // limit
              }
            });
          }}
        />
      </TablesContainer>
      <StyledDiv />
      <H2 id="properties-table">Properties</H2>
      <ButtonsContainer>
        <Button onClick={handleOpenCreateModal}>Create</Button>
        <Button onClick={handleOpenUpdateModal}>Update</Button>
        <Button onClick={handleOpenDeleteModal}>Delete</Button>

        <CreatePropertyModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          onSubmit={handleCreateSubmit}
        />

        <UpdatePropertyModal
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          onSubmit={handleUpdateSubmit}
        />

        <DeletePropertyModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onSubmit={handleDeleteSubmit}
        />
      </ButtonsContainer>
      <TablesContainer className="ag-theme-alpine">
        <AgGridReact
          key={tableKey}
          columnDefs={columnDefsProperties}
          rowModelType="infinite"
          cacheBlockSize={100}
          maxBlocksInCache={10}
          infiniteInitialRowCount={1}
          onGridReady={(params) => {
            params.api.setDatasource({ getRows: getPropertiesData });
          }}
        />
      </TablesContainer>
      <IconButton onClick={handleButtonClick}>
        <Icon scrolled={isScrolled} />
      </IconButton>
    </div>
  );
};

export default Tables;
