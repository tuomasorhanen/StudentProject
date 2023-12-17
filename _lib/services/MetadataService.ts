import { client } from "../client/client";
import Page from "../content/Page";

class MetadataService {

    public async Fetch(slug: string): Promise<Page> {
        const pageData = await client.fetch<Page>(`*[_type == 'page' && slug.current == '${slug}'][0]{pageMetadata{...,}}`, {
            next: { revalidate: 10 } //TODO: per environment revalidation settings
        });
        let metadata = pageData

        return metadata;
    }
}

export default MetadataService;