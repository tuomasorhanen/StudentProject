import React from "react";
import PageService from "@/_lib/services/PageService";
import MenuService from "@/_lib/services/MenuService";
import Header from "@/_lib/components/Header";
import { permanentRedirect } from "next/navigation";
import Footer from "@/_lib/components/Footer";
import MetadataService from "@/_lib/services/MetadataService";

export async function generateMetadata(props: HomeProps) {
  const metadata = await new MetadataService().Fetch(props.params.slug);
  const { title, description } = metadata.pageMetadata!;

  return {
    title: title,
    description: description,
  };
}

type HomeProps = { params: { slug: string } };

async function Home(props: HomeProps) {
  const page = await new PageService().Fetch(props.params.slug);
  const menu = await new MenuService().Fetch();

  if (props.params.slug === "home") {
    return permanentRedirect("/");
  }

  return (
    <>
      <Header {...menu} slug={props.params.slug} />
      {page.content.map((content) => content.Component())}
      <Footer />
    </>
  );
}

export default Home;
