export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
  export const TodoFormErrorMessages = [
    new ErrorMessage('title', 'required', 'Bitte gebe einen Titel an!'),
    new ErrorMessage('due', 'required', 'Bitte gebe ein Fälligkeitsdatum ein!'),
    new ErrorMessage('note_id', 'required', 'Bitte wähle eine Liste für das To Do aus!')
  ];
