import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import {DbServiceService} from '../db-service.service';
@Component({
  selector: 'app-addactor',
  templateUrl: './addactor.component.html',
  styleUrls: ['./addactor.component.css']
})
export class AddactorComponent implements OnInit {
  actorName:string = "";
  actorBYear:number = 0;

  constructor(private dbService:DbServiceService) { }

  ngOnInit(): void {
  
  }

  clearTft(){
    this.actorName="";
    this.actorBYear=0;
  }

  addActor(){
    let newActor = {name:this.actorName, bYear:this.actorBYear}
    this.dbService.createActor(newActor).subscribe((data:any)=>{
      alert(`${data.name} is added to the actor list.`);
    });
    this.clearTft();
  }

  


}
