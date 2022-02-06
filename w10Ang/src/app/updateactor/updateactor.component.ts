import { Component, OnInit } from '@angular/core';
import {DbServiceService} from '../db-service.service';
@Component({
  selector: 'app-updateactor',
  templateUrl: './updateactor.component.html',
  styleUrls: ['./updateactor.component.css']
})
export class UpdateactorComponent implements OnInit {
  listToUpdateArr:any = [];
  actorName:string = "";
  actorBYear:number = 0;
  actorId:string = "";

  constructor(private dbService:DbServiceService) { }
  onGetActors(){
    this.dbService.getActors().subscribe((data:any)=>{
      this.listToUpdateArr = data;
    })
  }

  onSelectToUpdate(actor:any){
    this.dbService.getActor(actor._id).subscribe((data:any)=>{
      this.actorId = data._id;
      this.actorName = data.name;
      this.actorBYear = data.bYear;
    })
  }

  onUpdateActor(){
    let updateData = {name:this.actorName, bYear: this.actorBYear}
    this.dbService.updateActor(this.actorId,updateData).subscribe(()=>{
      this.onGetActors();
      alert(`Actor: ${this.actorName}  updated`);

      this.actorId = "";
      this.actorName = "";
      this.actorBYear = 0;
    })
  }

  ngOnInit(): void {
    this.onGetActors();
  }

}
