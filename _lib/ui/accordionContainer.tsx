"use client";
import React from "react";
import { Disclosure } from "@headlessui/react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

type AccordionItem = {
  title: string;
  description?: string;
  _key: string;
};

type AccordionContainerProps = {
  items: AccordionItem[];
};

const AccordionContainer = ({ items }: AccordionContainerProps) => {
  return (
    <section className="accordion-container max-w-6xl mx-auto">
      {items.map((item) => (
        <Disclosure key={item._key}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white text-left text-black hover:bg-gray-300">
                <span>{item.title}</span>
                {open ? (
                  <FiChevronDown className="h-5 w-5 text-black" />
                ) : (
                  <FiChevronRight className="h-5 w-5 text-black" />
                )}
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4">
                <p className="p-2">{item.description}</p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </section>
  );
};

export default AccordionContainer;
