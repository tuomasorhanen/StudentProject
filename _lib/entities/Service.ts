import { client } from "../client/client";
import EntityBase from "./EntityBase";
import EntityReference from "./EntityReference";

class Service extends EntityBase {
    _type: string = 'Service';

    public name!: string;
    public description!: string;
    public image?: any;  // TODO: Use specific type
    public unit?: string;
    public price?: any; // TODO: Use specific type
    public duration?: any; // TODO: Use specific type
    public features?: string[];
    public tags?: string; // TODO: Specify tags type

    constructor(entity: EntityBase | EntityReference) {
        super(entity);
        let item = entity as Service;
        this.name = item.name;
        this.description = item.description;
        this.image = item.image;
        this.unit = item.unit;
        this.price = item.price;
        this.duration = item.duration;
        this.features = item.features;
        this.tags = item.tags;
    }

    async Populate(): Promise<Service> {
        const serviceData = await client.fetch<Service>(`*[_id == '${this._id}'][0]{..., image{..., asset->{url}}}`);
        if (serviceData) {
            this.name = serviceData.name;
            this.description = serviceData.description;
            this.image = serviceData.image;
            this.unit = serviceData.unit;
            this.price = serviceData.price;
            this.duration = serviceData.duration;
            this.features = serviceData.features;
            this.tags = serviceData.tags;
        }
        return this;
    }
}

export default Service;