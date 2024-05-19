import {Injectable} from '@angular/core';
import {Note} from "./note";
import {Todo} from "./todo";
import {Listoverview} from "./listoverview";
import {Label} from "./label";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

// Services in Angular sind dazu da, Daten oder Dienste über Komponenten hinweg zur Verfügung zu stellen
// mit dem Service verbinden man sich mit Server und holt von dort die Notizen etc. --> Observable Pattern
export class KwmevernoteStoreService {
  private api = 'http://kwmevernote.s2110456011.student.kwmhgb.at/api';
  constructor(private http: HttpClient) { }

  // Falls Server nicht erreichbar ist
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  // NOTIZEN -----------------------------------------------------------------------------------------------------------

  // Liefert Liste mit allen Notizen; get gibt Observable zurück, das Array mit allen Notizen enthält
  // Observables können dauerhaft Daten liefern, sie sind ein Daten-Strom (vereinfach ausgedrückt)
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

  // SAVE
  createNote(note: Note): Observable<any> {
    return this.http.post(`${this.api}/notes`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // UPDATE
  updateNote(note: Note): Observable<any> {
    return this.http.put(`${this.api}/notes/${note.id}`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  // suchen
  getAllNotesSearch(searchTerm: string): Observable<Array<Note>> {
    return this.http.get<Note>(`${this.api}/notes/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  // TODOS -------------------------------------------------------------------------------------------------------------

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

  // SAVE
  createTodo(todo: Todo): Observable<any> {
    return this.http.post(`${this.api}/todos`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // UPDATE
  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(`${this.api}/todos/${todo.id}`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  // LISTOVERVIEW ------------------------------------------------------------------------------------------------------

  // Liefert Liste mit allen Listen; get gibt Observable zurück, das Array mit allen Listen enthält
  getAllListoverviews(): Observable<Array<Listoverview>> {
    return this.http.get<Array<Listoverview>>(`${this.api}/listoverviews`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Liste aufgrund ID erhalten; aufrufen aller Detaildaten einer Liste
  getSingleListoverview(id: number): Observable<Listoverview> {
    return this.http.get<Listoverview>(`${this.api}/listoverviews/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // LÖSCHEN
  removeListoverview(id: number): Observable<any> {
    return this.http.delete(`${this.api}/listoverviews/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  // SAVE
  createListoverview(listoverview: Listoverview): Observable<any> {
    return this.http.post(`${this.api}/listoverviews`, listoverview)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // UPDATE
  updateListoverview(listoverview: Listoverview): Observable<any> {
    return this.http.put(`${this.api}/listoverviews/${listoverview.id}`, listoverview)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }



  // LABELS ------------------------------------------------------------------------------------------------------------

  // Liefert Liste mit allen Labels; get gibt Observable zurück, das Array mit allen Labels enthält
  getAllLabels(): Observable<Array<Label>> {
    return this.http.get<Array<Label>>(`${this.api}/labels`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Label aufgrund ID erhalten; aufrufen aller Detaildaten eines Labels
  getSingleLabel(id: number): Observable<Label> {
    return this.http.get<Label>(`${this.api}/labels/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // LÖSCHEN
  removeLabel(id: number): Observable<any> {
    return this.http.delete(`${this.api}/labels/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  // SAVE
  createLabel(label: Label): Observable<any> {
    return this.http.post(`${this.api}/labels`, label)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // UPDATE
  updateLabel(label: Label): Observable<any> {
    return this.http.put(`${this.api}/labels/${label.id}`, label)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
}
