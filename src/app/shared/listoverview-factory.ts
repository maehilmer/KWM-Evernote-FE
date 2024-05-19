import {Listoverview} from "./listoverview";

export class ListoverviewFactory {
  static empty(): Listoverview {
    return new Listoverview(0, '',true, []);
  }

  static fromObject(rawListoverview: any): Listoverview {
    return new Listoverview(
      rawListoverview.id,
      rawListoverview.title,
      rawListoverview.isPublic,
      rawListoverview.notes
    );
  }
}
