import axios from 'axios';

const getFullUser = async (userId: string | null) => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}`);
    return response.data;
  } catch (error) {
    // Handle errors, e.g., log them or throw an exception
    console.error('Error fetching user data', error);
    throw error;
  }
};

export { getFullUser };
