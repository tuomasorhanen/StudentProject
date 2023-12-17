//Modules
import React from "react";

//Components
import SingleUiComponentBase from "./SingleUiComponentBase";

//UI Components
import Particles from "../ui/particles";

class Divider extends SingleUiComponentBase {
  public style!: string;
  public _key!: string;
  public _type!: string;

  constructor(component: Divider) {
    super();
    this.style = component.style;
  }

  override Component() {
    return (
      <div className="pb-12 md:pb-20">
        <Particles className="absolute inset-0 -z-10" />
      </div>
    );
  }
}

export default Divider;
