import {Todo} from "./todo";

export class TodoFactory {
  static empty(): Todo {
    return new Todo(0, '', '', new Date(),true,0,[],[]);
  }

  static fromObject(rawTodo: any): Todo {
    return new Todo(
      rawTodo.id,
      rawTodo.title,
      rawTodo.description,
      typeof(rawTodo.due) === 'string' ?
        new Date(rawTodo.due) : rawTodo.due,
      rawTodo.isPublic,
      rawTodo.note_id,
      rawTodo.labels,
      rawTodo.images
    );
  }
}
