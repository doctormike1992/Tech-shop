import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function MainLayout() {
  const userLogState = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="w-full grow">
        <Outlet />
        {userLogState && <Link to={"/orders"}>
          <button className="fixed bottom-6 right-7 text-(--white) bg-(--primary) cursor-pointer hover:bg-[#101025] font-medium py-2 px-5 rounded-lg text-sm z-50">
            View Orders
          </button>
        </Link>}
        
      </main>
      <Footer />
    </div>
  );
}


 
