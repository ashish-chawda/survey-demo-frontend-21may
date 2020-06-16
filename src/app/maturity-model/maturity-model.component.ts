import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import chartsData from '../shared/charts-data';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-maturity-model',
  templateUrl: './maturity-model.component.html',
  styleUrls: ['./maturity-model.component.css']
})
export class MaturityModelComponent implements OnInit {

  private chart: am4charts.XYChart;
  constructor(private zone: NgZone, private toastr: ToastrService, private router: Router) { }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {

      var chartJson = JSON.parse(JSON.stringify(chartsData));
      this.chart = am4core.create("chartdiv", am4charts.XYChart);
      this.chart.data = [];
      var criteria;
      var maxCount;
      var firstRecordsCount;
      
      
      for (let index = 0; index < 13; index++) {

        if (index === 0) {
          criteria = "Methodology Approach";
          firstRecordsCount = chartJson.matrixdata[0].data.methodologyapproach;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.methodologyapproach; }));
        }
        else if(index === 1)
        {
          criteria = "Knowledge & Content";
          firstRecordsCount = chartJson.matrixdata[0].data.knowledgecontent;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.knowledgecontent; }));
        }
        else if(index === 2)
        {
          criteria = "Risk Assessment";
          firstRecordsCount = chartJson.matrixdata[0].data.riskassessment;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.riskassessment; }));
        }
        else if(index === 3)
        {
          criteria = "Scheduling";
          firstRecordsCount = chartJson.matrixdata[0].data.scheduling;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.scheduling; }));
        }
        else if(index === 4)
        {
          criteria = "Time Tracking";
          firstRecordsCount = chartJson.matrixdata[0].data.timetracking;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.timetracking; }));
        }
        else if(index === 5)
        {
          criteria = "Audit File Structure";
          firstRecordsCount = chartJson.matrixdata[0].data.auditfilestructure;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.auditfilestructure; }));
        }
        else if(index === 6)
        {
          criteria = "Audit Report";
          firstRecordsCount = chartJson.matrixdata[0].data.auditreport;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.auditreport; }));
        }
        else if(index === 7)
        {
          criteria = "Issue Tracking";
          firstRecordsCount = chartJson.matrixdata[0].data.issuetracking;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.issuetracking; }));
        }
        else if(index === 8)
        {
          criteria = "MI Reporting";
          firstRecordsCount = chartJson.matrixdata[0].data.mireporting;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.mireporting; }));
        }
        else if(index === 9)
        {
          criteria = "Data Analytics";
          firstRecordsCount = chartJson.matrixdata[0].data.dataanalytics;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.dataanalytics; }));
        }
        else if(index === 10)
        {
          criteria = "Technology Implementation";
          firstRecordsCount = chartJson.matrixdata[0].data.technologyimplementation;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.technologyimplementation; }));
        }
        else if(index === 11)
        {
          criteria = "Use Of Technology";
          firstRecordsCount = chartJson.matrixdata[0].data.useoftechnology;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.useoftechnology; }));
        }
        else if(index === 12)
        {
          criteria = "Staff Training";
          firstRecordsCount = chartJson.matrixdata[0].data.stafftraining;          
          maxCount = Math.max.apply(Math, chartJson.matrixdata.map(function(o) { return o.data.stafftraining; }));
        }

        this.chart.data.push({ "criteria": criteria , "firstrecord": firstRecordsCount, "allrecord": maxCount });

      }

      // Create axes
      var categoryAxis = this.chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "criteria";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.horizontalCenter = "right";
      categoryAxis.renderer.labels.template.verticalCenter = "middle";
      categoryAxis.renderer.labels.template.rotation = 0;
      categoryAxis.renderer.inversed = true;      
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;


      var valueAxis = this.chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Benchmark Scores";
      valueAxis.title.fontWeight = '800';
      valueAxis.renderer.opposite = true;     
     

      var series2 = this.chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueX = "allrecord";
      series2.dataFields.categoryY = "criteria";
      series2.clustered = false;
      //series2.columns.template.width = am4core.percent(80);
      series2.tooltipText = "Overall score in {categoryY} : [bold]{valueX}[/]";

       // Create series
       var series = this.chart.series.push(new am4charts.ColumnSeries());
       series.dataFields.valueX = "firstrecord";
       series.dataFields.categoryY = "criteria";
       series.clustered = false;     
        
       //series.columns.template.width = am4core.percent(15);
       series.tooltipText = "Your score in {categoryY} : [bold]{valueX}[/]";
 


      this.chart.cursor = new am4charts.XYCursor();
      this.chart.cursor.lineX.disabled = true;
      this.chart.cursor.lineY.disabled = true;

    });
  }

  logout() {
    localStorage.removeItem('userToken');
    this.toastr.info('You have been logged out !', 'Log Out');
    this.router.navigate(['/login']);
  }


  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  ngOnInit(): void {
  }

}
