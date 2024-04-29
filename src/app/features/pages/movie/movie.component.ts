import {Component} from '@angular/core';

import {PageContentComponent} from '../../page-content/page-content.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [
    PageContentComponent
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

}
