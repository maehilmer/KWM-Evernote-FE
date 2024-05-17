export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const ListoverviewFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Bitte gebe einen Titel an!')
];
