import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Movie, Pagination } from '../../types';

@Component({
  selector: 'app-movie-list',
  styleUrls: ['movie-list.component.scss'],
  templateUrl: 'movie-list.component.html',
})
export class MovieListComponent {
  columns = ['title', 'year'];

  @Input() movies: Movie[];
  @Input() paginatedMovies: Movie[];
  @Input() sort: Sort;
  @Input() pagination: Pagination;

  @Output() paginationChange = new EventEmitter<Pagination>();
  @Output() sortChange = new EventEmitter<Sort>();
}