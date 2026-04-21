import { User } from './user';
import { Category } from './category';

export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  condition: string;
  status: string;
  seller: User;
  category: Category;
  category_id?: number;
  location: string;
  is_active: boolean;
  views_count: number;
  created_at: string;
  updated_at: string;
  favorites_count?: number;
  average_rating?: number;
  ratings_count?: number;
  is_favorited?: boolean;

  seller_profile?: {
    phone: string;
    dormitory: string;
    room: string;
    bio?: string;
    telegram_username?: string;
    university_id?: string;
  };

  seller_contacts?: {
    phone?: string;
    whatsapp_link?: string;
    telegram_username?: string;
    email?: string;
  };
}