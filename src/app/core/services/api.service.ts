import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http: HttpClient = inject(HttpClient);

  getAllContent(page: number, category: string, language: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/discover/${category}?api_key=${environment.API_KEY}&language=${language}-US&page=${page}`);
  }

  getSearchContent(query: string, category: string, language: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/search/${category}?api_key=${environment.API_KEY}&language=${language}-US&query=${query}`);
  }

  getMovieById(movieId: number, type: string, language: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/${type}/${movieId}?api_key=${environment.API_KEY}&language=${language}-US`);
  }

  getMovieVideo(movieId: number, type: string, language: string): Observable<any> {
    return this.http.get(`${environment.BASE_URL}/${type}/${movieId}/videos?api_key=${environment.API_KEY}&language=${language}-US`);
  }
}
