import { Component, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Handsontable from 'handsontable';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apiData: any;
  container: any;
  constructor(private http:AppService){}
  colHeaders = [
    "Name",
    "Username",
    "Email",
    "Phone",
    "Website",
    "Street",
    "Company",
  ];
private hotInstance: any;
  private data: any[][] =[];

  ngOnInit(): void {
    this.getData();
  }

  initializeHandsontable() {
  this.container =null;
   this.container = document.getElementById('your-handsontable-container');
    if(this.data.length>0){
    const hotSettings: Handsontable.GridSettings = {
      data: this.data,
      rowHeaders: true,
      contextMenu: true,
      filters: true,
  dropdownMenu: true,
      licenseKey: 'non-commercial-and-evaluation',
      colHeaders: ['ID', 'Name', 'Full Name', 'Email','Phone','Website','Street','Company Name'],
      afterChange: (changes:any, source) => {
        if (source === 'edit') {
          this.handleCellChange(changes);
        }
      }
    };

    this.hotInstance = new Handsontable(this.container, hotSettings);
    console.log(this.hotInstance.getData());
  }
  }

  handleCellChange(changes: any[]) {
    console.log('Cell changes:', changes);
    if(changes){
      console.log(this.apiData[changes[0][0]]);
      
      let tempArray=this.hotInstance.getData();
      console.log("temp",tempArray[changes[0][0]]);
      let columnData=changes[0][1];
      let columnName="";
      let primCol="id"
      let newValue=changes[0][3];
      switch(columnData){
        case 0:
          columnName="id";
          break;
        case 1:
          columnName="name";
          break;
        case 2:
          columnName="username";
          break;
        case 3:
          columnName="email";
          break;
        case 4:
          columnName="phone";
          break;
        case 5:
          columnName="website";
          break;
        case 6:
          columnName="address.street";
          break;
        case 7:
          columnName="company.name";
          break;
        default:
          break;
    }
    let putObj:any={}
    this.apiData.filter((obj)=>{
      if(obj[primCol]==tempArray[changes[0][0]][0]){
        obj[columnName]=newValue
        putObj= obj;
      }
    });
    console.log("put",putObj)
    this.http.putHttp(`https://jsonplaceholder.typicode.com/users/${putObj.id}`,putObj,success=>{
      console.log("updated");
    },err=>{})
  }
}
  getData(){
    this.data=[];
    this.http.gethttp('https://jsonplaceholder.typicode.com/users',(apiData) => {
      this.apiData=apiData;
      apiData.forEach(item=>{
        var obj:any=[
          item.id,
          item.name,
          item.username,
          item.email,
          item.phone,
          item.website,
          item.address.street,
          item.company.name,
        ]
        this.data.push(obj); 
    })
    this.initializeHandsontable()
  },(error)=>{});
  }
}