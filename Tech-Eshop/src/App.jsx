import "./App.css";
import Admin from "./pages/Admin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import Products from "./pages/Products";
import ProductDetail from "./components/ProductDetail";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { productsActions } from "./store/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { db } from "./firebase/firebase";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { userActions } from "./store/userSclice";
import { guestActions } from "./store/guestSlice";
import Orders from "./pages/Orders";
import Info from "./pages/Info";

export default function App() {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.userUID);

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

  //ADDING THE PRODUCTS,CART,FAVORITES,ORDERS,PROFILE ON REDUX ON LOG IN
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const productData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(productsActions.setProducts(productData));
      },
      (error) => {
        console.error("Error fetching products: ", error);
      }
    );

    if (uid) {
      const unsubscribeOrders = onSnapshot(
        collection(db, `users/${uid}/orders`),
        (snapshot) => {
          const ordersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(guestActions.addToOrders());
          dispatch(guestActions.addToOrders(ordersData));
        },
       (error) => {
          console.error("Error fetching orders: ", error);
        }
      );
 
      const unsubscribeCart = onSnapshot(
        collection(db, `users/${uid}/cart`),
        (snapshot) => {
          const cartData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(guestActions.addToCart(cartData));
        },
        (error) => {
          console.error("Error fetching cart: ", error);
        }
      );

      const unsubscribeFavorites = onSnapshot(
        collection(db, `users/${uid}/favorites`),
        (snapshot) => {
          const favoiritesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(guestActions.addToFavorites(favoiritesData));
        },
        (error) => {
          console.error("Error fetching favories: ", error);
        }
      );

     const unsubscribeInfo = onSnapshot(
       doc(db, `users/${uid}/info/main`),
       (docSnap) => {
         if (!docSnap.exists()) return;

         dispatch(guestActions.addInfo(docSnap.data()));
       },
       (error) => {
         console.error("Error fetching info:", error);
       }
     );

      return () => {
        unsubscribe();
        uid &&
          (unsubscribeCart(),
          unsubscribeFavorites(),
          unsubscribeOrders,
          unsubscribeInfo());
      };
    }
  }, [dispatch, uid]);

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
          path: "/favorites",
          element: <Favorites />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/info",
          element: <Info />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
