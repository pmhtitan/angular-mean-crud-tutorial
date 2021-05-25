import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
 
  public bookForm: FormGroup;

  constructor(
    public _formBuilder: FormBuilder,
    private _router: Router,
    private _ngZone: NgZone,
    private _crudService: CrudService
  ){
    this.bookForm = this._formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    });
  }

  ngOnInit(){

  }

  onSubmit():any {
    this._crudService.AddBook(this.bookForm.value).subscribe(() => {
      console.log('Data added successfully!!');
      this._ngZone.run(() => this._router.navigateByUrl('/book-list'));
    }, (err) => {
      console.log(err);
    });
  }
}
