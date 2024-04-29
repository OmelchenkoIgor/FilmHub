import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Observable, Subject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagePathsService {
  private currentPageSubject: Subject<string> = new Subject<string>();
  currentPage$: Observable<string> = this.currentPageSubject.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        let currentPage = event.url;
        if (currentPage === '/') {
          currentPage = '/movie';
        }
        this.currentPageSubject.next(currentPage);
      });
  }
}
