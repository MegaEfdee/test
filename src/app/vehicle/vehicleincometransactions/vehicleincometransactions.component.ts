
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { vehicleUrl } from '../vehicle-url';
import swal from 'sweetalert2';
@Component({
  selector: 'app-vehicleincometransactions',
  templateUrl: './vehicleincometransactions.component.html',
  styleUrls: ['./vehicleincometransactions.component.scss']
})
export class VehicleincometransactionsComponent implements OnInit {

  displayedColumns: string[] = ['Make', 'VehicleIncomeCategory', 'Comment'];
  data = [];
  obj = { VehicleID: null, VehicleIncomeCategoryID: null, Comment: null };
  displayForm = false;
  operation = "Add";
  title = "Vehicle Income Transactions";
  parent = "Vehicle";
  vehicle = []; vehicleincomecategory = [];
  constructor(protected http: HttpService) {
    this.loadItem = this.loadItem.bind(this);
  }

  ngOnInit() {
    this.http.get(vehicleUrl.vehicleincometransactions.list)
      .subscribe(res => {
        this.data = res.data;
      }, err => { console.log(err) });
    this.http.get(vehicleUrl.vehicle.list)
      .subscribe(res => {
        this.vehicle = res.data;
      }, error => { console.log(error) });
    this.http.get(vehicleUrl.vehicleincomecategory.list)
      .subscribe(res => {
        this.vehicleincomecategory = res.data;
      }, error => { console.log(error) });

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
    let url = vehicleUrl.vehicleincometransactions.add;
    if (this.operation == "Update")
      url = vehicleUrl.vehicleincometransactions.update;
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
    this.obj = { VehicleID: null, VehicleIncomeCategoryID: null, Comment: null };
    this.hideForm();
    this.operation = "Add";
  }
}
