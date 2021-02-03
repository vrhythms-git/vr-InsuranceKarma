import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTilesComponent } from './insurance-tiles.component';

describe('InsuranceTilesComponent', () => {
  let component: InsuranceTilesComponent;
  let fixture: ComponentFixture<InsuranceTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceTilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
