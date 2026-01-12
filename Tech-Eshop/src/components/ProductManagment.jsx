// import EditProduct from "./EditProduct";
import { useSelector, useDispatch } from "react-redux";
import { categories } from "../store/categories";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import BoxIcon from "../icons/box.svg?react";
import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { ref, deleteObject } from "firebase/storage";
import { productsActions } from "../store/productsSlice";
import Modal from "./Modal";
import EditProduct from "./EditProduct";
import { useRef, useState } from "react";


export default function ProductManagment() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const modal = useRef();


  

  //DELETE PRODUCT AND IMAGE FORM REDUX AND FIREBASE  
  const handleDeleteProduct = async (product) => {
    try {
      if (product.image) {
        const imageRef = ref(storage, product.image);
        await deleteObject(imageRef);
        const productRef = doc(db, "products", product.id);
        await deleteDoc(productRef);
      }

      
      const updatedProducts = products.filter(item => item.id !== product.id);
      dispatch(productsActions.setProducts(updatedProducts));
      
    } catch (error) {
      console.log("problem removing the product", error);
    }
  };

  if (!Array.isArray(products)) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {categories.map((item) => {
        const productsNum = products.filter((pro) => pro.category === item);
        console.log(productsNum);
        return (
          <div
            className="flex w-full h-full flex-col justify-center  items-start py-3 gap-3"
            key={item}
          >
            <div className="flex flex-row pb-2 justify-center text-(--primary) items-center gap-2">
              <BoxIcon className="w-5 h-5" />
              <h1 className="text-xl font-medium">{item} </h1>
              <p className=" inline-flex items-center justify-center py-0.5 text-xs font-medium bg-(--purple) text-white px-2 rounded-md">
                {productsNum.length}
              </p>
            </div>

            <div className="flex flex-wrap flex-row gap-10  h-full w-full">
              {products.map((product) => (
                <Fragment key={product.id}>
                  {product.category === item && (
                    <>
                      <div className="flex flex-col  bg-(--white) w-full border md:min-w-110 md:w-130 max-w-130 max-h-90 border-(--ordersBorder) p-2  rounded-lg ">
                        <div className="flex flex-row items-start  justify-start h-full">
                          <div className="h-full flex items-start aspect-square relative justify-start ">
                            {product.sale && (
                              <span className="absolute left-1 top-1 bg-(--deepBlue) text-white text-xs px-2 font-medium rounded-md">
                                -{product.percentage}%
                              </span>
                            )}
                            <img
                              src={product.image}
                              className="w-25 h-25 md:w-30 md:h-30  object-cover rounded-lg shrink-0"
                            />
                          </div>
                          <div className="flex flex-col px-1.5 md:px-4 gap-5 w-full justify-center min-w-0">
                            <div className="flex flex-col justify-start gap-1  items-start">
                              <h1 className="text-md md:text-lg text-(--primary) font-medium">
                                {product.name}
                              </h1>
                              <p className="text-xs md:text-sm font-medium text-(--secondText)  max-w-90 max-h-9   line-clamp-2 ">
                                {product.summary}
                              </p>
                            </div>
                            <div className="flex  flex-row text-(--primary) items-center  justify-between">
                              <p className="text-lg font-medium">
                                {product.finalPrice.toFixed(2)}
                                <sup>€</sup>
                              </p>
                              <p className="text-xs md:text-sm  text-(--secondText)">
                                Days tp Deliver: {product.deliveryTime}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-around pt-4  items-center">
                          <button
                            className="flex gap-1 transition-all text-(--primary) hover:text-white hover:bg-(--blue) items-center border dark:hover:bg-(--background)/40 font-medium border-(--ordersBorder) text-sm md:text-md rounded-md px-10 md:px-22 py-0.5 cursor-pointer bg-(--secondary) dark:bg-(--white)"
                            onClick={() => {
                              setSelectedProduct(product);
                              modal.current.open();
                            }}
                          >
                            <FontAwesomeIcon
                              className="text-sm"
                              icon={faPencil}
                            />
                            Edit
                          </button>
                          <button
                            className="flex gap-1 items-center border border-red-600 font-medium  rounded-md px-10 md:px-22 text-sm md:text-md py-0.5 z-10 text-stone-50 bg-red-600 hover:bg-red-600/80 cursor-pointer"
                            onClick={() => {
                              handleDeleteProduct(product);
                            }}
                          >
                            <FontAwesomeIcon
                              className="text-sm  text-stone-50"
                              icon={faTrashCan}
                            />
                            Delete
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        );
      })}
      <Modal ref={modal} modalClass="flex items-start pt-[1%] justify-center overflow-auto">
        {selectedProduct && <EditProduct product={selectedProduct} modal={modal} />}
      </Modal>
    </>
  );
}
