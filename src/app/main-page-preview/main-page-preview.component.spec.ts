import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPagePreviewComponent } from './main-page-preview.component';

describe('MainPagePreviewComponent', () => {
  let component: MainPagePreviewComponent;
  let fixture: ComponentFixture<MainPagePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPagePreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
