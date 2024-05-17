export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const NoteFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Bitte gebe einen Titel an!'),
  new ErrorMessage('listoverview_id', 'required', 'Bitte wähle eine Liste aus!'),
];
