import Employee from "./Employee";
import EntityBase from "./EntityBase";
import { client } from "../client/client";
import EntityReference from "./EntityReference";

class Company extends EntityBase {

    _type: string = 'Company';

    constructor(entity: EntityBase | EntityReference) {
        super(entity);
        let item = entity as Company;
        this.legalName = item.legalName;
        this.businessId = item.businessId;
        this.slogan = item.slogan;
        this.description = item.description;
        this.image = item.image;
        this.website = item.website;
        this.employees = item.employees;
        this.tags = item.tags;
    }

    public legalName!: string;
    public businessId!: string;
    public slogan?: string;
    public description!: string;
    public image!: any; // TODO: Use specific type
    public website?: string;
    public employees?: Employee[];
    public tags?: string; // TODO: Specify tags type

    override async Populate(): Promise<Company> {
        const companyData = await client.fetch<Company>(`*[_id == '${this._id}'][0] {..., image{..., asset->{url}}}`);
        this.businessId = companyData.businessId;
        this.legalName = companyData.legalName;
        this.slogan = companyData.slogan;
        this.description = companyData.description;
        this.image = companyData.image;
        this.website = companyData.website;
        this.tags = companyData.tags;

        if (companyData.employees && Array.isArray(companyData.employees)) {
            const employee = companyData.employees.map(async (employeeData) => {
                const employeeEntity = {
                    ...employeeData,
                    _type: 'Employee',
                    _id: employeeData._id,
                };
                const employee = new Employee(employeeEntity);
                await employee.Populate();
                return employee;
            });
            this.employees = await Promise.all(employee);
        }
        return this;
    }
}

export default Company;