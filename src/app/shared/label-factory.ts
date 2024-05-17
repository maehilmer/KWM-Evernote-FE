import {Label} from "./label";

export class LabelFactory {
  static empty(): Label {
    return new Label(0,'',0);
  }

  static fromObject(rawLabel: any): Label {
    return new Label (
      rawLabel.id,
      rawLabel.name,
      rawLabel.user_id
    );
  }
}
