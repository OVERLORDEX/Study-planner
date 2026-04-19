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
  favorites_count: number;
}