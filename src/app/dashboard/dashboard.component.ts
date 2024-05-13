import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { DrawerServiceService } from '../services/drawer-service.service';
import 'chartjs-adapter-date-fns';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('drawer') drawer: any;
  gaugeType = "semi";
  gaugeValue = 28.3;
  gaugeLabel = "Speed";
  gaugeAppendText = "km/hr";
  constructor(private drawerService: DrawerServiceService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.drawerService.toggleDrawer$.subscribe(() => {
      if (this.drawer) {
        this.drawer.toggle();
      }
    });
    //this.RenderChart();
    this.createChart();
    this.updateChart();
  }

  initialLabels = [];
  initialData = [];
  initialTimestamp = Date.now();

  config = {
    type: 'line',
    data: {
      labels: this.initialLabels,
      datasets: [
        {
          label: 'Real-time Data',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: this.initialData,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'second',
            displayFormats: {
              second: 'h:mm:ss a',
            },
          },
          title: {
            display: true,
            text: 'Time',
          },
        },
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: 'Value',
          },
        },
      },
    },
  };

  private myChart: any;

  private createChart(): void {
    this.myChart = new Chart('pieChart', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Real-time Data',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'second',
              displayFormats: {
                second: 'h:mm:ss a',
              },
            },
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Value',
            },
            ticks: {
              stepSize: 20,
            },
          },
        },
      },
    });
  }

  RenderChart() {
    new Chart('pieChart', {
      type: 'line',
      data: {
        labels: ['Red', 'Blue'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private updateChart(): void {
    setInterval(() => {
      const newDataPoint = this.getRandomInt(0, 100);
      const newTimestamp = Date.now();

      if (this.myChart.data.labels.length > 10) {
        this.myChart.data.labels.shift();
        this.myChart.data.datasets[0].data.shift();
      }

      this.myChart.data.labels.push(newTimestamp);
      this.myChart.data.datasets[0].data.push(newDataPoint);

   

      this.myChart.update();
    }, 1000);
  }
}
