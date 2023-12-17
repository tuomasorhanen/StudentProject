//Components
import SingleUiComponentBase from "./SingleUiComponentBase";

//Entities
import Company from "../entities/Company";
import Employee from "../entities/Employee";
import Person from "../entities/Person";
import Product from "../entities/Product";
import Project from "../entities/Project";
import Service from "../entities/Service";
import Subscription from "../entities/Subscription";

//Services
import EntityService from "../services/EntityService";

class TitleAndDescription extends SingleUiComponentBase {
  public title!: string;
  public description?: string;

  constructor(component: TitleAndDescription) {
    super();
    this.entity = component.entity;
    this.title = component.title;
    this.description = component.description;
  }

  private _mapEntity() {
    switch (this.entity._type.toLowerCase()) {
      case "person":
        this._mapPerson(this.entity as Person);
        break;
      case "employee":
        this._mapEmployee(this.entity as Employee);
        break;
      case "company":
        this._mapCompany(this.entity as Company);
        break;
      case "service":
        this._mapService(this.entity as Service);
        break;
      case "product":
        this._mapProduct(this.entity as Product);
        break;
      case "subscription":
        this._mapSubscription(this.entity as Subscription);
        break;
      case "project":
        this._mapProject(this.entity as Project);
        break;
      default:
        throw new Error(`Unknown entity type: ${this.entity._type}`);
    }
  }

  private _mapPerson(person: Person) {
    this.title ??= `${person.givenName} ${person.familyName}`;
    this.description ??= person.bio;
  }
  private _mapEmployee(employee: Employee) {
    this.title ??= `${employee.givenName} ${employee.familyName}`;
    this.description ??= employee.bio;
  }
  private _mapCompany(company: Company) {
    this.title ??= company.legalName;
    this.description ??= company.description;
  }
  private _mapService(service: Service) {
    this.title ??= service.name;
    this.description ??= service.description;
  }
  private _mapProduct(product: Product) {
    this.title ??= product.name;
    this.description ??= product.description;
  }
  private _mapSubscription(subscription: Subscription) {
    this.title ??= subscription.name;
    this.description ??= subscription.description;
  }
  private _mapProject(project: Project) {
    this.title ??= project.title;
    this.description ??= project.description;
  }

  override async ResolveEntity() {
    this.entity = await new EntityService().Resolve(this.entity);
    this._mapEntity();
  }

  override Component() {
    return (
      <div data-component="title-and-description" className="relative">
        <div className="pb-12 md:pb-20 max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
              {this.title}
            </h2>
            <p className="text-lg text-slate-400">{this.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default TitleAndDescription;
