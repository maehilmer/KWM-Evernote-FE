import {Note} from "./note";

export class Listoverview {
  constructor(
    public id: number,
    public title: string,
    public isPublic: boolean,
    public notes?: Note[],
  ) {}
}
