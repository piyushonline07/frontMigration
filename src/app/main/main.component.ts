import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min';
import * as FusionCharts from "fusioncharts";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  dataSource: any;
  type: string;
  width: string;
  height: string;
  constructor() {
    this.type = "timeseries";
    this.width = "100%";
    this.height = "400";

    // This is the dataSource of the chart
    this.dataSource = {
      chart: {
        theme: "umber"
      },
      caption: {
        text: "Sales Analysis - Grocery & Footwear"
      },
      subcaption: {
        text: "Standard range selector items (top left) have been custom styled"
      },
      series: "Type",
      yaxis: [
        {
          plot: "Sales Value",
          title: "Sale Value",
          format: {
            prefix: "$"
          }
        }
      ],
      extensions: {
        standardrangeselector: {
          style: {
            "button-text": {
              fill: "#B9B9C8"
            },
            "button-text:hover": {
              fill: "#5AC8FA"
            },
            "button-text:active": {
              fill: "#5AC8FA"
            }
          }
        }
      }
    };

    this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {
    var jsonify = res => res.json();
    var dataFetch = fetch(
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/styled-standard-range-selector_data.json"
    ).then(jsonify);
    var schemaFetch = fetch(
      "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/styled-standard-range-selector_schema.json"
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const [data, schema] = res;
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  }

  // type = "Column2D";
  // width = "700";
  // height = "400";
  // dataFormat = "json";
  // dataSource: any = {
  //   "chart": {
  //     "caption": "Countries With Most Oil Reserves [2017-18]",
  //     "subCaption": "In MMbbl = One Million barrels",
  //     "xAxisName": "Country",
  //     "yAxisName": "Reserves (MMbbl)",
  //     "numberSuffix": "K",
  //     "theme": "fusion"
  //   },
  //   "data": [{
  //     "label": "Venezuela",
  //     "value": "290"
  //   }, {
  //     "label": "Saudi",
  //     "value": "260"
  //   }, {
  //     "label": "Canada",
  //     "value": "180"
  //   }, {
  //     "label": "Iran",
  //     "value": "140"
  //   }, {
  //     "label": "Russia",
  //     "value": "115"
  //   }, {
  //     "label": "UAE",
  //     "value": "100"
  //   }, {
  //     "label": "US",
  //     "value": "30"
  //   }, {
  //     "label": "China",
  //     "value": "30"
  //   }]
  // };

   
  




chart1(){
  let chart = new CanvasJS.Chart("chartContainer1", {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Basic Column Chart in Angular"
    },
    data: [{
      type: "column",
      dataPoints: [
        { y: 71, label: "Apple" },
        { y: 55, label: "Mango" },
        { y: 50, label: "Orange" },
        { y: 65, label: "Banana" },
        { y: 95, label: "Pineapple" },
        { y: 68, label: "Pears" },
        { y: 28, label: "Grapes" },
        { y: 34, label: "Lychee" },
        { y: 14, label: "Jackfruit" }
      ]
    }]
  });
  chart.render();
}

chart2(){
  let chart = new CanvasJS.Chart("chartContainer2", {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Monthly Expense"
    },
    data: [{
      type: "pie",
      showInLegend: true,
      toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
      indexLabel: "{name} - #percent%",
      dataPoints: [
        { y: 450, name: "Food" },
        { y: 120, name: "Insurance" },
        { y: 300, name: "Traveling" },
        { y: 800, name: "Housing" },
        { y: 150, name: "Education" },
        { y: 150, name: "Shopping" },
        { y: 250, name: "Others" }
      ]
    }]
  });

  chart.render();
}


chart3(){
  let dataPoints = [];
  let y = 0;
  for (var i = 0; i < 10000; i++) {
    y += Math.round(5 + Math.random() * (-5 - 5));
    dataPoints.push({ y: y });
  }
  let chart = new CanvasJS.Chart("chartContainer3", {
    zoomEnabled: true,
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Performance Demo - 10000 DataPoints"
    },
    subtitles: [{
      text: "Try Zooming and Panning"
    }],
    data: [
      {
        type: "line",
        dataPoints: dataPoints
      }]
  });

  chart.render();
}

chart4(){

}
ngOnInit() {
  this.chart1();
  this.chart2();
}

}
