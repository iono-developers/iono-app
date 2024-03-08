import { get, post } from '../utils/api';



// Interface for minimal user data
export interface MiniUserData {
  id: string;
  username: string;
}

// Interface for complete user data including emoji and description
export interface UserData {
  id: string;
  username: string;
  emoji: string;
  description: string;
}

// Interface for changing emoji
export interface EmojiChange {
  username: string | null;
  token: string | undefined;
  emoji: string;
}

const UserService = {
  // Function to get a list of users
  getUsers: async (): Promise<MiniUserData[]> => {
    try {
      const response = await get<MiniUserData[]>('/users/');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to get user data by username
  getUser: async (username: string): Promise<UserData> => {
    try {
      const response = await get<UserData>(`/user/${username}/`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  // Function to change user's emoji
  changeEmoji: async (emoji_change: EmojiChange): Promise<string> => {
    try {
      const response = await post<string>("/users/change-emoji/", emoji_change);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  }
};

export default UserService;
