import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book.interface';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  //se crea un objeto de tipo Book
  book: Book = { 
    title: '', 
    author: '', 
    date_post: undefined, 
    genre: '',
  };

  //se crea una variable de tipo booleana para saber si se esta editando o no
  isEditMode = false;


  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    //se obtiene el id del libro a editar
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bookService.getBook(+id).subscribe((data) => {
        this.book = data;
      });
    }
  }

  //funcion para guardar el libro
  saveBook() {
    if (this.isEditMode) {
      this.bookService.updateBook(this.book.id!, this.book).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.bookService.createBook(this.book).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}