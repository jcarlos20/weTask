import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styles: []
})
export class GraficasComponent implements OnInit {

  @Input() barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1,
          max: 5
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  @Input() barChartType: ChartType;
  @Input() barChartLabels: Label[];
  @Input() barChartData: ChartDataSets[];

  constructor() { }

  ngOnInit() {

  }

}
