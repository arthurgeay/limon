import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input() reviews;
  public path: string;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    this.path = this.route.snapshot._routerState.url;
  }
  onDelete(id: number) {
    this.http.delete(`https://api-limon.app-tricycle.com/api/review/${id}`)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.path]);
          });
        },
        (error) => {
          console.log(error);
        }
      )
  }

}
