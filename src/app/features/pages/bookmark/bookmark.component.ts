import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';

import {CardComponent} from '../../../core/components/card/card.component';

import {moviesByType} from '../../../core/utils/methods-localStorage';

import {ApiService} from '../../../core/services/api.service';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss'
})
export class BookmarkComponent implements OnInit {

  private apiService: ApiService = inject(ApiService);

  movieId: WritableSignal<any> = signal(null);
  tvId: WritableSignal<any> = signal(null);
  revisedId: WritableSignal<any> = signal(null);
  favoriteId: WritableSignal<any> = signal(null);

  moviesList: any[] = [];
  tvList: any[] = [];
  revisedList: any[] = [];
  favoriteList: any[] = [];

  ngOnInit() {
    this.moviesType('movie');
    this.tvType('tv');
    this.revisedType('revised');
    this.favoriteType('favorite');
  }

  moviesType(type: string) {
    this.movieId.set(moviesByType(type));

    this.movieId().forEach((movieId: number) => {
      this.apiService.getMovieById(movieId, 'movie', 'uk').subscribe({
        next: (response) => {
          this.moviesList.push(response);
        }
      });
    });
  }

  tvType(type: string) {
    this.tvId.set(moviesByType(type));

    this.tvId().forEach((movieId: number) => {
      this.apiService.getMovieById(movieId, 'tv', 'uk').subscribe({
        next: (response) => {
          this.tvList.push(response);
        }
      });
    });
  }

  revisedType(type: string) {
    this.revisedId.set(moviesByType(type));

    this.revisedId().forEach((movie: number) => {
      this.apiService.getMovieById(Object.values(movie)[0], Object.keys(movie)[0], 'uk').subscribe({
        next: (response) => {
          this.revisedList.push(response);
        }
      });
    });
  }

  favoriteType(type: string) {
    this.favoriteId.set(moviesByType(type));

    this.favoriteId().forEach((movie: number) => {
      this.apiService.getMovieById(Object.values(movie)[0], Object.keys(movie)[0], 'uk').subscribe({
        next: (response) => {
          this.favoriteList.push(response);
        }
      });
    });
  }
}
