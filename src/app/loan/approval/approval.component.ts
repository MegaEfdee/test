import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { employeeUrl } from 'src/app/employee/employee-url';
import { approvalUrl } from 'src/app/approval/approval-url';
import { AuthService } from 'src/app/services/auth.service';
import { loanUrl } from '../loan-url';
@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  isEditable = true;
  isLinear = true;
  data = [];
  obj = {
    LoanApplicationID: null, ApprovalInstanceID: null, ApprovedBy: null, NextApprovalOfficerID: null,
    Comment: null, ProcessModuleID: null, ApprovalInstancesID: null
  };
  displayForm = false;
  operation = 'Add';
  title = 'Leave Approval';
  parent = 'Leave';
  leaveId: any;
  info = {
    LoanApplicationID: null, LoanID: null, EmployeeID: null, LoanDate: null, LoanTypeID: null, Amount: null, InterestRate: 0, Tenor: 1,
    RepaymentAmount: null, ApprovalStageID: null, ApprovingOfficerID: null, LoanStatusID: null, FullName: null, LoanType: null,
    StartPeriodID: null, StartPeriod: null, MonthlyRepayment: null, PayrollPeriod: null,
    GuarantorName: null,
    Address: null,
    PhoneNumber: null,
    JobTitle: null,
    Email: null,
  };
  Employee: any;
  ApprovalInstances: any;
  user_name = '';
  show = true;
  isRequired = true;

  constructor(
    protected http: HttpService,
    private route: ActivatedRoute,
    private router: Router, public auth: AuthService
  ) {
    this.leaveId = this.route.snapshot.params.id;
    // this.loadItem = this.loadItem.bind(this);
    this.obj.LoanApplicationID = this.leaveId;
  }


  ngOnInit() {
    this.user_name = this.auth.getUserInfo();
    this.http.get(loanUrl.loanapplication.get + '/' + this.leaveId)
      .subscribe(res => {
        console.log(res.data);
        this.info = res.data;
      }, err => { console.log(err); });

    this.http.get(loanUrl.loanapproval.history + '/' + this.leaveId)
      .subscribe(res => {
        this.data = res.data;
      }, err => { console.log(err); });

    this.http.get(employeeUrl.employee.supervisors)
      .subscribe(res => {
        console.log(res.data);
        this.Employee = res.data;
      }, err => { console.log(err); });

    this.http.get(approvalUrl.approvalinstances.getApprovalInstances)
      .subscribe(res => {
        console.log(res.data);
        this.ApprovalInstances = res.data;
      }, err => { console.log(err); });

  }

  showForm() {
    this.displayForm = true;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  hideForm() { this.displayForm = false; }

  addItem() {
    this.resetForm();
    this.showForm();
  }

  processForm() {
    let url = loanUrl.loanapproval.add;
    if (this.operation === 'Update') {
      url = loanUrl.loanapproval.update;
    }
    this.save(url);
  }

  loadEvent(data) {
    if (data.ApprovalTypeID == 1) {
      this.show = true;
      this.isRequired = true;
    } else {
      this.show = false;
      this.isRequired = false;
    }

  }

  save(url) {
    console.log(this.obj);
    this.http.post(url, this.obj)
      .subscribe(res => {
        this.data = res.data;
        swal.fire('Process Complete', res.message, 'success');
        // this.resetForm();
      }, err => {
        console.log(err);
        swal.fire('Process Unsuccessful', err.error.message, 'error');
      });

  }

  loadItem(id) {
    this.obj = this.data.find(item => item.id === id.row.data.id);
    this.operation = 'Update';
    this.showForm();
  }

  resetForm() {
    this.obj = {
      LoanApplicationID: null, ApprovalInstanceID: null, ApprovedBy: null, NextApprovalOfficerID: null, Comment: null,
      ProcessModuleID: null, ApprovalInstancesID: null
    };
    // this.hideForm();
    // this.operation = "Add";
  }
}
