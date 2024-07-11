import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Movie } from "../types/movie";

@Injectable()
export class MovieService {
   getMovies(): Observable<Movie[]> {
      console.log('- MovieService getMovies()');

      var movies: Movie[] = [
        {id: 0, year: 2008, title: 'Taken'},
        {id: 1, year: 1972, title: 'The Godfather'},
        {id: 2, year: 1974, title: 'The Godfather: Part II'},
        {id: 3, year: 1999, title: 'The Matrix'},
        {id: 4, year: 1990, title: 'Goodfellas'},
        {id: 5, year: 2002, title: 'City of God'},
        {id: 6, year: 1994, title: 'Pulp Fiction'},
        {id: 7, year: 1994, title: 'Forrest Gump'},
        {id: 8, year: 2010, title: 'Inception'},
        {id: 9, year: 1999, title: 'Fight Club'}
      ]

      return of(movies);
   }
}