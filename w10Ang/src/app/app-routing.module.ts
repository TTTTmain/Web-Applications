import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddactorComponent} from 'src/app/addactor/addactor.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { ListactorComponent } from './listactor/listactor.component';
import { ListmovieComponent } from './listmovie/listmovie.component';
import { ManagemovieactorComponent } from './managemovieactor/managemovieactor.component';
import { PathNotfoundComponent } from './path-notfound/path-notfound.component';
import { UpdateactorComponent } from './updateactor/updateactor.component';
import { UpdatemovieComponent } from './updatemovie/updatemovie.component';

const routes: Routes = [
  {path:"", redirectTo: "listactor", pathMatch: "full" },
  {path:"addactor",component:AddactorComponent},
  {path:"listactor",component:ListactorComponent},
  {path:"updateactor",component:UpdateactorComponent},
  {path:"addmovie",component:AddmovieComponent},
  {path:"listmovie",component:ListmovieComponent},
  {path:"updatemovie",component:UpdatemovieComponent},
  {path:"managemovieactor",component:ManagemovieactorComponent},
  {path:"404",component:PathNotfoundComponent},
  {path:"**",redirectTo:'404'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
