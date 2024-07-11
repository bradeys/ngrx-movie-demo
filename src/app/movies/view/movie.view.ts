import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MovieService } from '../services/movie.service';
import { MovieStore } from '../services/movie.store';
import { Pagination } from '../types';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie.view.html',
  styleUrls: ['./movie.view.scss'],
  providers: [MovieStore, MovieService]
})
export class MovieViewComponent implements OnInit {
  viewModel$ = this.store.viewModel$;

  constructor(private store: MovieStore) {}

  ngOnInit() {
    this.viewModel$.subscribe(x =>
      console.log('- MovieViewComponent viewModel$ emitted')
    );

    console.log('- MovieViewComponent OnInit()');
    this.store.loadMovies();
  }

  onSortChange(sort: Sort): void {
    console.log('- MovieViewComponent onSortChange()');
    this.store.updateSort(sort);
  }

  onPaginationChange(pagination: Pagination): void {
    console.log('- MovieViewComponent onPaginationChange()');
    this.store.updatePagination(pagination);
  }
}
