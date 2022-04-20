import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

export interface User {
  id:number;
  name: string;
  username: string;
  email: string;
  phone: number;
}

const ELEMENT_DATA: User[] = [
  //{id: 1, name: 'Hydrogen', username: 'Desh', email: 'ds@test.com',phone:9999999999},
  
];




@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'email','phone','actions'];
  dataSource = ELEMENT_DATA;

 listUsers: User[]=[];

  //listUsers$: object;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
   this.userService.listUsers().subscribe(data=>{
    this.listUsers =data;
    // this.dataSource =data;
  });
   //this.userService.listUsers().subscribe(
   // UserService => return this.listUsers = UserService;
  
    //)
  }

  
}
