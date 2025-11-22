import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { CurrencyPipe } from "@angular/common";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html"
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit(): void {
      environment.loginGlobal = '0';
      this.router.navigate(['/logar']);
  }

}
