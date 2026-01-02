
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSquareTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {

  


  return (
    <>
      <footer className="w-full flex flex-col grow-0 bg-(--secondary) border-t border-t-(--ordersBorder) z-51">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start py-5">
          <div className="flex flex-col items-center justify-start gap-1">
            <h1 className="text-xl font-medium">Tech-Eshop</h1>
            <p className="text-wrap text-sm text-center text-(--secondText)">
              Your trusted destination for the latest tech <br /> products and
              accessories. Quality guaranteed.
            </p>
            <div className="flex flex-row gap-1 text-xl">
              <FontAwesomeIcon
                className="cursor-pointer text-blue-700 transition-all hover:scale-120"
                icon={faFacebook}
              />
              <FontAwesomeIcon
                className="cursor-pointer transition-all hover:scale-120 text-blue-500"
                icon={faSquareTwitter}
              />
              <FontAwesomeIcon
                className="cursor-pointer transition-all hover:scale-120 text-[#E1306C]
"
                icon={faInstagram}
              />
              <FontAwesomeIcon
                className="cursor-pointer transition-all hover:scale-120 text-red-600"
                icon={faYoutube}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-xl font-medium">Quick Links</h1>
            <Link
              to={"/"}
              className="text-sm text-(--secondText) hover:text-(--primary)"
            >
              Products
            </Link>
            <Link
              to={"/favorites"}
              className="text-sm text-(--secondText) hover:text-(--primary)"
            >
              Favorites
            </Link>
            <Link
              to={"/orders"}
              className="text-sm text-(--secondText) hover:text-(--primary)"
            >
              Orders
            </Link>
            <Link
              to={"/My-Account"}
              className="text-sm text-(--secondText) hover:text-(--primary)"
            >
              My Acounts
            </Link>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-xl font-medium">Customer Service</h1>
            <p className="text-sm cursor-pointer text-(--secondText) hover:text-(--primary)">
              Help Center
            </p>
            <p className="text-sm text-(--secondText) cursor-pointer hover:text-(--primary)">
              Shipping Info
            </p>
            <p className="text-sm text-(--secondText) cursor-pointer hover:text-(--primary)">
              Return Policy
            </p>
            <p className="text-sm text-(--secondText) cursor-pointer hover:text-(--primary)">
              Terms & Conditions
            </p>
            <p className="text-sm text-(--secondText) cursor-pointer hover:text-(--primary)">
              Privacy Policy
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-xl font-medium">Contact Us</h1>
            <p className="text-sm text-wrap text-center  text-(--secondText) ">
              <FontAwesomeIcon icon={faLocationDot} />
              123 Tech Street, Silicon Valley, CA 94000
            </p>
            <p className="text-sm text-(--secondText)  ">
              <FontAwesomeIcon icon={faPhone} />
              +1 (555) 123-4567
            </p>
            <p className="text-sm text-(--secondText)  ">
              <FontAwesomeIcon icon={faEnvelope} /> support@techeshop.com
            </p>
          </div>
        </div>
        <hr className="text-(--ordersBorder)" />
        <div className="flex flex-row w-full flex-wrap justify-around  py-5">
          <p className="text-wrap text-sm text-center text-(--secondText)">
            © 2026 Tech E-Shop. All rights reserved.
          </p>
          <div className="flex flex-row gap-3">
            <p className="text-sm cursor-pointer hover:text-(--primary) text-(--secondText)">
              Privacy Policy
            </p>
            <p className="text-sm cursor-pointer hover:text-(--primary) text-(--secondText)">
              Terms of Service
            </p>
            <p className="text-sm cursor-pointer hover:text-(--primary) text-(--secondText)">
              Cookie Policy
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}