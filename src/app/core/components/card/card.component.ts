import {Component, inject, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';

import {TruncatePipe} from '../../pipe/truncate.pipe';
import {urlPage} from '../../utils/convert-url-page';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    TruncatePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  private router: Router = inject(Router);

  IMG_URL = environment.IMG_URL;

  movie: InputSignal<any> = input.required();

  url: WritableSignal<string> = signal('')

  ngOnInit() {
    this.url.set(urlPage(this.movie()));
  }

  goMovie(movieId: any, url: string){
    this.router.navigate([`${url}/${movieId}`]);
  }
}
