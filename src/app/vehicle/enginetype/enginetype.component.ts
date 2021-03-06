
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { vehicleUrl } from '../vehicle-url';
import swal from 'sweetalert2';
@Component({
  selector: 'app-enginetype',
  templateUrl: './enginetype.component.html',
  styleUrls: ['./enginetype.component.scss']
})
export class EnginetypeComponent implements OnInit {

  displayedColumns: string[] = ['EngineType'];
  data = [];
  obj = { EngineType: null };
  displayForm = false;
  operation = "Add";
  title = "Engine Type";
  parent = "Vehicle";

  constructor(protected http: HttpService) {
    this.loadItem = this.loadItem.bind(this);
  }

  ngOnInit() {
    this.http.get(vehicleUrl.enginetype.list)
      .subscribe(res => {
        this.data = res.data;
      }, err => { console.log(err) });

  }

  showForm() {
    this.displayForm = true;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  hideForm() { this.displayForm = false; }

  addItem() {
    this.resetForm();
    this.showForm();
  }

  processForm() {
    let url = vehicleUrl.enginetype.add;
    if (this.operation == "Update")
      url = vehicleUrl.enginetype.update;
    this.save(url);
  }

  save(url) {
    this.http.post(url, this.obj)
      .subscribe(res => {
        this.data = res.data;
        swal.fire("Process Complete", res.message, 'success');
        this.resetForm();
      }, err => {
        console.log(err);
        swal.fire("Process Unsuccessful", err.error.message, 'error');
      });

  }

  loadItem(id) {
    this.obj = this.data.find(item => item.id == id.row.data.id);
    this.operation = "Update";
    this.showForm();
  }

  resetForm() {
    this.obj = { EngineType: null };
    this.hideForm();
    this.operation = "Add";
  }
}
