//Components
import EntityBase from "../entities/EntityBase";
import MultiUiComponentBase from "./MultiUiComponentBase";

//Entities
import Qna from "../entities/Qna";
import Company from "../entities/Company";
import Employee from "../entities/Employee";
import Person from "../entities/Person";
import Product from "../entities/Product";
import Service from "../entities/Service";
import Subscription from "../entities/Subscription";

//services
import EntityService from "../services/EntityService";
import AccordionContainer from "../ui/accordionContainer";

type AccordionItem = {
  title: string;
  description?: string;
  _key: string;
};

class Accordion extends MultiUiComponentBase {
  public items: AccordionItem[] = [];

  constructor(component: Accordion) {
    super();
    this.entities = component.entities;
  }

  private _mapEntities() {
    this.entities.forEach((entity) => this._mapEntity(entity as EntityBase));
  }

  private _mapEntity(entity: EntityBase) {
    switch (entity._type.toLowerCase()) {
      case "person":
        this._mapPerson(entity as Person);
        break;
      case "employee":
        this._mapEmployee(entity as Employee);
        break;
      case "company":
        this._mapCompany(entity as Company);
        break;
      case "service":
        this._mapService(entity as Service);
        break;
      case "product":
        this._mapProduct(entity as Product);
        break;
      case "subscription":
        this._mapSubscription(entity as Subscription);
        break;
      case "qna":
        this._mapQna(entity as Qna);
        break;
      default:
        throw new Error(`Entity type ${entity._type} not supported`);
    }
  }
  private _mapPerson(person: Person) {
    this.items.push({
      title: `${person.givenName} ${person.familyName}`,
      description: person.bio,
      _key: person._id,
    });
  }
  private _mapEmployee(employee: Employee) {
    this.items.push({
      title: `${employee.givenName} ${employee.familyName}`,
      description: employee.bio,
      _key: employee._id,
    });
  }
  private _mapCompany(company: Company) {
    this.items.push({
      title: company.legalName,
      description: company.description,
      _key: company._id,
    });
  }
  private _mapService(service: Service) {
    this.items.push({
      title: service.name,
      description: service.description,
      _key: service._id,
    });
  }
  private _mapProduct(product: Product) {
    this.items.push({
      title: product.name,
      description: product.description,
      _key: product._id,
    });
  }
  private _mapSubscription(subscription: Subscription) {
    this.items.push({
      title: subscription.name,
      description: subscription.description,
      _key: subscription._id,
    });
  }
  private _mapQna(qna: Qna) {
    this.items.push({
      title: qna.question,
      description: qna.answer,
      _key: qna._id,
    });
  }

  override async ResolveEntity() {
    this.entities = await Promise.all(
      this.entities.map((entity) => new EntityService().Resolve(entity))
    );
    this._mapEntities();
  }

  override Component() {
    return (
      <div className="px-4">
      </div>
    );
  }
}

export default Accordion;
