import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  
  userId:string='';
  userDetails:any;
  deleteUserForm:FormGroup=new FormGroup({});
  dataLoaded:boolean=false;
  constructor(private activatedRoute:ActivatedRoute, private userService:UserService,
              private _snackBar: MatSnackBar,private router:Router ,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.dataLoaded=false;
    this.activatedRoute.params.subscribe(data =>{
     this.userId=data['id'];
    });
   
    if(this.userId !==''){
      // View User Details
    this.userService.viewUser(this.userId)
   .toPromise()
   .then(data=>{
     this.userDetails = data;
     //Object.assign(this.userDetails,data);
     console.log(this.userDetails);

     // Build Delete Form 
     this.deleteUserForm=this.formBuilder.group({
     'name':new FormControl(this.userDetails.name,[Validators.required,Validators.minLength(4)]),
     'email':new FormControl(this.userDetails.email,[Validators.required,Validators.email]),
     'phone':new FormControl(this.userDetails.phone,[Validators.required])

     })
     this.dataLoaded=true;
    })
   .catch(err=>{
     console.log(err)
    });
    }
  }
  deleteUser(){
    if(this.userId){
      this.userService.deleteUser(this.userId).subscribe(data=>{
        this._snackBar.open("User Deleted Successfully");
         this.router.navigateByUrl('/');
      },err=>{
        this._snackBar.open("Unable To Delete User ")
    })
    }
  }

}
