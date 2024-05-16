import {Todo} from "./todo";

export class TodoFactory {
  static empty(): Todo {
    return new Todo(0, '', '', new Date(),true,0,[],[]);
  }

  static fromObject(rawTodo: any): Todo {
    return new Todo(
      rawTodo.id,
      rawTodo.title,
      typeof(rawTodo.due) === 'string' ?
        new Date(rawTodo.due) : rawTodo.due,
      rawTodo.isPublic,
      rawTodo.labels,
      rawTodo.images,
      rawTodo.description
    );
  }
}
