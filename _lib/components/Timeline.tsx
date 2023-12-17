//Modules
import Image from "next/image";

//Components
import SingleUiComponentBase from "./SingleUiComponentBase";

//Entities
import Project from "../entities/Project";

//Services
import EntityService from "../services/EntityService";

//TODO: Add similar comments for imports consistently throughout the project

class Timeline extends SingleUiComponentBase {
  public title!: string;
  public description?: string;
  public image?: any;
  public keyEvents!: any[] | [];

  constructor(component: Timeline) {
    super();
    this.entity = component.entity;
    this.title = component.title;
    this.description = component.description;
    this.image = component.image;
    this.keyEvents = component.keyEvents;
  }

  private _mapEntity() {
    switch (this.entity._type.toLowerCase()) {
      case "project":
        this._mapProject(this.entity as Project);
        break;
      default:
        throw new Error(`Unknown entity type: ${this.entity._type}`);
    }
  }
  private _mapProject(project: Project) {
    this.title ??= project.title;
    this.description ??= project.description;
    this.image ??= project.image.asset.url;
    this.keyEvents = project.keyEvents || [];
  }

  override async ResolveEntity() {
    this.entity = await new EntityService().Resolve(this.entity);
    this._mapEntity();
  }

  override Component() {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative">
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
          <div className="absolute h-full top-4 left-[2px] w-0.5 bg-slate-800 -z-10 overflow-hidden"></div>
          {this.keyEvents.map((event) => (
            <article className="pt-12 first-of-type:pt-0 group">
              <div className="md:flex">
                <div className="w-48 shrink-0">
                  <time className="text-sm inline-flex items-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-200 md:leading-8 before:w-1.5 before:h-1.5 before:rounded-full before:bg-purple-500 before:ring-4 before:ring-purple-500/30 mb-3">
                    <span className="ml-[1.625rem] md:ml-5">{event.date}</span>
                  </time>
                </div>
                <div className="grow ml-8 md:ml-0 pb-12 group-last-of-type:pb-0 border-b [border-image:linear-gradient(to_right,theme(colors.slate.700/.3),theme(colors.slate.700),theme(colors.slate.700/.3))1] group-last-of-type:border-none">
                  <header>
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 leading-8 pb-6">
                      {event.title}
                    </h2>
                  </header>
                  <figure className="bg-gradient-to-b from-slate-300/20 to-transparent rounded-3xl p-px mb-8">
                    <Image
                      className="w-full rounded-[inherit]"
                      src={event.image.asset.url}
                      width={574}
                      height={326}
                      alt={event.title}
                    />
                  </figure>
                  <p className="text-md text-slate-400">{event.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

export default Timeline;
