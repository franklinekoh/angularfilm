import { Component, OnInit } from '@angular/core';
import { Createfilm } from '../createfilm';
import { ToastrService } from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import { FilmsService } from '../films.service';

@Component({
  selector: 'app-createfilm',
  templateUrl: './createfilm.component.html',
  styleUrls: ['./createfilm.component.css']
})
export class CreatefilmComponent implements OnInit {

  constructor(
    private filmsService: FilmsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  createFilm: Createfilm = new Createfilm();
  // formData: FormData = new FormData();
  selectedFile: File = null;

  resetForm(form: NgForm){

    if(form != null){
      form.reset();

      this.createFilm = {
        
        photo: null,
        description: '',
        ticket: null,
        rating: null,
        country: '',
        genre: '',
        filmName: '',
        slug: '',
        releaseDate: ''
      }
    }
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    // this.formData.append('file', this.selectedFile, this.selectedFile.name);

    console.log(this.selectedFile);
  }


  onSubmit(form: NgForm){

    console.log(form.value);

    const body = new FormData();
          body.append('photo', this.selectedFile, this.selectedFile.name);
          body.append('filmName', form.value.filmName);
          body.append('ticket', form.value.ticket);
          body.append('genre', form.value.genre);
          body.append('rating', form.value.rating);
          body.append('country', form.value.country);
          body.append('releaseDate', form.value.releaseDate);
          body.append('slug', form.value.slug);
          body.append('description', form.value.description);

          console.log(body.get('photo'));
    this.filmsService.createFilm(body).subscribe((data) => {
        console.log(data);

        if(data.status == "success"){
          this.resetForm(form);
            this.toastr.success(data.message);
        }else{
          this.toastr.error('Error while creating film '+ data.message);
        }
    }, (err) => {
      console.log(err)
    });
  }
}
