import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddProductEffect from "../components/AddProductEffect";
import { ScrollTop } from "../utils/scrollTop";


export default function MainLayout() {
  const userLogState = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollTop />
      <Header />
      <main className="w-full grow relative">
        <Outlet />
        {userLogState && (
          <Link to={"/orders"}>
            <button className="fixed bottom-6 right-7 bg-(--deepBlue) text-white cursor-pointer hover:bg-(--deepBlue)/80 font-medium py-2 px-5 rounded-lg text-sm z-50">
              View Orders
            </button>
          </Link>
        )}
        <AddProductEffect />
      </main>
      <Footer />
    </div>
  );
}


 
