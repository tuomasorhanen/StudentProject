import { client } from "@/_lib/client/client";
import { notFound } from "next/navigation";
import Page from "../content/Page";
import Hero from "../components/Hero";
import TitleAndDescription from "../components/TitleAndDescription";
import Carousel from "../components/Carousel";
import Cards from "../components/Cards";
import Accordion from "../components/Accordion";
import Price from "../components/Price";
import ContentSection from "../components/ContentSection";
import Divider from "../components/Divider";
import Timeline from "../components/Timeline";

class PageService {

  public async Fetch(slug: string): Promise<Page> {
    const pageData = await client.fetch<Page>(`*[_type == 'page' && slug.current == '${slug}'][0]`, {
      next: { revalidate: 10 } //TODO: per environment revalidation settings
    });

    let page = new Page();
    page.content = [];

    if (!pageData?.content) {
      notFound();
    }

    for (const block of pageData.content) {
      switch (block._type) {
        case 'heroSection':
          let hero = new Hero(block as Hero)
          await hero.ResolveEntity();
          page.content.push(hero);
          break;
        case 'titleAndDescription':
          let tad = new TitleAndDescription(block as TitleAndDescription)
          await tad.ResolveEntity();
          page.content.push(tad);
          break;
        case 'carousel':
          let carousel = new Carousel(block as Carousel)
          await carousel.ResolveEntity();
          page.content.push(carousel);
          break;
        case 'card':
          let card = new Cards(block as Cards)
          await card.ResolveEntity();
          page.content.push(card);
          break;
        case 'accordion':
          let accordion = new Accordion(block as Accordion)
          await accordion.ResolveEntity();
          page.content.push(accordion);
          break;
        case 'pricingTable':
          let priceTable = new Price(block as Price)
          await priceTable.ResolveEntity();
          page.content.push(priceTable);
          break;
        case 'contentSection':
          let contentSection = new ContentSection(block as ContentSection)
          await contentSection.ResolveEntity();
          page.content.push(contentSection);
          break;
        case 'timeline':
          let timeline = new Timeline(block as Timeline)
          await timeline.ResolveEntity();
          page.content.push(timeline);
        case 'divider':
          let divider = new Divider(block as Divider);
          page.content.push(divider);
          break;
        default:
          break;
      }
    }

    return page;
  }
}

export default PageService;