import {Component, HostListener, inject, input, InputSignal, OnInit, signal, WritableSignal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {Observable} from 'rxjs';

import {CardComponent} from '../../core/components/card/card.component';
import {SearchComponent} from '../../core/components/search/search.component';

import {ApiService} from '../../core/services/api.service';

@Component({
  selector: 'app-page-content',
  standalone: true,
  imports: [
    CardComponent,
    SearchComponent
  ],
  templateUrl: './page-content.component.html',
  styleUrl: './page-content.component.scss'
})
export class PageContentComponent implements OnInit{
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (this.scrollTracker()) {
      const documentHeight: number = document.documentElement.scrollHeight;
      const windowHeight: number = window.innerHeight;
      const scrollPosition: number = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
      const scrollPercentage: number = (scrollPosition / (documentHeight - windowHeight)) * 100;
      if (scrollPercentage >= 85 && !this.pageBottom()) {
        this.scrollTracker.set(false);
        this.pageBottom.set(true);
      }
    }
  }

  private apiService: ApiService = inject(ApiService);

  category: InputSignal<any> = input.required();

  currentPage: WritableSignal<number> = signal(0);
  moviesList: WritableSignal<any> = signal([]);
  pageBottom: WritableSignal<boolean> = signal(true);
  scrollTracker: WritableSignal<boolean> = signal(true);
  searchContent: WritableSignal<any> = signal(null)

  pageBottom$: Observable<boolean> = toObservable(this.pageBottom);
  searchContent$: Observable<any> = toObservable(this.searchContent);

  ngOnInit() {
    this.pageBottom$.subscribe(() => {
      if (this.pageBottom()) {
        this.allContent(this.category());
      }
    });

    this.searchContent$.subscribe((value: any) => {
      if (value) {
        this.moviesList.set(value);
        this.pageBottom.set(false);
        this.scrollTracker.set(false);
      } else {
        this.moviesList.set([]);
        this.scrollTracker.set(true);
        this.allContent(this.category());
      }
    });
  }

  allContent(category: string) {
    this.apiService.getAllContent(this.currentPage() + 1, category, 'uk')
      .subscribe({
        next: (response) => {
          this.currentPage.set(response['page']);

          setTimeout(() => {
            this.moviesList.set([...this.moviesList(), ...response['results']]);
          }, 150);
          this.pageBottom.set(false);

          setTimeout(() => {
            this.scrollTracker.set(true)
          }, 1000);
        }
      })
  }
}
