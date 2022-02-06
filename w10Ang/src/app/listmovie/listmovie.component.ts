import { Component, OnInit } from '@angular/core';
import {DbServiceService} from '../db-service.service'
@Component({
  selector: 'app-listmovie',
  templateUrl: './listmovie.component.html',
  styleUrls: ['./listmovie.component.css']
})
export class ListmovieComponent implements OnInit {
  movieArr:any=[];
  constructor(private dbService:DbServiceService) { }

  ngOnInit(): void {
    this.onGetMovies();
  }

  onGetMovies(){
    this.dbService.getMovies().subscribe((data:any)=>{
      console.log(data);
      this.movieArr = data;
    })
  }

  onDeleteMovie(movie){
    if(confirm(`You are about to delete movie ${movie.name}.\nDo you want to proceed?`)){
      this.dbService.deleteMovie(movie._id).subscribe(()=>{
        this.onGetMovies();
      })
    } else{
      alert("No movie deleted.")
    }

  }

}
