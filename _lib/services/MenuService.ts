import { client } from "@/_lib/client/client";
import Page from "../content/Page";

//TODO: Logo is part of siteSettings and we need to type accordingly later on.
export type Logo = {
    logo: {
        asset: {
            url: string;
        };
    };
}

class MenuService {
    async Fetch(): Promise<{ pages: Page[] }> {
        const menuQuery = "*[_type == 'page' && showInMenu == true]{slug, _id, name, menuOrder}";
        const pages = await client.fetch<Page[]>(menuQuery);

        const logoQuery = "*[_type == 'siteSettings'][0]{logo{asset->{url}}}";
        const logo = await client.fetch<Logo>(logoQuery);

        return { pages };
    }
}

export default MenuService;
