import React from "react";
import PageService from "@/_lib/services/PageService";
import MenuService from "@/_lib/services/MenuService";
import Header from "@/_lib/components/Header";
import Footer from "@/_lib/components/Footer";
import MetadataService from "@/_lib/services/MetadataService";

export async function generateMetadata() {
  const metadata = await new MetadataService().Fetch("home");
  const { title, description } = metadata.pageMetadata!;

  return {
    title: title,
    description: description,
  };
}

async function Home() {
  const page = await new PageService().Fetch("home");
  const menu = await new MenuService().Fetch();
  return (
    <>
      <Header {...menu} slug="home" />
      {page.content.map((content) => content.Component())}
      <Footer />
    </>
  );
}

export default Home;
