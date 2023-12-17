//Component
import EntityBase from "../entities/EntityBase";
import EntityReference from "../entities/EntityReference";
import UiComponentBase from "./UiComponentBase";

class SingleUiComponentBase extends UiComponentBase {
  public entity!: EntityBase | EntityReference;

  override Component() {
    return <>SingleUiComponentBase</>;
  }
}

export default SingleUiComponentBase;
