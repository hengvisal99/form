import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'login';
  displayedColumns: string[] = [ 'firstName', 'lastName', 'name', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog : MatDialog , private api : ApiService){}
  ngOnInit(): void {
    this.getAllUser();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'save') {
        this.getAllUser(); 
      }
    });
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

  editUser(row : any){
    this.dialog.open(DialogComponent ,{
      width:'30%',
      data:row
    }).afterClosed().subscribe( val =>{
      if(val === 'update'){
        this.getAllUser();
      }
    })
  }

  deleteUser(id : number){
    this.api.deleteUser(id).subscribe({
      next: (res)=>{
        alert("User delete sucessfully")
        this.getAllUser();
      },
      error:() =>{
        alert("Error deleting user")
      }
       
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


 
}
