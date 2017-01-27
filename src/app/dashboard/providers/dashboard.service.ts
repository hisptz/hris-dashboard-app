import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs"
import {Dashboard} from "../interfaces/dashboard";
import {Constants} from "../../shared/constants";
import {UtilitiesService} from "./utilities.service";
import {isNull} from "util";

@Injectable()
export class DashboardService {
  dashboards: Dashboard[];
  dashboardName: string;
  url: string;
  constructor(
    private http: Http,
    private constant: Constants,
    private utilService: UtilitiesService
  ) {
    this.url = this.constant.root_url + 'api/dashboards';
    this.dashboards = [];
  }

  all(): Observable<Dashboard[]> {
    return Observable.create(observer => {
      if(this.dashboards.length > 0) {
        observer.next(this.dashboards)
      } else {
        this.http.get(this.url +  '.json?paging=false&fields=id,name')
          .map((res: Response) => res.json())
          .catch(this.utilService.handleError)
          .subscribe(
          response => {
            this.dashboards = response.dashboards;
            observer.next(this.dashboards)
          },
          error => {
            observer.next(error)
          })
      }
    });
  }

  find(id: string): Observable<Dashboard> {
    return Observable.create(observer => {
      let dashboard: any = null;
      for(let dashboardData of this.dashboards) {
        if(dashboardData.id == id) {
          dashboard = dashboardData;
          break;
        }
      }
      if(!isNull(dashboard)) {
        observer.next(dashboard)
      } else {
        this.http.get(this.url + '/' + id + '.json?fields=id,name')
          .map((res: Response) => res.json())
          .catch(this.utilService.handleError)
          .subscribe(
            dashboard => {
              this.dashboards.push(dashboard);
              observer.next(dashboard);
            },
            error => {
              observer.error(error)
            })
      }

    })
  }

  getName(): Observable<string> {
    return Observable.create(observer => {
      observer.next(this.dashboardName);
    })
  }

  setName(name : string, id?: string) {
    if(id) this.find(id).subscribe(dashboard => {this.dashboardName = dashboard.name;});
    if(!isNull(name)) this.dashboardName = name;
  }

  create(dashboardData: Dashboard): Observable<string> {
    return Observable.create(observer => {
      this.http.post(this.url, dashboardData)
          .map(response => {
            let dashboardid: string = null;
            response.headers.forEach((headerItem, headerIndex) => {
              if(headerIndex == 'location') {
                dashboardid = headerItem[0].split("/")[2];
              }
            });
            return {id: dashboardid, name:dashboardData.name};
          })
        .catch(this.utilService.handleError)
        .subscribe(
          dashboard => {
          this.dashboards.push(dashboard);
          observer.next(dashboard.id);
          observer.complete();
          },
          error => {
            observer.error(error);
          });
    })
  }

  update(dashboardData: Dashboard): Observable<any> {

    this.setName(dashboardData.name);
    for(let dashboard of this.dashboards) {
      if(dashboard.id == dashboardData.id) {
        this.dashboards[this.dashboards.indexOf(dashboard)] = dashboardData;
        break;
      }
    }
    return this.http.put(this.url + '/'+ dashboardData.id, {name: dashboardData.name})
      .catch(this.utilService.handleError)
  }

  delete(id: string): Observable<any> {

    for(let dashboard of this.dashboards) {
      if(dashboard.id == id) {
        this.dashboards.splice(this.dashboards.indexOf(dashboard));
        break;
      }
    }
    return this.http.delete(this.url + '/' + id)
      .map((res: Response) => res.json())
      .catch(this.utilService.handleError)
  }

}
