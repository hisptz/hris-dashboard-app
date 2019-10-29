import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMenuComponent } from './dashboard-menu.component';
import { DashboardMenuListComponent } from '../dashboard-menu-list/dashboard-menu-list.component';
import { FilterByNamePipe } from 'src/app/shared/pipes/filter-by-name.pipe';
import { DashboardMenuItemComponent } from '../dashboard-menu-item/dashboard-menu-item.component';

describe('DashboardMenuComponent', () => {
  let component: DashboardMenuComponent;
  let fixture: ComponentFixture<DashboardMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardMenuComponent,
        DashboardMenuListComponent,
        DashboardMenuItemComponent,
        FilterByNamePipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
