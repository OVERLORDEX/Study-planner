import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListingService } from '../../services/listing';
import { Listing } from '../../models/listing';
import { Category } from '../../models/category';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listings.html',
  styleUrl: './listings.css'
})
export class ListingsComponent implements OnInit {
  listings: Listing[] = [];
  categories: Category[] = [];
  selectedCategory = '';
  searchText = '';
  ordering = '';
  errorMessage = '';
  isLoading = true;

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute,
    public langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      this.loadCategories();
      this.loadListings();
    });
  }

  loadCategories(): void {
    this.listingService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: () => this.errorMessage = this.langService.t('failedToLoadCategories')
    });
  }

  loadListings(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.listingService.getListings(this.selectedCategory, this.searchText, this.ordering).subscribe({
      next: (data) => {
        this.listings = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = this.langService.t('failedToLoadListings');
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    this.loadListings();
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.searchText = '';
    this.ordering = '';
    this.loadListings();
  }

  getImageUrl(listing: Listing): string {
    if (listing.image) {
      if (listing.image.startsWith('http')) return listing.image;
      return `http://127.0.0.1:8000${listing.image}`;
    }
    return 'https://via.placeholder.com/400x280?text=UniTrade';
  }

  toggleFavorite(listing: Listing, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    if (listing.is_favorited) {
      this.listingService.removeFromFavorites(listing.id).subscribe({
        next: () => listing.is_favorited = false,
        error: () => alert(this.langService.t('failedToRemoveFavorite'))
      });
    } else {
      this.listingService.addToFavorites(listing.id).subscribe({
        next: () => listing.is_favorited = true,
        error: () => alert(this.langService.t('needLoginToFavorite'))
      });
    }
  }
}