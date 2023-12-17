import { client } from "../client/client";
import EntityBase from "./EntityBase";
import EntityReference from "./EntityReference";
import Service from "./Service";


class Subscription extends EntityBase {

    _type: string = 'Subscription';

    constructor(entity: EntityBase | EntityReference) {
        super(entity);
        let item = entity as Subscription;
        this.name = item.name;
        this.description = item.description;
        this.image = item.image;
        this.price = item.price;
        this.services = item.services;
        this.tags = item.tags;
    }

    public name!: string;
    public description!: string;
    public image!: any; // TODO: Use specific type
    public price!: any;
    public services!: Service[]
    public tags?: string; // TODO: Specify tags type

    override async Populate(): Promise<Subscription> {
        const SubscriptionData = await client.fetch<Subscription>(`*[_id == '${this._id}'][0] {..., image{..., asset->{url}}}`);
        this.name = SubscriptionData.name;
        this.description = SubscriptionData.description;
        this.price = SubscriptionData.price;
        this.image = SubscriptionData.image;
        this.tags = SubscriptionData.tags;

        if (SubscriptionData.services && Array.isArray(SubscriptionData.services)) {
            const service = SubscriptionData.services.map(async (serviceData) => {
                const serviceEntity = {
                    ...serviceData,
                    _type: 'Service',
                    _id: serviceData._id,
                };
                const service = new Service(serviceEntity);
                await service.Populate();
                return service;
            });
            this.services = await Promise.all(service);
        }
        return this;
    }
}

export default Subscription;