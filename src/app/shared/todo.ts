import { Image } from "./image";
export { Image } from "./image";
import { Label } from "./label";
export { Label } from "./label";
export class Todo {
  constructor(public id: number,
              public title: string,
              public description: string,
              public due: Date,
              public isPublic: boolean,
              public note_id: number,
              public labels?: Label[],) { }
}
