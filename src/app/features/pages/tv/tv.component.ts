import {Component, HostListener, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {Observable} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {CardComponent} from '../../../core/components/card/card.component';
import {SearchComponent} from '../../../core/components/search/search.component';
import {PageContentComponent} from '../../page-content/page-content.component';

@Component({
  selector: 'app-tv',
  standalone: true,
  imports: [
    CardComponent,
    SearchComponent,
    PageContentComponent
  ],
  templateUrl: './tv.component.html',
  styleUrl: './tv.component.scss'
})
export class TvComponent {

}
