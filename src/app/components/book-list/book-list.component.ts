import { Component, OnInit } from '@angular/core';

import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public Books: any = [];

  constructor( private _crudService: CrudService) { }

  ngOnInit(): void {
    this._crudService.GetBooks().subscribe(res => {
      console.log(res);
      this.Books = res;
    });
  }

  delete(id: any, i:any){
    console.log(id);
    if(window.confirm('Do you want to go ahead?')){
      this._crudService.deleteBook(id).subscribe((res) => {
        this.Books.splice(i,1); // creo que esto es para 'borrar' el libro de la colleción que está visualizando en ese momento el cliente. (sin recargar)
      });
    }
  }

}
