import { get } from '../utils/api';

export interface UserData {
  id: string;
  username: string;
}

const UserService = {
  getUsers: async (): Promise<UserData[]> => {
    try {
      const response = await get<UserData[]>('/users/users/'); // Adjust the endpoint as per your backend API
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },
};

export default UserService;
