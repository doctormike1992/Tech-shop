import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";



export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="w-full flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}


 
