import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormComponent } from './DataFormComponent';

describe('DataFormComponent', () => {
  let component: DataFormComponent;
  let fixture: ComponentFixture<DataFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataFormComponent]
    });
    fixture = TestBed.createComponent(DataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
