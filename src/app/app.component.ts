import { Component, OnInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import { CommonModule } from '@angular/common';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AgGridAngular, HttpClientModule, NgxSpinnerModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AppService]
})
export class AppComponent implements OnInit {

  title = 'e-commerce-dashboard';
  rowData: any = [];
  colDefs: any = [];
  isLoading = false;
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true
  };
  constructor(private appService: AppService) {}
  
  ngOnInit() {
    this.colDefs = [
      { field: "id", filter: 'agNumberColumnFilter', width: 100 },
      { field: "title", filter: 'agTextColumnFilter', width: 300 },
      { field: "price", filter: 'agTextColumnFilter', width: 200, valueFormatter: (params: any) => {
        return '$ ' + params.value; // Format price with dollar sign
      } },
      { field: "description", filter: 'agTextColumnFilter', width: 500 },
      { field: "category", filter: 'agTextColumnFilter', width: 200 },
      { field: "image", filter: false, sortable: false, width: 200, cellRenderer: (params: any) => {
        return `<img src="${params.value}" style="width: 30px; height: 30px;">`;
      } }
    ];
    this.isLoading = true; 
    this.appService.getProducts()
    .subscribe((data: any) => {
      this.rowData = data;
      this.isLoading = false;
    },
    (error) => {
      console.error('Error:', error);
      this.isLoading = false;  // Hide spinner in case of an error
    });
}

}
