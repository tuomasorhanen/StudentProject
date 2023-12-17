//Components
import MultiUiComponentBase from "./MultiUiComponentBase";
import EntityBase from "../entities/EntityBase";

//Entities
import Project from "../entities/Project";
import Company from "../entities/Company";
import Employee from "../entities/Employee";
import Person from "../entities/Person";
import Product from "../entities/Product";
import Service from "../entities/Service";
import Subscription from "../entities/Subscription";
import Technology from "../entities/Technology";

//Services
import EntityService from "../services/EntityService";

//Containers
import CarouselContainer from "../ui/carouselContainer";

type CarouselItem = {
  title?: string;
  description?: string;
  image?: any;
  _key: string;
};

//TODO: Carousel has been mainly implemented to handle technology carousels. The UI for now only shows images.

class Carousel extends MultiUiComponentBase {
  public items: CarouselItem[] = [];

  constructor(component: Carousel) {
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
      case "project":
        this._mapProject(entity as Project);
        break;
      case "technology":
        this._mapTechnology(entity as Technology);
        break;
      default:
        throw new Error(`Entity type ${entity._type} not supported`);
    }
  }

  private _mapPerson(person: Person) {
    this.items.push({
      title: `${person.givenName} ${person.familyName}`,
      description: person.bio,
      image: person.image.asset.url,
      _key: person._id,
    });
  }
  private _mapEmployee(employee: Employee) {
    this.items.push({
      title: `${employee.givenName} ${employee.familyName}`,
      description: employee.bio,
      image: employee.image.asset.url,
      _key: employee._id,
    });
  }
  private _mapCompany(company: Company) {
    this.items.push({
      title: company.legalName,
      description: company.description,
      image: company.image.asset.url,
      _key: company._id,
    });
  }
  private _mapService(service: Service) {
    this.items.push({
      title: service.name,
      description: service.description,
      image: service.image.asset.url,
      _key: service._id,
    });
  }
  private _mapProduct(product: Product) {
    this.items.push({
      title: product.name,
      description: product.description,
      image: product.image.asset.url,
      _key: product._id,
    });
  }
  private _mapSubscription(subscription: Subscription) {
    this.items.push({
      title: subscription.name,
      description: subscription.description,
      image: subscription.image.asset.url,
      _key: subscription._id,
    });
  }
  private _mapProject(project: Project) {
    this.items.push({
      title: project.title,
      description: project.description,
      image: project.image.asset.url,
      _key: project._id,
    });
  }
  private _mapTechnology(technology: Technology) {
    this.items.push({
      image: technology.image.asset.url,
      _key: technology._id,
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
      <div className="py-12 max-w-6xl mx-auto overflow-hidden relative">
        <CarouselContainer items={this.items} />
      </div>
    );
  }
}

export default Carousel;
