import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":"application/json",
  })
}

@Injectable({
  providedIn: 'root'
})

export class DbServiceService {

  constructor(private http:HttpClient) {}

  getActors(){
    return this.http.get('/actors')
  }

  getActor(id){
    return this.http.get(`/actors/${id}`);
  }

  createActor(data){
    return this.http.post('/actors',data,httpOptions);
  }

  updateActor(id,data){
    return this.http.put(`/actors/${id}`,data,httpOptions);
  }

  deleteActor(id){
    return this.http.delete(`/actors/${id}`,httpOptions);
  }

  getMovies(){
    return this.http.get('/movies')
  }

  getMovie(id){
    return this.http.get(`/movies/${id}`)
  }

  addMovie(data){
    return this.http.post('/movies',data,httpOptions);
  }

  updateMovie(id,data){
    return this.http.put(`/movies/${id}`,data,httpOptions);
  }

  deleteMovie(id){
    return this.http.delete(`/movies/${id}`,httpOptions);
  }

  associateActorAndMovie(a_id,m_id){
    return this.http.put(`/actors/${a_id}/movies/${m_id}`,httpOptions);
  }

  deassociateMovieAndActor(m_id,a_id){
    return this.http.delete(`/actor/${a_id}/delmovie/${m_id}`,httpOptions);
  };

  deleteMovieBeforeYear(year){
    return this.http.delete(`/movies/delbeforeyear/${year}`,httpOptions);
  }

  labTask(year){
    return this.http.get(`/actor/year/${year}`);
  }
}
