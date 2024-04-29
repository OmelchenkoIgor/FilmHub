import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Subscription} from 'rxjs';

import {showFooter} from './core/utils/showFooter';

import {SidebarComponent} from './core/components/sidebar/sidebar.component';
import {FooterComponent} from './core/components/footer/footer.component';

import {PagePathsService} from './core/services/page-paths.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  pagePathsService: PagePathsService = inject(PagePathsService);
  subscription: Subscription;
  page: WritableSignal<string> = signal('')

  ngOnInit() {
    this.subscription = this.pagePathsService.currentPage$.subscribe((page: string) => {
      this.page.set(page);
    });
  }

  protected readonly showFooter = showFooter;
}
