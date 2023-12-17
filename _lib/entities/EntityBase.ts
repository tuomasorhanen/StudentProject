import { client } from "../client/client";
import EntityReference from "./EntityReference";

class EntityBase extends EntityReference {
    public _type!: string;
    public _id!: string; // TODO: change to `id`. Reasoning: Entity is an object which has identity. More specifically public property named `id`.

    constructor(entity: EntityReference | EntityBase) {
        super();
        this._type = entity._type;
        this._id = (entity as EntityBase)._id || entity._ref;
    }

    public async resolveReference() {
        if (this._type !== 'reference') {
            return;
        }
        const resolvedEntity = await client.fetch<EntityBase>(`*[_id == '${this._id}'][0]{_type, _id}`);
        this._type = resolvedEntity._type;
        this._id = resolvedEntity._id;
    }

    async Populate(): Promise<EntityBase> {
        return this;
    }
}

export default EntityBase;

