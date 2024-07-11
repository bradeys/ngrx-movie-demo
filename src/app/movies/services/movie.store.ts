import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { Pagination } from "../types";
import { Movie } from "../types/movie";
import { paginateMovies, sortMovies } from "./movie.helpers";
import { MovieService } from "./movie.service";

import { ComponentStore } from "@ngrx/component-store";

interface MovieState {
   movies: Movie[];
   sort: Sort;
   pagination: Pagination;
}

const initialState: MovieState = {
   movies: [],
   sort: { active: 'title', direction: 'asc' },
   pagination: { pageIndex: 0, pageSize: 2 },
};

@Injectable()
export class MovieStore extends ComponentStore<MovieState> {

  constructor(private service: MovieService) {
     super(initialState);
     console.log('- MovieStore constructor initialize Store');
  }

  //readonly movies$: Observable<Movie[]> = this.select(state => state.movies);
  //readonly movies$: Observable<Movie[]> = this.select(({movies}) => movies);
  readonly movies$: Observable<Movie[]> = this.select(({movies}) => {
     console.log('- MovieStore movies$ selector');
     return movies;
  });

  readonly sort$: Observable<Sort> = this.select(({sort}) => {
     console.log('- MovieStore sort$ selector');
     return sort;
  });

  readonly sortedMovies$ = this.select(
     this.sort$, 
     this.movies$,
     //(sort, movies) => sortMovies(sort, movies)
     (sort, movies) => {
        console.log('- MovieStore sortedMovies$ selector');
        return sortMovies(sort, movies);
    }
  )

  readonly pagination$: Observable<Pagination> = this.select(({pagination}) => {
      console.log('- MovieStore pagination$ selector');
      return pagination;
  });

  readonly paginatedMovies$ = this.select(
     this.pagination$, 
     this.sortedMovies$,
     //(pagination, movies) => paginateMovies(pagination, movies)
     (pagination, movies) => {
        console.log('- MovieStore paginatedMovies$ selector');
        return paginateMovies(pagination, movies);
     }
  )

  readonly viewModel$ = this.select(
     this.paginatedMovies$, this.sort$, this.pagination$,
     //(movies, sort, pagination) =>  ({movies, sort, pagination})
     (movies, sort, pagination) => {
        console.log('- MovieStore viewModel$ selector')
        return {movies, sort, pagination};
     }
  )

  //private readonly updateMovies = this.updater((state, movies: Movie[]) => ({ ...state, movies }));
  private readonly updateMovies = this.updater((state, movies: Movie[]) => {
     console.log('- MovieStore updateMovies updater');
     return {...state, movies};
  });

  readonly updateSort = this.updater((state, sort: Sort) => {
     console.log('- MovieStore updateSort updater');
     return {...state, sort};
  });

  readonly updatePagination = this.updater((state, pagination:Pagination) => {
     console.log('- MovieStore updatePagination updater');
     return {...state, pagination};
  });

  readonly loadMovies = this.effect((void$: Observable<void>) => void$.pipe(
     switchMap(() => {
        console.log('- MovieStore loadMovies effect()');
        return this.service.getMovies().pipe(
           tap(movies => this.updateMovies(movies))
        );
    })
  ));
}

