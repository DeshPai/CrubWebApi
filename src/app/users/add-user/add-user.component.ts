import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

addUserForm: FormGroup = new FormGroup({});

  constructor(private formBuilder:FormBuilder, private  userService:UserService ,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.addUserForm=this.formBuilder.group({
      'username':new FormControl('', [Validators.required,Validators.minLength(4)]),
      'email':new FormControl('',[Validators.required,Validators.email]),
      'phone':new FormControl('',[Validators.required])
    })
  }

  createUser(){
    this.userService.createUser(this.addUserForm.value).subscribe(data =>{
      this._snackBar.open("User Created Successfully");
    }, err =>{
      //console.log(err);
      this._snackBar.open(" Unable to Create User ");
    })
    
  }


}
