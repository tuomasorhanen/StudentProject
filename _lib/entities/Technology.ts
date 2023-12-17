import { client } from "../client/client";
import EntityBase from "./EntityBase";
import EntityReference from "./EntityReference";

class Technology extends EntityBase {
    _type: string = 'Technology';

    public name!: string;
    public description!: string;
    public image!: any; // TODO: Use specific type
    public tags?: string[]; // TODO: Specify tags type

    constructor(entity: EntityBase | EntityReference) {
        super(entity);
        let item = entity as Technology;
        this.name = item.name;
        this.description = item.description;
        this.image = item.image;
        this.tags = item.tags;
    }

    override async Populate(): Promise<Technology> {
        const technologyData = await client.fetch<Technology>(`*[_id == '${this._id}'][0]{..., image{..., asset->{url}}}`);
        if (technologyData) {
            this.name = technologyData.name;
            this.description = technologyData.description;
            this.image = technologyData.image;
            this.tags = technologyData.tags;
        }
        return this;
    }
}

export default Technology;