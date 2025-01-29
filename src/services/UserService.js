const fakeToken = process.env.REACT_APP_TOKEN;

export const UserService = async (Token) => {
  try {
    if (Token !== fakeToken) {
      throw new Error('Invalid token');
    }

    const response = await fetch('https://randomuser.me/api/?results=20');
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    return data.results; 
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; 
  }
};
