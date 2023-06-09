import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  taskObj : Task = new Task();
  taskArr:Task[]=[];
  addtaskValue: string ='';
  editTaskValue : string ='';

   constructor(private crudService:CrudService){}

   ngOnInit():void{
    this.editTaskValue='';
    this.addtaskValue='';
    this.taskObj = new Task();
    this.getAllTask();
    this.taskArr=[];
   }
  getAllTask() {
    this.crudService.getAllTask().subscribe(res=>{
     this.taskArr=res;
    }, err=>{
      alert('Enable to get task List');
    })
  }
   addTask(){
    this.taskObj.task_name=this.addtaskValue;
     this.crudService.addTask(this.taskObj).subscribe(res=>{
       this.ngOnInit();
       this.addtaskValue='';
     }, err =>{
      alert(err);
     })
   }
   editTask(){
    this.taskObj.task_name=this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res =>{

    }, err =>{
     alert('Echec de mise à jour !');
    })
   }

   deleteTask(etask:Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
     this.ngOnInit();
    }, err =>{ alert('Echec de supprission de l\'entité');})
   }
call(etask : Task){
  this.taskObj=etask;
  this.editTaskValue=etask.task_name;
}

}
