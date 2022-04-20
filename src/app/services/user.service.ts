import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../users/list-users/list-users.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl :string ='https://jsonplaceholder.cypress.io/';
  constructor(private httpClient:HttpClient ) { }

  listUsers():Observable<User[]>{
   return this.httpClient.get<User[]>(this.baseUrl+'users')
  }
  viewUser(id : string){
    return this.httpClient.get(this.baseUrl+'users/'+id)
  }
  createUser(userObj:any){
  return this.httpClient.post(this.baseUrl+'users',userObj)
  }
  deleteUser(id:any){
    return this.httpClient.delete(this.baseUrl+'users/'+id)
  }
   updateUser(id:any,userObj:any){
    return this.httpClient.put(this.baseUrl+'users/'+id,userObj)
   }
}
