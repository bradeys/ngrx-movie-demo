import { Sort } from '@angular/material/sort';
import { Movie, Pagination } from '../types';

export function sortMovies(sort: Sort, movies: Movie[]) {
   console.log('- MovieHelpers sortMovies()');
   return [...movies].sort((movie1, movie2) => 
      (movie1[sort.active] < movie2[sort.active] ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1));
}

export function paginateMovies(pagination: Pagination, movies: Movie[]) {
   console.log('- MovieHelpers paginateMovies()');
   const { pageIndex, pageSize } = pagination;
   return movies.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
}