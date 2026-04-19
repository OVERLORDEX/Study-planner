import { User } from './user';

export interface Profile {
  id: number;
  user: User;
  phone: string;
  dormitory: string;
  room: string;
  avatar_url: string;
}