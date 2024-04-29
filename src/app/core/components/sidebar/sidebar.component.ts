import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgStyle} from '@angular/common';
import {Subscription} from 'rxjs';

import {NzIconDirective} from 'ng-zorro-antd/icon';

import {newParams} from '../../const/paramsFilmHub';
import {currentPage} from '../../utils/current-page';

import {PagePathsService} from '../../services/page-paths.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NzIconDirective,
    RouterLink,
    NgStyle
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  pagePathsService: PagePathsService = inject(PagePathsService);
  subscription: Subscription;

  page: WritableSignal<string> = signal('');

  ngOnInit() {
    const params: string | null = localStorage.getItem('paramsFilmHub');

    if (!params) {
      localStorage.setItem('paramsFilmHub', JSON.stringify(newParams));
    }

    this.subscription = this.pagePathsService.currentPage$.subscribe((page: string) => {
      this.page.set(page);
    });
  }

  protected readonly currentPage = currentPage;
}
