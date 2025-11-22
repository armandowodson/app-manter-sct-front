import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

/**
 * Class constructor method
 * Initializes a new instance of the class
 */
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  acessarProdutos(){
    this.router.navigate(['/products']);
  }

  protected readonly environment = environment;
}
