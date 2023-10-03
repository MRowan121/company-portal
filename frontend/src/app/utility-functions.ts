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

const getUserIdFromUrl = () => {
  const url = location.href;
  const userMatch = url.match(/\/user\/(\d+)\//);

  if (userMatch) {
    return userMatch[1];
  } else {
    return null;
  }
};

const getCompanyIdFromUrl = () => {
  const url = location.href;
  const companyMatch = url.match(/\/company\/(\d+)\//);

  if (companyMatch) {
    return companyMatch[1];
  } else {
    return null;
  }
};

export { getFullUser, getUserIdFromUrl, getCompanyIdFromUrl };
