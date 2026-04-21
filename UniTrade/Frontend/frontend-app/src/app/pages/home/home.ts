import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(public langService: LanguageService) {}

  categories = [
    { id: 1, nameKey: 'electronics', descriptionKey: 'electronicsDesc' },
    { id: 2, nameKey: 'booksStudy', descriptionKey: 'booksDesc' },
    { id: 3, nameKey: 'homeDorm', descriptionKey: 'homeDormDesc' }
  ];

  previewItems = [
    { title: 'MacBook Air M1', categoryKey: 'electronics', condition: 'Good condition', price: '320000 ₸', image: 'Macbook.jpg' },
    { title: 'Manga Books Set', categoryKey: 'booksStudy', condition: 'Used', price: '12000 ₸', image: 'books.jpg' },
    { title: 'Table Lamp', categoryKey: 'homeDorm', condition: 'New', price: '8500 ₸', image: 'lamp.jpg' }
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.previewItems.length;
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get currentItem() {
    return this.previewItems[this.currentIndex];
  }
}