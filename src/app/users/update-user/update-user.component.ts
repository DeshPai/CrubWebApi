import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

   userId:any;
   userDetails:any;
   updateUserform:FormGroup= new FormGroup({});
   dataLoaded:boolean = false;
  constructor(private activatedRoute:ActivatedRoute,private UserService:UserService,
               private formBuilder:FormBuilder,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.dataLoaded = false;
    this.activatedRoute.params.subscribe(data=>{
     this.userId = data['id'];
    });
    if(this.userId !== ''){
      // View User Details
      this.UserService.viewUser(this.userId)
      .toPromise()
       .then(data=>{
       this.userDetails=data;
         //Object.assign(this.userDetails,data);
         console.log(this.userDetails);

         // Build Update Form 
         this.updateUserform = this.formBuilder.group({
          'name':new FormControl(this.userDetails.name, [Validators.required,Validators.minLength(4)] ),
          'email':new FormControl(this.userDetails.email , [Validators.required,Validators.email]) ,
          'phone':new FormControl(this.userDetails.phone,[Validators.required,Validators.max(10)])
         })
         this.dataLoaded=true;
       }) 
        .catch(err =>{
          console.log(err)
           });
    }
  }

  updateUser(){
    this.UserService.updateUser(this.userId,this.updateUserform.value).subscribe(data =>{
      this._snackBar.open("User Updated Successfully");
    },err =>{
       //console.log(err);
       this._snackBar.open(" Unable to Update User ");
    })
   
  }

}
