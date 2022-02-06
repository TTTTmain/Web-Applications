import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';
@Component({
  selector: 'app-listactor',
  templateUrl: './listactor.component.html',
  styleUrls: ['./listactor.component.css']
})
export class ListactorComponent implements OnInit {
  constructor(private dbService:DbServiceService) { }
  actorArr:any = [];

  ngOnInit(): void {
    this.onGetActors()
  }

  onGetActors(){
    this.dbService.getActors().subscribe((data:any)=>{
      this.actorArr = data;
    });
  }

  deleteActorById(actor:any){
    console.log(actor);
    if(confirm(`You are about to delete actor ${actor.name}.\n Do you want proceed?`)){
      this.dbService.deleteActor(actor._id).subscribe((data:any)=>{
        this.onGetActors();
      });
    } else {
      alert("No actor deleted")
    }
  }

}
