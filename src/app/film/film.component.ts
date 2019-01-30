import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../films.service';
import { Post } from '../post';
import { ToastrService } from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  constructor(private route: ActivatedRoute,
  private filmsService: FilmsService,
  private toastr: ToastrService) { }

  ngOnInit() {
    this.getFilm();
  }

  public data: any;

  post: Post = new Post();

  resetForm(form: NgForm){

    if(form != null){
      form.reset();

      this.post = {
        name: '',
        comment: '',
        film_id: ''
      }
    }
  }

  getFilm(){
    var slug: string = this.route.snapshot.paramMap.get('slug');
    // console.log(slug);
    this.filmsService.getFilm(slug).subscribe((data: any[]) => {
      // console.log(data);
     this.data = data;
    }, err => {
      console.log(err);

    });
  }

  onSubmit(form: NgForm){
// console.log(JSON.parse(localStorage.getItem('currentUser')));
      if(localStorage.getItem('currentUser')){
        // console.log(JSON.parse(localStorage.getItem('currentUser'))['auth_token']);
        this.filmsService.postComment(form.value, this.data.data.film.id).subscribe((data) => {
          console.log(data);
 
          if(data.status == "success"){

            this.resetForm(form);
            this.toastr.success(data.message);
          }else{
            this.toastr.error('Error while posting comment try again '+ data.message);
          }
      });
      }else{
        console.log('login to post a comment');
        this.toastr.error('Login to post a comment')
      }

      
  }

}
