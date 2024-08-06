import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../userService/user.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
 
})
export class UsersComponent implements OnInit, AfterViewInit {
  
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'address', 'phoneNo', 'gender', 'age'];
  dataSource = new MatTableDataSource<any>(); // Declare dataSource

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Add paginator view child
  ngAfterViewInit()  {
    this.dataSource.paginator = this.paginator; // Set paginator after view initialization
  }

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (data) => {
        
        console.log(data);
        this.dataSource = data; // Assign data to dataSource
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  
}

