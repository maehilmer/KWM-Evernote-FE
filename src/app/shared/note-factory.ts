import { Note } from './note';
export class NoteFactory {
  static empty(): Note {
    return new Note(0, '', 0, 0, [], [], [], '');
  }

  static fromObject(rawNote: any): Note {
    return new Note(
      rawNote.id,
      rawNote.title,
      rawNote.user_id,
      rawNote.listoverview_id,
      rawNote.images,
      rawNote.labels,
      rawNote.todos,
      rawNote.description
    );
  }
}
