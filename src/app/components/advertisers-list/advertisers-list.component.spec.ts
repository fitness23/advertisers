import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisersListComponent } from './advertisers-list.component';

describe('AdvertisersListComponent', () => {
  let component: AdvertisersListComponent;
  let fixture: ComponentFixture<AdvertisersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
