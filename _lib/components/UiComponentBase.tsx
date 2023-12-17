class UiComponentBase {
  public _type!: string;
  public _key!: string;
  public Component() {
    return <>UiComponentBase</>;
  }
  public async ResolveEntity() {
    throw new Error("Not implemented");
  }
}

export default UiComponentBase;
