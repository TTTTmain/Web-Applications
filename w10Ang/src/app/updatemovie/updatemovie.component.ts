import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-updatemovie',
  templateUrl: './updatemovie.component.html',
  styleUrls: ['./updatemovie.component.css']
})
export class UpdatemovieComponent implements OnInit {
  listToUpdateArr:any=[]
  movieName:string = "";
  movieId:string = "";
  movieYear:number=0;

  constructor(private dbService:DbServiceService) { }

  ngOnInit(): void {
    this.onGetMovies();
  }

  clearTft(){
    this.movieName = "";
    this.movieYear = 0;
    this.movieId = "";
  }

  onGetMovies(){
    this.dbService.getMovies().subscribe((data:any)=>{
      this.listToUpdateArr = data;
    });
  }

  onSelectToUpdate(movie:any){
    this.movieName = movie.name;
    this.movieYear = movie.bYear;
    this.movieId = movie._id;
  }

  onUpdateMovie(){
    let toUpdate = {name: this.movieName, bYear: this.movieYear};
    this.dbService.updateMovie(this.movieId,toUpdate).subscribe((data:any)=>{
      alert(`Movie: ${data.name} is updated.`);
      this.clearTft();
      this.onGetMovies();
    });
  }

}
