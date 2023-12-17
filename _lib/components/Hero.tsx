//Modules
import Image from "next/image";

//Components
import SingleUiComponentBase from "./SingleUiComponentBase";

//Entities
import Employee from "../entities/Employee";
import Company from "../entities/Company";
import Service from "../entities/Service";
import Product from "../entities/Product";
import Subscription from "../entities/Subscription";
import Project from "../entities/Project";
import Person from "@/_lib/entities/Person";

//Services
import EntityService from "../services/EntityService";
import Particles from "../ui/particles";

//Illustrations
import Illustration from "../../public/images/glow-bottom.2e92759f.svg";

//TODO: Add similar comments for imports consistently throughout the project

class Hero extends SingleUiComponentBase {
  public title!: string;
  public description?: string;
  public image?: any;

  constructor(component: Hero) {
    super();
    this.entity = component.entity;
    this.title = component.title;
    this.description = component.description;
    this.image = component.image;
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
    this.image ??= person.image.asset.url;
  }
  private _mapEmployee(employee: Employee) {
    this.title ??= `${employee.givenName} ${employee.familyName}`;
    this.description ??= employee.bio;
    this.image ??= employee.image.asset.url;
  }
  private _mapCompany(company: Company) {
    this.title ??= company.legalName;
    this.description ??= company.description;
    this.image ??= company.image.asset.url;
  }
  private _mapService(service: Service) {
    this.title ??= service.name;
    this.description ??= service.description;
    this.image ??= service.image.asset.url;
  }
  private _mapProduct(product: Product) {
    this.title ??= product.name;
    this.description ??= product.description;
    this.image ??= product.image.asset.url;
  }
  private _mapSubscription(subscription: Subscription) {
    this.title ??= subscription.name;
    this.description ??= subscription.description;
    this.image ??= subscription.image.asset.url;
  }
  private _mapProject(project: Project) {
    this.title ??= project.title;
    this.description ??= project.description;
    this.image ??= project.image.asset.url;
  }

  override async ResolveEntity() {
    this.entity = await new EntityService().Resolve(this.entity);
    this._mapEntity();
  }

  override Component() {
    return (
      <section>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <Particles className="absolute inset-0 -z-10" />
          <div
            className="absolute inset-0 -z-10 rounded-br-[3rem] pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute left-2/3 -translate-x-1/2 bottom-0 -z-10">
              <Image
                src={Illustration}
                className="max-w-none"
                width={2146}
                priority
                alt="Hero Illustration"
              />
            </div>
          </div>

          <div className="pt-32 pb-16 md:pt-52 md:pb-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                className="h1 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4"
                data-aos="fade-down"
              >
                {this.title}
              </h1>
              <p
                className="text-lg text-slate-300 mb-8"
                data-aos="fade-down"
                data-aos-delay="200"
              >
                {this.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Hero;
