import { client } from "../client/client";
import EntityBase from "./EntityBase";
import EntityReference from "./EntityReference";

class Person extends EntityBase {
    _type: string = 'Person';

    public givenName!: string;
    public familyName!: string;
    public bio!: string;
    public email?: string;
    public phone?: string;
    public image!: any; // TODO: Use specific type
    public tags?: string[]; // TODO: Specify tags type

    constructor(entity: EntityBase | EntityReference) {
        super(entity);
        let item = entity as Person;
        this.givenName = item.givenName;
        this.familyName = item.familyName;
        this.bio = item.bio;
        this.email = item.email;
        this.phone = item.phone;
        this.image = item.image;
        this.tags = item.tags;
    }

    override async Populate(): Promise<Person> {
        const personData = await client.fetch<Person>(`*[_id == '${this._id}'][0]{..., image{..., asset->{url}}}`);
        if (personData) {
            this.givenName = personData.givenName;
            this.familyName = personData.familyName;
            this.bio = personData.bio;
            this.email = personData.email;
            this.phone = personData.phone;
            this.image = personData.image;
            this.tags = personData.tags;
        }
        return this;
    }
}

export default Person;