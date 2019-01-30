import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  constructor(private filmService: FilmsService) { }

  ngOnInit() {
    this.getFilms();
  }

  collection: any[];
  p: number = 1;

  getFilms(){

    this.filmService.getFilms().subscribe((data: any[]) => {
      console.log(data);
      this.collection = data;
    }, err => {
      console.log(err);

    });
  }


}
