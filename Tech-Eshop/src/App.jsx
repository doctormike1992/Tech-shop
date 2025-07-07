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
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import { onAuthStateChanged } from "firebase/auth";
import { userActions } from "./store/userSclice";
import { getAuth } from "firebase/auth";





export default function App() {
  const dispatch = useDispatch();



  //ADDING THE USER ON REDUX
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userActions.userLoggedIn(true));
        dispatch(userActions.userId(user.uid));
        dispatch(
          userActions.getUserInfo({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(userActions.userLoggedIn(false));
        dispatch(userActions.userId(null));
        dispatch(userActions.getUserInfo(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  //ADDING THE PRODUCTS ON REDUX ON MOUNT
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
        {
          path: '/favorites',
          element: <Favorites />
        },
        {
          path: '/cart',
          element: <Cart />,
        },
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
