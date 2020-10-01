import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {

  constructor(public _auth: AuthService) { }
  public user_name="";
  ngOnInit() {
    this.user_name = this._auth.getUserInfo();
    console.log(this.user_name)
  }

}
