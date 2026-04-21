import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListingService } from '../../services/listing';
import { Listing } from '../../models/listing';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-listing-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listing-detail.html',
  styleUrl: './listing-detail.css'
})
export class ListingDetailComponent implements OnInit {
  listing: Listing | null = null;
  comments: any[] = [];
  commentText = '';
  errorMessage = '';
  isLoading = true;
  isContactModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private cdr: ChangeDetectorRef,
    public langService: LanguageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadListing(id);
    this.loadComments(id);
  }

  loadListing(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.listingService.getListingById(id).subscribe({
      next: (data) => {
        this.listing = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = this.langService.t('failedToLoadListing');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadComments(id: number): void {
    this.listingService.getComments(id).subscribe({
      next: (data) => {
        this.comments = data;
        this.cdr.detectChanges();
      }
    });
  }

  addToFavorites(): void {
    if (!this.listing) return;

    if (this.listing.is_favorited) {
      this.listingService.removeFromFavorites(this.listing.id).subscribe({
        next: () => {
          if (this.listing) this.listing.is_favorited = false;
        },
        error: () => alert(this.langService.t('failedToRemoveFavorite'))
      });
    } else {
      this.listingService.addToFavorites(this.listing.id).subscribe({
        next: () => {
          if (this.listing) this.listing.is_favorited = true;
        },
        error: () => alert(this.langService.t('needLoginFirst'))
      });
    }
  }

  addComment(): void {
    if (!this.commentText.trim() || !this.listing) return;

    this.listingService.addComment(this.listing.id, this.commentText).subscribe({
      next: () => {
        this.commentText = '';
        this.loadComments(this.listing!.id);
      },
      error: () => {
        this.errorMessage = this.langService.t('failedToAddComment');
        this.cdr.detectChanges();
      }
    });
  }

  rateListing(score: number): void {
    if (!this.listing) return;

    this.listingService.rateListing(this.listing.id, score).subscribe({
      next: () => this.loadListing(this.listing!.id),
      error: () => alert(this.langService.t('needLoginFirst'))
    });
  }

  getImageUrl(listing: any): string {
    if (listing?.image) {
      if (listing.image.startsWith('http')) return listing.image;
      return `http://127.0.0.1:8000${listing.image}`;
    }
    return 'https://via.placeholder.com/700x500?text=UniTrade';
  }
}