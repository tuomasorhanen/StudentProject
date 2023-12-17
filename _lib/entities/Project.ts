import { client } from "../client/client";
import Company from "./Company";
import EntityBase from "./EntityBase";
import EntityReference from "./EntityReference";
import Service from "./Service";
import Technology from "./Technology";


class Project extends EntityBase {

    _type: string = 'project';

    constructor(entity: EntityBase | EntityReference) {
        super(entity);
        let item = entity as Project;
        this.title = item.title;
        this.description = item.description;
        this.image = item.image;
        this.startDate = item.startDate;
        this.endDate = item.endDate;
        this.tags = item.tags;
        this.company = item.company;
        this.service = item.service;
        this.keyEvents = item.keyEvents;
    }

    public title!: string;
    public description!: string;
    public image!: any; // TODO: Use specific type
    public startDate!: Date;
    public endDate!: Date;
    public tags?: string[]; // TODO: Specify tags type
    public company?: Company;
    public service?: Service;
    public technologies?: Technology[];
    public keyEvents?: any[]; //TODO: specify type

    override async Populate(): Promise<Project> {
        const projectData = await client.fetch<Project>(`*[_id == '${this._id}'][0] {..., image{..., asset->{url}}, keyEvents[] {..., image{..., asset->{url}}}}`);
        this.title = projectData.title;
        this.description = projectData.description;
        this.image = projectData.image;
        this.startDate = projectData.startDate;
        this.endDate = projectData.endDate;
        this.tags = projectData.tags;
        this.keyEvents = projectData.keyEvents;

        if (projectData.company) {
            const companyEntity = new Company(projectData.company);
            await companyEntity.Populate();
            this.company = companyEntity;
        }

        if (projectData.service) {
            const serviceEntity = new Service(projectData.service);
            await serviceEntity.Populate();
            this.service = serviceEntity;
        }

        return this;
    }
}

export default Project;
