import { Component, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any;
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  grid: ApexGrid | any;
  colors: string[] | any;
  legend: ApexLegend | any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  total: number = 0;
  completed: number = 0;
  working: number = 0;
  pending: number = 0;


  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  constructor(private service: TaskService) {
    this.loadChart(null)
  }

  ngOnInit() {
    this.fetchBoxData()
  }

  fetchBoxData() {
    this.service.taskCart.subscribe((res: any) => {
      res.map((elem: any) => {
        this.total++
        switch (elem.status) {
          case 'Pending':
            this.pending++
            break;
          case 'Completed':
            this.completed++
            break
          case 'Working':
            this.working++
        }
      })

      this.loadChart([this.total, this.pending, this.working, this.completed])
    })
  }

  loadChart(data: any) {
    this.chartOptions = {
      series: [
        {
          name: "distibuted",
          data: data ? data : [21, 22, 10, 28]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: [
        "#36b9cc",
        "#f6c23e",
        "#4e73df",
        "#1cc88a"
      ],
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      xaxis: {
        categories: [
          "Total",
          "Pending",
          "Working",
          "Completed",
        ],
        labels: {
          style: {
            colors: [
              "black",
              "black",
              "black",
              "black"
            ],
            fontSize: "12px"
          }
        }
      }
    };
  }


}
