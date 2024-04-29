import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

import {convertDate} from '../../../core/utils/convert-date';
import {getGenre} from '../../../core/utils/get-genre';

import {ApiService} from '../../../core/services/api.service';
import {checking, save} from '../../../core/utils/methods-localStorage';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {

  private apiService: ApiService = inject(ApiService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  movie: WritableSignal<any> = signal(null);
  movieId: WritableSignal<any> = signal(null);
  movieVideo: WritableSignal<any> = signal(null);

  IMG_URL = environment.IMG_URL;

  ngOnInit() {
    this.route.params.subscribe((url: any) => {
      this.apiService.getMovieById(url['id'], 'movie', 'uk').subscribe({
        next: (response) => {
          this.movieId.set(url['id']);
          this.movie.set(response);
        }
      })

      this.apiService.getMovieVideo(url['id'], 'movie', 'uk').subscribe({
        next: (response) => {
          if (response['results'][0]) {
            let url: string = `${environment.VIDEO_URL}${response['results'][0]?.key}`;
            this.movieVideo.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
          }
        }
      })
    })
  }

  protected readonly getGenre = getGenre;
  protected readonly convertDate = convertDate;
  protected readonly checking = checking;
  protected readonly save = save;
}
