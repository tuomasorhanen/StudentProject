import { createClient } from "next-sanity";
import config from "./config";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || config.projectId;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || config.dataset;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || config.apiVersion;
const useCdn: boolean =
  !!process.env.NEXT_PUBLIC_SANITY_USE_CDN || config.useCdn;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published" //TODO: leverage https://www.sanity.io/blog/introducing-perspectives-sanity-previews
});
