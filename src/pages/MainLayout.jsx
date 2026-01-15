import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddProductEffect from "../components/AddProductEffect";
import { ScrollTop } from "../utils/scrollTop";
import { useWidth } from "../utils/useWidth";
import { useScroll } from "../utils/useScroll";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default function MainLayout() {
  const userLogState = useSelector((state) => state.user.isLoggedIn);
  const width = useWidth();
  const scroll = useScroll();


  return (
    <div className="min-h-screen flex flex-col">
      <ScrollTop />
      <Header />
      <main className="w-full grow relative">
        <Outlet />
        {userLogState && (
          <Link to={"/orders"}>
            <button className="fixed bottom-6 right-7 bg-(--deepBlue) text-white cursor-pointer hover:bg-(--deepBlue)/80 font-medium  py-2 px-3 md:px-5 rounded-lg text-xs md:text-sm z-50">
              {width > 600 && "view"} Orders
            </button>
          </Link>
        )}
        {scroll && (
          <div className="fixed bottom-6 left-10 bg-(--deepBlue) text-white cursor-pointer hover:bg-(--deepBlue)/80 font-medium  py-1.5 px-1.5 md:px-2 rounded-lg text-sm md:text-lg z-50"
            onClick={() => window.scrollTo({ top: 0, behavior:'smooth'})}
          >
            <FontAwesomeIcon  icon={faAngleUp} />
          </div>
        )}
        <AddProductEffect />
      </main>
      <Footer />
    </div>
  );
}


 
