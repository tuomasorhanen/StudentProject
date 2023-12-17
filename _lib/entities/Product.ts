import { client } from "../client/client";
import EntityBase from "./EntityBase";
import EntityReference from "./EntityReference";

class Product extends EntityBase {
    _type: string = 'Product';

    public name!: string;
    public description!: string;
    public image?: any;  // TODO: Use specific type
    public price?: any; // TODO: Use specific type
    public features?: string[];
    public tags?: string; // TODO: Specify tags type

    constructor(entity: EntityBase | EntityReference) {
        super(entity);
        let item = entity as Product;
        this.name = item.name;
        this.description = item.description;
        this.image = item.image;
        this.price = item.price;
        this.features = item.features;
        this.tags = item.tags;
    }

    async Populate(): Promise<Product> {
        const productData = await client.fetch<Product>(`*[_id == '${this._id}'][0]{..., image{..., asset->{url}}}`);
        if (productData) {
            this.name = productData.name;
            this.description = productData.description;
            this.image = productData.image;
            this.price = productData.price;
            this.features = productData.features;
            this.tags = productData.tags;
        }
        return this;
    }
}

export default Product;