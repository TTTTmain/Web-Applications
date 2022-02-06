import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-managemovieactor',
  templateUrl: './managemovieactor.component.html',
  styleUrls: ['./managemovieactor.component.css']
})
export class ManagemovieactorComponent implements OnInit {
  movieArr:any=[];
  actorArr:any=[];
  movieToUpdate:any = null;
  actorInMovie:any = null
  selectedMovieId:string = "";
  showSection:boolean = false;
  actorToAddId:string ="";

  constructor(private dbService:DbServiceService) { }

  ngOnInit(): void {
    this.onGetMovies();
    this.onGetActors();
  }

  getMovie(){
    this.dbService.getMovie(this.selectedMovieId).subscribe((data:any)=>{
      console.log(data);
      this.movieToUpdate = data;
      this.actorInMovie = this.movieToUpdate.actors;
      this.showSection= true;
    });
  }

  onGetMovies(){
    this.dbService.getMovies().subscribe((data:any)=>{
      this.movieArr = data;
    });
  }

  addActorToMovie(){
    this.dbService.associateActorAndMovie(this.actorToAddId,this.selectedMovieId).subscribe((data:any)=>{
      this.onGetActors();
      this.onGetMovies();
      this.getMovie()
    })
    
  }

  onGetActors(){
    this.dbService.getActors().subscribe((data:any)=>{
      this.actorArr = data;
    });
  }

  removeActorFromMovie(actor:any){
    this.dbService.deassociateMovieAndActor(this.movieToUpdate._id,actor._id).subscribe((data:any)=>{
      this.onGetActors();
      this.onGetMovies();
      this.getMovie()
    });
  }

  closeSection(){
    this.showSection = false;
  }

}
