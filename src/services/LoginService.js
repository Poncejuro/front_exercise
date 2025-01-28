
const validUsername = process.env.REACT_APP_USERNAME
const validPassword = process.env.REACT_APP_PASSWORD
const fakeToken = process.env.REACT_APP_TOKEN



export const LoginService = async (username, password) => {
  try {

    if (username === validUsername && password === validPassword) {
      const response = {
        status: 200,
        data: {
          message: 'Login exitoso',
          token: fakeToken
        }
      };

      return response.data;
    } else {
      throw new Error('Credenciales incorrectas');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};
