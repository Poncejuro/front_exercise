const fakeToken = process.env.REACT_APP_TOKEN


export const UserService = async () => {
    try {
      const users = [
        { id: 1, firstName: 'Juan', lastName: 'Pérez', email: 'juan.perez@mail.com', phoneNumber: '+1 555-0101' },
        { id: 2, firstName: 'Ana', lastName: 'Gómez', email: 'ana.gomez@mail.com', phoneNumber: '+1 555-0102' },
        { id: 3, firstName: 'Carlos', lastName: 'Lopez', email: 'carlos.lopez@mail.com', phoneNumber: '+1 555-0103' },
        { id: 4, firstName: 'María', lastName: 'Martínez', email: 'maria.martinez@mail.com', phoneNumber: '+1 555-0104' },
        { id: 5, firstName: 'Pedro', lastName: 'Ramírez', email: 'pedro.ramirez@mail.com', phoneNumber: '+1 555-0105' },
        { id: 6, firstName: 'Luisa', lastName: 'Sánchez', email: 'luisa.sanchez@mail.com', phoneNumber: '+1 555-0106' },
        { id: 7, firstName: 'José', lastName: 'Díaz', email: 'jose.diaz@mail.com', phoneNumber: '+1 555-0107' },
        { id: 8, firstName: 'Clara', lastName: 'Torres', email: 'clara.torres@mail.com', phoneNumber: '+1 555-0108' },
        { id: 9, firstName: 'Raúl', lastName: 'García', email: 'raul.garcia@mail.com', phoneNumber: '+1 555-0109' },
        { id: 10, firstName: 'Patricia', lastName: 'Hernández', email: 'patricia.hernandez@mail.com', phoneNumber: '+1 555-0110' },
      ];
  
      const response = {
        status: 200,
        data: users
      };
  
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud de usuarios:', error);
      throw error;
    }
  };
  