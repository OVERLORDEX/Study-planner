import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListingService } from '../../services/listing';
import { Favorite } from '../../models/favorite';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class FavoritesComponent implements OnInit {
  favorites: Favorite[] = [];
  errorMessage = '';
  isLoading = false;

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.listingService.getFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load favorites';
        this.isLoading = false;
      }
    });
  }

  removeFavorite(listingId: number): void {
    this.listingService.removeFromFavorites(listingId).subscribe({
      next: () => {
        this.loadFavorites();
      },
      error: () => {
        this.errorMessage = 'Failed to remove favorite';
      }
    });
  }

  getImageUrl(favorite: any): string {
    if (favorite.listing?.image) {
      if (favorite.listing.image.startsWith('http')) {
        return favorite.listing.image;
      }
      return `http://127.0.0.1:8000${favorite.listing.image}`;
    }
    return 'https://via.placeholder.com/400x280?text=UniTrade';
  }
}