
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { payrollUrl } from '../payroll-url';
import swal from 'sweetalert2';
@Component({
  selector: 'app-payrollreport',
  templateUrl: './payrollreport.component.html',
  styleUrls: ['./payrollreport.component.scss']
})
export class PayrollreportComponent implements OnInit {

  displayedColumns: string[] = ['GrossPay', 'OtherAllowance', 'TotalIncome', 'PAYE', 'Pension', 'Rent', 'StaffLoan', 'Lateness', 'OtherDeduction', 'TotalDeduction', 'NetPay', 'ModiifiedBy'];
  data = [];
  obj = { GrossPay: null, OtherAllowance: null, TotalIncome: null, PAYE: null, Pension: null, Rent: null, StaffLoan: null, Lateness: null, OtherDeduction: null, TotalDeduction: null, NetPay: null, ModiifiedBy: null };
  displayForm = false;
  operation = "Add";
  title = "Payrollreport";
  parent = "payroll";

  constructor(protected http: HttpService) {
    this.loadItem = this.loadItem.bind(this);
  }

  ngOnInit() {
    this.http.get(payrollUrl.payrollreport.list)
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
    let url = payrollUrl.payrollreport.add;
    if (this.operation == "Update")
      url = payrollUrl.payrollreport.update;
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
    this.obj = this.data.find(item => item.id === id.row.data.id);
    this.operation = "Update";
    this.showForm();
  }

  resetForm() {
    this.obj = { GrossPay: null, OtherAllowance: null, TotalIncome: null, PAYE: null, Pension: null, Rent: null, StaffLoan: null, Lateness: null, OtherDeduction: null, TotalDeduction: null, NetPay: null, ModiifiedBy: null };
    this.hideForm();
    this.operation = "Add";
  }
}
