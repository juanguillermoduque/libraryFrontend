import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL,environment } from '../constants';
import { Book } from '../interfaces/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(API_URL + environment.books);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${API_URL + environment.books}/${id}`);
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(API_URL + environment.books, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${API_URL + environment.books}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL + environment.books}/${id}`);
  }
}