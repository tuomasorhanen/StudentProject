//Modules
import Link from "next/link";
import Image from "next/image";

//Types
import Page from "../content/Page";

//Illustrations
import logo from "@/public/images/logoOutline.svg";

//UI Components
import MobileMenu from "./MobileHeader";

type HeaderProps = {
  pages: Page[];
  slug: string;
};

const Header = (props: HeaderProps) => {
  const sortedPages = [...props.pages].sort(
    (a, b) => a.menuOrder! - b.menuOrder!
  );

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/">
            <Image src={logo} alt="Logo" width={60} height={60} />
          </Link>
          <div>
            <nav className="hidden md:flex md:grow">
              {sortedPages.map((page) => (
                <div key={page._id}>
                  <Link
                    href={page.slug.current}
                    className="font-medium text-slate-300 hover:text-white mx-4 lg:mx-5 transition duration-150 ease-in-out"
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
          <MobileMenu pages={sortedPages} />
        </div>
      </div>
    </header>
  );
};

export default Header;
