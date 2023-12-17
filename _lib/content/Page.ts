//Components
import MultiUiComponentBase from "../components/MultiUiComponentBase";
import SingleUiComponentBase from "../components/SingleUiComponentBase";

export type metadata = {
  title: string;
  description: string;
  _type: "metadata";
};

class Page {
  name!: string;
  slug!: { _type: "slug"; current: string };
  _id!: string;
  useParent!: boolean;
  parentPage?: Page;
  showInMenu!: boolean;
  menuOrder?: number;
  pageMetadata!: metadata;
  content!: (MultiUiComponentBase | SingleUiComponentBase)[];
}

export default Page;