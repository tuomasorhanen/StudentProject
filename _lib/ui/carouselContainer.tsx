"use client";
import Image from "next/image";
import React from "react";
import Swiper from "swiper";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import Particles from "./particles";

type CarouselItem = {
  title?: string;
  description?: string;
  image?: string;
  _key: string;
};

type CarouselContainerProps = {
  items: CarouselItem[];
};

const CarouselContainer = ({ items }: CarouselContainerProps) => {
  React.useEffect(() => {
    new Swiper(".swiper-container", {
      modules: [Autoplay, FreeMode],
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      speed: 10000,
      breakpoints: {
        320: { slidesPerView: 3 },
        640: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      },
      loop: true,
    });
  }, []);

  return (
    <>
      <Particles className="absolute top-0 left-0 w-full h-full" />
      <div className="swiper-container">
        <div className="swiper-wrapper">
          {items.map((item) => (
            <div className="swiper-slide" key={item._key}>
              <Image
                src={item.image!}
                alt={item.title!}
                width={60}
                height={60}
                className="mx-auto object-cover"
              />

              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarouselContainer;
