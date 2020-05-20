import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmResultComponent } from './film-result.component';

describe('FilmResultComponent', () => {
  let component: FilmResultComponent;
  let fixture: ComponentFixture<FilmResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
