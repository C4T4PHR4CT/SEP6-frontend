import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  single: any[] = [{
    name: 'John Beeena',
    value: 26
  }];


  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showDataLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Save some';
  showYAxisLabel = true;
  yAxisLabel = 'Sussies for me';
  colorScheme = 'vivid'


  constructor() { }

  ngOnInit(): void {
  }

}
