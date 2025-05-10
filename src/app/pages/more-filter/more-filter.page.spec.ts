import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoreFilterPage } from './more-filter.page';

describe('MoreFilterPage', () => {
  let component: MoreFilterPage;
  let fixture: ComponentFixture<MoreFilterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
