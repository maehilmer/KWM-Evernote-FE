import { Image } from "./image";
export { Image } from "./image";
import { Label } from "./label";
export { Label } from "./label";
import { Todo } from "./todo";
export { Todo } from "./todo";

// ? = optional

export class Note {
  constructor(
    public id: number,
    public title: string,
    public user_id: number,
    public listoverview_id: number,
    public images?: Image[],
    public labels?: Label[],
    public todos?: Todo[],
    public description?: string
  ) {}
}
