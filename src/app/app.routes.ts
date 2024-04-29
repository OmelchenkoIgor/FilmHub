import {Routes} from '@angular/router';

import {MovieComponent} from './features/pages/movie/movie.component';
import {TvComponent} from './features/pages/tv/tv.component';
import {BookmarkComponent} from './features/pages/bookmark/bookmark.component';
import {MovieDetailsComponent} from './features/pages/movie-details/movie-details.component';
import {TvDetailsComponent} from './features/pages/tv-details/tv-details.component';

export const routes: Routes = [
  {path: '', redirectTo: 'movie', pathMatch: 'full'},
  {path: 'movie', component: MovieComponent},
  {path: 'movie/:id', component: MovieDetailsComponent},
  {path: 'tv', component: TvComponent},
  {path: 'tv/:id', component: TvDetailsComponent},
  {path: 'bookmark', component: BookmarkComponent}
];
