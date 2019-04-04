import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentVersionComponent } from './current-version.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('CurrentVersionComponent', () => {
  let component: CurrentVersionComponent;
  let fixture: ComponentFixture<CurrentVersionComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CurrentVersionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setVersion', () => {
    it('should set version', () => {
      expect(component.version).toBeTruthy();
    });
  });
});
