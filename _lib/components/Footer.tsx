const Footer = () => {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 left-2/3  ml-10 blur-2xl opacity-70 pointer-events-none -z-10"
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="434" height="427">
            <defs>
              <linearGradient
                id="bs4-a"
                x1="19.609%"
                x2="50%"
                y1="14.544%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#A855F7"></stop>
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            <path
              fill="url(#bs4-a)"
              fillRule="evenodd"
              d="m0 0 461 369-284 58z"
              transform="matrix(1 0 0 -1 0 427)"
            ></path>
          </svg>
        </div>
      </div>
      <div className="mx-auto text-center xl:text-end max-w-6xl text-white text-lg py-12 md:py-20 px-4">
        Project by: Tuomas Orhanen
      </div>
    </div>
  );
};

export default Footer;
