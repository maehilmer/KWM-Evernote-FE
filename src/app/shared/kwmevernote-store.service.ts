import {Injectable} from '@angular/core';
import {Label, Todo, Note, Image} from "../shared/note";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KwmevernoteStoreService {
  private api = 'http://kwmevernote.s2110456011.student.kwmhgb.at/api';
  constructor(private http: HttpClient) { }

  // Falls Server nicht erreichbar ist
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  // NOTIZEN -------------------------------------------------------------------------------------------

  // Liefert Liste mit allen Notizen; get gibt Observable zurück, das Array mit allen Notizen enthält
  getAllNotes(): Observable<Array<Note>> {
    return this.http.get<Array<Note>>(`${this.api}/notes`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Notiz aufgrund ID erhalten; aufrufen aller Detaildaten einer Notiz
  getSingleNote(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // LÖSCHEN
  removeNote(id: number): Observable<any> {
    return this.http.delete(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }



  // TODOS -------------------------------------------------------------------------------------------

  // Liefert Liste mit allen Todos; get gibt Observable zurück, das Array mit allen Todos enthält
  getAllTodos(): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>(`${this.api}/todos`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // To Do aufgrund ID erhalten; aufrufen aller Detaildaten eines To Dos
  getSingleTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // LÖSCHEN
  removeTodo(id: number): Observable<any> {
    return this.http.delete(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

}
