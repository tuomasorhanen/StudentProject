//Modules
import Image from "next/image";

//Components
import MultiUiComponentBase from "./MultiUiComponentBase";
import EntityBase from "../entities/EntityBase";

//Entities
import Product from "../entities/Product";
import Service from "../entities/Service";
import Subscription from "../entities/Subscription";

//Services
import EntityService from "../services/EntityService";

type PriceItem = {
  title: string;
  price?: string;
  image?: any;
  _key: string;
};

class Price extends MultiUiComponentBase {
  public items: PriceItem[] = [];

  constructor(component: Price) {
    super();
    this.entities = component.entities;
  }

  private _mapEntities() {
    this.entities.forEach((entity) => this._mapEntity(entity as EntityBase));
  }

  private _mapEntity(entity: EntityBase) {
    switch (entity._type.toLowerCase()) {
      case "service":
        this._mapService(entity as Service);
        break;
      case "product":
        this._mapProduct(entity as Product);
        break;
      case "subscription":
        this._mapSubscription(entity as Subscription);
        break;
      default:
        throw new Error(`Entity type ${entity._type} not supported`);
    }
  }
  private _mapService(service: Service) {
    this.items.push({
      title: service.name,
      price: service.price,
      image: service.image.asset.url,
      _key: service._id,
    });
  }
  private _mapProduct(product: Product) {
    this.items.push({
      title: product.name,
      price: product.price,
      image: product.image.asset.url,
      _key: product._id,
    });
  }
  private _mapSubscription(subscription: Subscription) {
    this.items.push({
      title: subscription.name,
      price: subscription.price,
      _key: subscription._id,
    });
  }

  override async ResolveEntity() {
    this.entities = await Promise.all(
      this.entities.map((entity) => new EntityService().Resolve(entity))
    );
    this._mapEntities();
  }

  //TODO: Add layout options that include listed fetures or services

  override Component() {
    return (
      <div data-component="price" className="grid grid-flow-col">
        {this.items.map((item) => (
          <div key={item._key} className="border p-2">
            {item.image && (
              <Image
                src={item.image}
                width={100}
                height={100}
                alt={item.title}
              />
            )}
            <h2>{item.title}</h2>
            <div>{item.price}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Price;
