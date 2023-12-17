//Component
import EntityBase from "../entities/EntityBase";
import EntityReference from "../entities/EntityReference";
import UiComponentBase from "./UiComponentBase";

class MultiUiComponentBase extends UiComponentBase {
  public entities: (EntityBase | EntityReference)[] = [];

  override Component() {
    return <>MultiUiComponentBase</>;
  }
}

export default MultiUiComponentBase;
