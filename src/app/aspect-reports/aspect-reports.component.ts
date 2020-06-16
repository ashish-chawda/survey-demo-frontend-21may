import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import chartsData from '../shared/charts-data';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-aspect-reports',
  templateUrl: './aspect-reports.component.html',
  styleUrls: ['./aspect-reports.component.css']
})
export class AspectReportsComponent implements OnInit {


  private chart: am4charts.XYChart;
  constructor(private zone: NgZone, private toastr: ToastrService, private router: Router) { }

  logout() {
    localStorage.removeItem('userToken');
    this.toastr.info('You have been logged out !', 'Log Out');
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {


      debugger;

      var chartJson = JSON.parse(JSON.stringify(chartsData));
      //chart 1
      var chart0 = am4core.create("chartdiv0", am4charts.XYChart);
      chart0.data = [];
      //chart2
      var chart1 = am4core.create("chartdiv1", am4charts.XYChart);
      chart1.data = [];
      //chart3
      var chart2 = am4core.create("chartdiv2", am4charts.XYChart);
      chart2.data = [];
      //chart4
      var chart3 = am4core.create("chartdiv3", am4charts.XYChart);
      chart3.data = [];
      //chart5
      var chart4 = am4core.create("chartdiv4", am4charts.XYChart);
      chart4.data = [];
      //chart6
      var chart5 = am4core.create("chartdiv5", am4charts.XYChart);
      chart5.data = [];
      //chart7
      var chart6 = am4core.create("chartdiv6", am4charts.XYChart);
      chart6.data = [];
      //chart8
      var chart7 = am4core.create("chartdiv7", am4charts.XYChart);
      chart7.data = [];

      //chart9
      var chart8 = am4core.create("chartdiv8", am4charts.XYChart);
      chart8.data = [];
      //chart10
      var chart9 = am4core.create("chartdiv9", am4charts.XYChart);
      chart9.data = [];

      //chart11
      var chart10 = am4core.create("chartdiv10", am4charts.XYChart);
      chart10.data = [];

       //chart12
       var chart11 = am4core.create("chartdiv11", am4charts.XYChart);
       chart11.data = [];
        //chart13
      var chart12 = am4core.create("chartdiv12", am4charts.XYChart);
      chart12.data = [];

       
      for (let index = 0; index <= 5; index++) {
        let count = chartJson.matrixdata.filter(x => x.data.methodologyapproach === index).length;
        chart0.data.push({ "benchmark": index, "users": count });

        let count1 = chartJson.matrixdata.filter(x => x.data.knowledgecontent === index).length;
        chart1.data.push({ "benchmark": index, "users": count1 });

        let count2 = chartJson.matrixdata.filter(x => x.data.riskassessment === index).length;
        chart2.data.push({ "benchmark": index, "users": count2 });

        let count3 = chartJson.matrixdata.filter(x => x.data.scheduling === index).length;
        chart3.data.push({ "benchmark": index, "users": count3 });

        let count4 = chartJson.matrixdata.filter(x => x.data.timetracking === index).length;
        chart4.data.push({ "benchmark": index, "users": count4 });

        let count5 = chartJson.matrixdata.filter(x => x.data.auditfilestructure === index).length;
        chart5.data.push({ "benchmark": index, "users": count5 });

        let count6 = chartJson.matrixdata.filter(x => x.data.auditreport === index).length;
        chart6.data.push({ "benchmark": index, "users": count6 });

        let count7 = chartJson.matrixdata.filter(x => x.data.issuetracking === index).length;
        chart7.data.push({ "benchmark": index, "users": count7 });

        let count8 = chartJson.matrixdata.filter(x => x.data.mireporting === index).length;
        chart8.data.push({ "benchmark": index, "users": count8 });

        let count9 = chartJson.matrixdata.filter(x => x.data.dataanalytics === index).length;
        chart9.data.push({ "benchmark": index, "users": count9 });

        let count10 = chartJson.matrixdata.filter(x => x.data.technologyimplementation === index).length;
        chart10.data.push({ "benchmark": index, "users": count10 });

        let count11 = chartJson.matrixdata.filter(x => x.data.useoftechnology === index).length;
        chart11.data.push({ "benchmark": index, "users": count11 });

        let count12 = chartJson.matrixdata.filter(x => x.data.stafftraining === index).length;
        chart12.data.push({ "benchmark": index, "users": count12 });
      }
      this.createChart(chart0, 2);
      this.createChart(chart1, 3);
      this.createChart(chart2, 3);
      this.createChart(chart3, 2);
      this.createChart(chart4, 3);
      this.createChart(chart5, 3);
      this.createChart(chart6, 4);
      this.createChart(chart7, 2);
      this.createChart(chart8, 3);
      this.createChart(chart9, 4);
      this.createChart(chart10, 3);     
      this.createChart(chart11, 2);
      this.createChart(chart12, 2);
    });
  }


  createChart(chart, medianValue) {

    // Create axes

    let label = chart.createChild(am4core.Label);
    label.text = medianValue;
    label.fontSize = 30;
    label.align = "center";
    label.isMeasured = false;
    label.x = am4core.percent(65);
    label.horizontalCenter = "middle";
    label.y = 10;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "benchmark";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.title.text = "Benchmark Scores";



    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
      if (target.dataItem && target.dataItem.index && 2 == 2) {
        return dy + 0;
      }
      return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "No. of surveys";


    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "users";
    series.dataFields.categoryX = "benchmark";
    series.name = "Users";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
