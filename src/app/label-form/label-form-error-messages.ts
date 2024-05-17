export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}

export const LabelFormErrorMessages = [
  new ErrorMessage('name', 'required', 'Bitte gebe einen Namen an!'),
  //new ErrorMessage('name', 'nameExists', 'Dieses Label existiert bereits.'),

];
