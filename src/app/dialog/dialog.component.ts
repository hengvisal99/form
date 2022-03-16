import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  form!: FormGroup;
  actionBtn : string = "save";
  dataSource !: MatTableDataSource<any>;
     paginator: any;
  sort: any;

  constructor(private fb : FormBuilder , @Inject(MAT_DIALOG_DATA) public editData : any , private api : ApiService , private dialog : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      firstName : ['' , Validators.required],
      lastName : ['' , Validators.required],
      name : ['' , Validators.required],
      password : ['' , Validators.required],
    })

    console.log(this.editData)
    if(this.editData){
      this.actionBtn = "Update"
      this.form.controls['firstName'].setValue(this.editData.firstName);
      this.form.controls['lastName'].setValue(this.editData.lastName);
      this.form.controls['name'].setValue(this.editData.name);
      this.form.controls['password'].setValue(this.editData.password);
    }

  }

  save(){
    if(!this.editData)
    {
      if(this.form.valid){
        this.api.postUser(this.form.value).subscribe({
          next: res => {
            alert("User added sucessfully");
            this.form.reset();
            this.dialog.close();
          },
          error: () => {
            alert("Error")
          }
        })
      }
    }
    else{
      this.update();
    }

    console.log(this.form.value);
  }

  update(){
    this.api.putUser(this.form.value , this.editData.id).subscribe({
      next: (res) =>{
        alert("User updated successfully");
        this.form.reset();
        this.dialog.close('update');
      },
      error:() =>{
        alert("Error updating user")
      }
    })
  }
  getAllUser(){
    this.api.getUser().subscribe({
      next:(res) => {

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      error:(err) => 
      {
        alert("Error fecting the record")
      }
    })
  }
}
