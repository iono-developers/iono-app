import { get, post } from '../utils/api';

export interface MiniUserData {
  id: string;
  username: string;
}

export interface UserData {
  id: string;
  username: string;
  emoji: string;
  description: string;
}

export interface EmojiChange {
  username : string | null;
  token : string | undefined;
  emoji : string;
}

const UserService = {
  getUsers: async (): Promise<MiniUserData[]> => {
    try {
      const response = await get<MiniUserData[]>('/users/');
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  getUser: async (username : string): Promise<UserData> => {
    try {
      const response = await get<UserData>(`/user/${username}/`);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  },

  changeEmoji: async (emoji_change : EmojiChange): Promise<string> => {
    try {
      const response = await post<string>("/users/change-emoji/", emoji_change);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error.message;
    }
  }
};

export default UserService;
