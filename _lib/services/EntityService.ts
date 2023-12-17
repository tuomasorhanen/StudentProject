import Project from "../entities/Project";
import Company from "../entities/Company";
import Employee from "../entities/Employee";
import EntityBase from "../entities/EntityBase";
import EntityReference from "../entities/EntityReference";
import Person from "../entities/Person";
import Product from "../entities/Product";
import Service from "../entities/Service";
import Subscription from "../entities/Subscription";
import Qna from "../entities/Qna";
import Technology from "../entities/Technology";

class EntityService {
    async Resolve(entity: EntityBase | EntityReference): Promise<EntityBase> {
        if (entity._type === 'reference') {
            entity = new EntityBase(entity);
            await (entity as EntityBase).resolveReference();
        }

        switch (entity._type) {
            case 'Company':
                let company = new Company(entity);
                return await company.Populate();
            case 'Employee':
                let employee = new Employee(entity);
                return await employee.Populate();
            case 'Person':
                let person = new Person(entity);
                return await person.Populate();
            case 'Service':
                let service = new Service(entity);
                return await service.Populate();
            case 'Product':
                let product = new Product(entity);
                return await product.Populate();
            case 'Subscription':
                let subscription = new Subscription(entity);
                return await subscription.Populate();
            case 'Qna':
                let qna = new Qna(entity);
                return await qna.Populate();
            case 'Project':
                let project = new Project(entity);
                return await project.Populate();
            case 'Technology':
                let technology = new Technology(entity);
                return await technology.Populate();
            default:
                throw new Error("Unsupported entity type!");
        }
    }
}

export default EntityService;