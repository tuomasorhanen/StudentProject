//Modules
import Image from "next/image";

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

//Services
import EntityService from "../services/EntityService";

//Illustrations
import Star from "@/public/images/star.svg";

type Card = {
  title: string;
  description?: string;
  image?: any;
  _key: string;
};

class Cards extends MultiUiComponentBase {
  public items: Card[] = [];

  constructor(component: Cards) {
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

  override async ResolveEntity() {
    this.entities = await Promise.all(
      this.entities.map((entity) => new EntityService().Resolve(entity))
    );
    this._mapEntities();
  }

  override Component() {
    return (
      <div
        data-component="card"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto pb-12 md:pb-20 px-4"
      >
        {this.items.map((item) => (
          <div
            key={item._key}
            className="rounded-3xl border border-slate-800 hover:border-slate-600/60"
          >
            <div className="col-span-1 p-5 h-full">
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative h-10 w-10">
                  <Image
                    src={item.image}
                    width="140"
                    height="140"
                    alt={item.title}
                    className="rounded-full aspect-square object-cover"
                  />
                  <Image
                    className="absolute top-0 -right-1"
                    src={Star}
                    width={16}
                    height={16}
                    alt="Star"
                    aria-hidden="true"
                  />
                </div>
                <div className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60">
                  {item.title}
                </div>
              </div>
              <div className="text-sm text-slate-400">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Cards;
