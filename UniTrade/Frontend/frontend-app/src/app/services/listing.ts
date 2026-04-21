import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../models/listing';
import { Category } from '../models/category';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/`);
  }

  getListings(category = '', search = '', ordering = ''): Observable<Listing[]> {
    let params = new HttpParams();

    if (category) params = params.set('category', category);
    if (search) params = params.set('search', search);
    if (ordering) params = params.set('ordering', ordering);

    return this.http.get<Listing[]>(`${this.apiUrl}/listings/`, { params });
  }

  getListingById(id: number): Observable<Listing> {
    return this.http.get<Listing>(`${this.apiUrl}/listings/${id}/`);
  }

  createListing(data: FormData): Observable<Listing> {
    return this.http.post<Listing>(`${this.apiUrl}/listings/create/`, data);
  }

  updateListing(id: number, data: FormData): Observable<Listing> {
    return this.http.patch<Listing>(`${this.apiUrl}/listings/${id}/edit/`, data);
  }

  deleteListing(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/listings/${id}/delete/`);
  }

  getMyListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.apiUrl}/my-listings/`);
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favorites/`);
  }

  addToFavorites(listingId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites/add/`, { listing_id: listingId });
  }

  removeFromFavorites(listingId: number): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/favorites/remove/`, {
      body: { listing_id: listingId }
    });
  }

  getComments(listingId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listings/${listingId}/comments/`);
  }

  addComment(listingId: number, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/listings/${listingId}/comments/add/`, { text });
  }

  rateListing(listingId: number, score: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/ratings/add/`, {
      listing_id: listingId,
      score
    });
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile/me/`);
  }

  updateProfile(data: any): Observable<Profile> {
    return this.http.patch<Profile>(`${this.apiUrl}/profile/me/`, data);
  }
}