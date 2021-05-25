import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit {

  bookID: any;
  updateForm: FormGroup;
  
  constructor(
    public _formBuilder: FormBuilder,
    private _router: Router,
    private _ngZone: NgZone,
    private _activatedRoute: ActivatedRoute,
    private _crudService: CrudService
  ) {
    this.bookID = this._activatedRoute.snapshot.paramMap.get('id');

    this._crudService.GetBook(this.bookID).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description']
      });
    });

    this.updateForm = this._formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }

  ngOnInit() { }

  onUpdate(): any {
    this._crudService.updateBook(this.bookID, this.updateForm.value)
    .subscribe(() => {
        console.log('Data updated successfully!')
        this._ngZone.run(() => this._router.navigateByUrl('/book-list')); // redireccionador
      }, (err) => {
        console.log(err);
    });
  }

}