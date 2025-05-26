import "./App.css";
import Admin from "./pages/Admin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import Products from "./pages/Products";
import ProductDetail from "./components/ProductDetail";
import { collection, onSnapshot } from "firebase/firestore";
import { productsActions } from "./store/productsSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { db } from "./firebase/firebase";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    
     const unsubscribe =  onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const productData =  snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          
        }));
        console.log(productData)
        dispatch(productsActions.setProducts( productData));
      },
      (error) => {
        console.error("Error fetching products: ", error);
      }
    );
    return () => unsubscribe();
    
  }, [dispatch]);
  


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Products />,
        },
        {
          path: "/:productId",
          element: <ProductDetail />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        // {
        //   path: '/favorites',
        //   element:
        // },
        // {
        //   path: '/favorites/:favoritesId',
        //   element: ,
        // },
        // {
        //   path: '/cart',
        //   element: ,
        // },
        // {
        //   path: '/cart/:cartId',
        //   element: ,
        // },
        // {
        //   path: '/orders',
        //   element: ,
        // },
        // {
        //   path: '/orders/:ordersId',
        //   element: ,
        // },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
