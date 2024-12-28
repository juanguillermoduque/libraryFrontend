import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book.interface';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  //se crea un arreglo de libros
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  //se llama a la funcion para obtener los libros
  ngOnInit(): void {
    this.loadBooks();
  }

  //funcion para obtener los libros y guardarlos en el arreglo
  loadBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  //funcion para eliminar un libro por id
  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }
}