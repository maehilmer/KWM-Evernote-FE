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

  // Liefert Liste mit allen Notizen; get gibt Observable zurück, das Array mit allen Notizen enthält
  getAll(): Observable<Array<Note>> {
    return this.http.get<Array<Note>>(`${this.api}/notes`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Notiz aufgrund ID erhalten; aufrufen aller Detaildaten einer Notiz
  getSingle(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  // Falls Server nicht erreichbar ist
  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  // LÖSCHEN ------------------------------------------------------------------------------------
  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

}
