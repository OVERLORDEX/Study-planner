import { User } from './user';
import { Listing } from './listing';

export interface Favorite {
  id: number;
  user: User;
  listing: Listing;
  listing_id?: number;
  created_at: string;
}