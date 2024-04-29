import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

import {getGenre} from '../../../core/utils/get-genre';
import {convertDate} from '../../../core/utils/convert-date';
import {checking, save} from '../../../core/utils/methods-localStorage';

import {ApiService} from '../../../core/services/api.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-tv-details',
  standalone: true,
  imports: [],
  templateUrl: './tv-details.component.html',
  styleUrl: './tv-details.component.scss'
})
export class TvDetailsComponent implements OnInit {

  private apiService: ApiService = inject(ApiService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  tv: WritableSignal<any> = signal(null);
  tvId: WritableSignal<any> = signal(null);
  tvVideo: WritableSignal<any> = signal(null);

  IMG_URL = environment.IMG_URL;

  ngOnInit() {

    this.route.params.subscribe((url: any) => {
      this.apiService.getMovieById(url['id'], 'tv', 'uk').subscribe({
        next: (response) => {
          this.tvId.set(url['id']);
          this.tv.set(response);
        }
      })

      this.apiService.getMovieVideo(url['id'], 'tv', 'en').subscribe({
        next: (response) => {
          if (response['results'][0]) {
            let url: string = `${environment.VIDEO_URL}${response['results'][0]?.key}`;
            this.tvVideo.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
          }
        }
      })
    })
  }

  protected readonly save = save;
  protected readonly checking = checking;
  protected readonly getGenre = getGenre;
  protected readonly convertDate = convertDate;
}
