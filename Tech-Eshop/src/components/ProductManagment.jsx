// import EditProduct from "./EditProduct";
import { useSelector, useDispatch } from "react-redux";
import { categories } from "../store/categories";
import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faBoxArchive } from "@fortawesome/free-solid-svg-icons";
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
            className="flex w-full h-full flex-col justify-center items-start py-3 gap-3"
            key={item}
          >
            <div className="flex flex-row pb-2 justify-center items-center gap-2">
              <FontAwesomeIcon icon={faBoxArchive} />
              <h1 className="text-xl font-medium">{item} </h1>
              <p className=" inline-flex items-center justify-center py-0.5 text-xs font-medium bg-(--third) px-2 rounded-md">
                {productsNum.length}
              </p>
            </div>

            <div className="flex flex-wrap flex-row gap-10  h-full w-full">
              {products.map((product) => (
                <Fragment key={product.id}>
                  {product.category === item && (
                    <>
                      <div className="flex flex-col  border min-w-110 w-130 max-w-130 max-h-90 border-stone-300 p-2  rounded-lg ">
                        <div className="flex flex-row items-start  justify-start h-full">
                          <div className="h-full flex items-start relative justify-start ">
                            {product.sale && (
                              <span className="absolute left-3 top-1 bg-stone-950 text-stone-50 text-xs px-2 font-medium rounded-md">
                                -{product.percentage}%
                              </span>
                            )}
                            <img
                              src={product.image}
                              className="w-30 h-30 aspect-4/3 object-cover rounded-lg fshrink-0"
                            />
                          </div>
                          <div className="flex flex-col px-4 gap-10 w-full justify-center min-w-0">
                            <div className="flex flex-col justify-start gap-1  items-start">
                              <h1 className="text-lg font-medium">
                                {product.name}
                              </h1>
                              <p
                                className="text-sm font-medium text-stone-500  max-w-90 max-h-9  line-clamp-2"
                              >
                                {/* {product.summary} */}
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui rem porro molestiae voluptatum beatae, nemo odit similique. Ipsum earum quisquam nobis eius? Necessitatibus ex maiores sequi temporibus rerum consectetur similique?
                              </p>
                            </div>
                            <div className="flex flex-row  items-center justify-between">
                              <p className="text-lg font-medium">
                                ${product.finalPrice.toFixed(2)}
                              </p>
                              <p className="text-sm  text-stone-400">
                                Days tp Deliver: {product.deliveryTime}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-around pt-4  items-center">
                          <button
                            className="flex gap-1 items-center border font-medium border-stone-400 rounded-md px-22 py-0.5 cursor-pointer"
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
                            className="flex gap-1 items-center border border-red-600 font-medium  rounded-md px-22 py-0.5 z-10 text-stone-50 bg-red-600 cursor-pointer"
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
