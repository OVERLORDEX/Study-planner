import { User } from './user';

export interface Profile {
  id: number;
  user: User;
  phone: string;
  dormitory: string;
  room: string;
  bio: string;
  telegram_username: string;
  university_id: string;
  avatar?: string;
}