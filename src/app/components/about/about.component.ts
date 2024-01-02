import { Component, OnInit } from '@angular/core';
import { IHistory } from 'src/app/models/ihistory';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  histories:IHistory[]=[];

  constructor(private service: ConverterService) { }

  ngOnInit(): void {
    this.histories=this.service.getHistories();
  }

}
