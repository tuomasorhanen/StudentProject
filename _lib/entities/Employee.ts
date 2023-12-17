import { client } from "../client/client";
import EntityBase from "./EntityBase";
import EntityReference from "./EntityReference";
import Person from "./Person";

class Employee extends Person {
    _type: string = 'Employee';

    public jobTitle!: string;
    public department?: string;

    constructor(entity: EntityBase | EntityReference) {
        super(entity);
        let item = entity as Employee;
        this.jobTitle = item.jobTitle;
        this.department = item.department;
    }

    override async Populate(): Promise<Employee> {
        const employeeData = await client.fetch<Employee>(`*[_id == '${this._id}'][0]{..., image{..., asset->{url}}}`);
        if (employeeData) {
            this.jobTitle = employeeData.jobTitle;
            this.department = employeeData.department;
            this.image = employeeData.image;
            this.givenName = employeeData.givenName;
            this.familyName = employeeData.familyName;
            this.email = employeeData.email;
            this.phone = employeeData.phone;
            this.bio = employeeData.bio;
        }
        return this;
    }
}

export default Employee;