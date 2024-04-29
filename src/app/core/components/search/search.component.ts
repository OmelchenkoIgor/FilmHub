import {Component, inject, input, InputSignal, OnInit, output, OutputEmitterRef, signal, WritableSignal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';

import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';

import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NzInputGroupComponent,
    NzInputDirective,
    NzIconDirective,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  private apiService: ApiService = inject(ApiService);

  category: InputSignal<string> = input.required();

  page: OutputEmitterRef<number> = output();
  searchContent: OutputEmitterRef<any> = output();

  searchValue: WritableSignal<string> = signal('');
  searchValue$: Observable<string> = toObservable(this.searchValue);

  search: string = '';

  ngOnInit() {
    this.searchValue$.subscribe((value: string) => {
      if (value != '') {
        this.apiService.getSearchContent(value, this.category(), 'uk').subscribe({
          next: (response) => {
            this.searchContent.emit(response['results']);
            this.page.emit(0);
          }
        })
      } else {
        this.searchContent.emit(null);
        this.page.emit(0);
      }
    })
  }

  onSearch() {
    this.searchValue.set(this.search);
  }
}
