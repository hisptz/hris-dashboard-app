import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMenuListComponent } from './dashboard-menu-list.component';
import { FilterByNamePipe } from 'src/app/shared/pipes/filter-by-name.pipe';
import { DashboardMenuItemComponent } from '../dashboard-menu-item/dashboard-menu-item.component';

describe('DashboardMenuListComponent', () => {
  let component: DashboardMenuListComponent;
  let fixture: ComponentFixture<DashboardMenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardMenuListComponent,
        FilterByNamePipe,
        DashboardMenuItemComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
