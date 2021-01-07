import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import {PublicService} from '../../services/public.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;
  responseData: any;
  latf = 0;
  lats = 0;
  lngf = 0;
  lngs = 0;
  per: any;
  tableData = [];
  constructor(
    private publicService: PublicService
  ) { }

  async ngOnInit() {
    await this.getPublicData();
    this.manageLabels();
    this.generateDataForTable();
  }

  getPublicData() {
    return new Promise((resolve, reject) => {
      this.publicService.getData().subscribe(response => {
        this.responseData = response;
        this.per = (this.responseData.length / 100 ) * 100;
        resolve(0);
      });
    });
  }

  manageLabels() {
    this.responseData.forEach(response => {
      if (response.address.geo.lat > 0) {
        this.latf = this.latf + 1;
      }
      if (response.address.geo.lat < 0) {
        this.lats = this.lats + 1;
      }
      if (response.address.geo.lng > 0) {
        this.lngf = this.lngf + 1;
      }
      if (response.address.geo.lng < 0) {
        this.lngs = this.lngs + 1;
      }
    });
    this.viewChartData(this.latf, this.lats, this.lngf, this.lngs );
  }

  viewChartData(latf, lats, lngf, lngs) {
    this.data = {
      labels : ['Latitude > 0', 'Latitude < 0', 'Longtitude > 0', 'Longtitude < 0'],
      datasets : [
          {
              data : [latf, lats, lngf, lngs],
              backgroundColor : [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#949FB1'
              ],
              hoverBackgroundColor : [
                  '#F7464A',
                  '#46BFBD',
                  '#FDB45C',
                  '#949FB1'
              ]
          }]
      };
  }

  generateDataForTable() {
    this.responseData.forEach((element) => {
      const tempJson = {};
      tempJson['S_No'] = element.id;
      tempJson['Name'] = element.name;
      tempJson['Username'] = element.username;
      tempJson['City'] = element.address.city;
      tempJson['Pincode'] = element.address.zipcode;
      tempJson['Company_Name'] = element.company.name;
      this.tableData.push(tempJson);
    });
  }

}
