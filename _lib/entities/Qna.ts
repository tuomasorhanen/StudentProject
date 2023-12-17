import { client } from "../client/client";
import EntityBase from "./EntityBase";
import EntityReference from "./EntityReference";

class Qna extends EntityBase {
    _type: string = 'qna';

    public question!: string;
    public answer!: string;

    constructor(entity: EntityBase | EntityReference) {
        super(entity);
        let item = entity as Qna;
        this.question = item.question;
        this.answer = item.answer;
    }

    override async Populate(): Promise<Qna> {
        const qnaData = await client.fetch<Qna>(`*[_id == '${this._id}'][0]`);
        if (qnaData) {
            this.question = qnaData.question;
            this.answer = qnaData.answer;
        }
        return this;
    }
}

export default Qna;
