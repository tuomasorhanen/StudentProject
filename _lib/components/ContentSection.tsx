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
import Technology from "../entities/Technology";
//TODO: Add similar comments for imports consistently throughout the project

class ContentSection extends SingleUiComponentBase {
  public title!: string;
  public description?: string;
  public content!: string[];
  public image?: any;

  constructor(component: ContentSection) {
    super();
    this.entity = component.entity;
    this.title = component.title;
    this.description = component.description;
    this.content = component.content;
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
      case "technology":
        this._mapTechnology(this.entity as Technology);
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
  private _mapTechnology(technology: Technology) {
    this.title ??= technology.name;
    this.description ??= technology.description;
    this.image ??= technology.image.asset.url;
  }

  override async ResolveEntity() {
    this.entity = await new EntityService().Resolve(this.entity);
    this._mapEntity();
  }

  override Component() {
    return (
      <section className="relative">
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
          aria-hidden="true"
        >
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 ml-10 blur-2xl opacity-70 pointer-events-none -z-10"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
              <defs>
                <linearGradient
                  id="bs4-a"
                  x1="19.609%"
                  x2="50%"
                  y1="14.544%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#A855F7"></stop>
                  <stop
                    offset="100%"
                    stopColor="#6366F1"
                    stopOpacity="0"
                  ></stop>
                </linearGradient>
              </defs>
              <path
                fill="url(#bs4-a)"
                fillRule="evenodd"
                d="m0 0 461 369-284 58z"
                transform="matrix(1 0 0 -1 0 427)"
              ></path>
            </svg>
          </div>
        </div>

        <div className="">
          <div className="max-w-5xl mx-auto">
            <div className="pb-12 md:pb-20">
              {/* Section header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h2 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 pb-4">
                  {this.title}
                </h2>
                <p className="text-lg text-slate-400">{this.description}</p>
              </div>

              <div className="md:flex justify-between space-x-6 md:space-x-8 lg:space-x-14">
                <figure className="min-w-[240px]">
                  {/* Dynamic Image Component */}
                  {this.image && (
                    <Image
                      className="sticky top-8 mx-auto mb-12 md:mb-0 rounded-lg -rotate-[4deg]"
                      src={this.image}
                      width={320}
                      height={280}
                      alt="Image"
                    />
                  )}
                </figure>

                <div className="max-w-[548px] mx-auto">
                  <div className="text-slate-400 space-y-6">
                    {/* Render content array here */}
                    {this.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ContentSection;
