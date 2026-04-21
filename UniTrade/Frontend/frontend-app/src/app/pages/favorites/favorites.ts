import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ListingService } from '../../services/listing';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  errorMessage = '';
  isLoading = true;

  constructor(
    private listingService: ListingService,
    private cdr: ChangeDetectorRef,
    public langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.listingService.getFavorites().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.favorites = data
            .map((item: any) => {
              if (item?.listing) return item;
              if (item?.id && item?.title) return { id: item.id, listing: item };
              return null;
            })
            .filter((item: any) => item !== null);
        } else {
          this.favorites = [];
        }

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = this.langService.t('failedToLoadFavorites');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  removeFavorite(listingId: number): void {
    this.listingService.removeFromFavorites(listingId).subscribe({
      next: () => this.loadFavorites(),
      error: () => {
        this.errorMessage = this.langService.t('failedToRemoveFavorite');
        this.cdr.detectChanges();
      }
    });
  }

  getImageUrl(favorite: any): string {
    const image = favorite?.listing?.image;

    if (!image) return 'https://dummyimage.com/400x280/e5e7eb/64748b&text=UniTrade';
    if (image.startsWith('http://127.0.0.1:8000') || image.startsWith('https://127.0.0.1:8000')) return image;
    if (image.startsWith('http')) return image;
    if (image.startsWith('/media/')) return `http://127.0.0.1:8000${image}`;
    if (image.startsWith('media/')) return `http://127.0.0.1:8000/${image}`;
    return `http://127.0.0.1:8000/media/${image}`;
  }
}