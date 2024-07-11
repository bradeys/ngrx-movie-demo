import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MovieListComponent } from './components';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MovieViewComponent } from './view';

@NgModule({
  imports: [ 
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule 
  ],
  declarations: [ 
    MovieViewComponent,
    MovieListComponent
  ],
  exports: [ 
    MovieViewComponent,
    MovieListComponent
  ]
})
export class MoviesModule { }
