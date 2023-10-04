import axios from 'axios';
import { FullUserDto } from './interfaces';

// AXIOS HTTP REQUESTS

const getFullUser = async (userId: string | null) => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};

const getCompanyUsers = async (companyId: string | null) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/company/${companyId}/users`
    );
    return response.data.sort((a: FullUserDto, b: FullUserDto) => {
      const firstNameComp = a.profile.firstName.localeCompare(
        b.profile.firstName
      );
      return firstNameComp === 0
        ? a.profile.lastName.localeCompare(b.profile.lastName)
        : firstNameComp;
    });
  } catch (error) {
    console.error('Error fetching user data', error);
    throw error;
  }
};

// HELPER FUNCTIONS

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

export { getFullUser, getCompanyUsers, getUserIdFromUrl, getCompanyIdFromUrl };
