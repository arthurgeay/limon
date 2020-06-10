import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public stats: any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    // get all statistics for admin page
    this.http.get(`https://api-limon.app-tricycle.com/api/admin/stats`)
    .subscribe(
      (data:any)=>{
        this.stats = data;             
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
