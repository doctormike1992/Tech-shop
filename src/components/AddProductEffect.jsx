import { useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function AddProductEffect() {
  const addedProducts = useSelector((state) => state.guest.addedEffect);
  return (
    <div className="fixed z-100 bottom-10 right-5 md:right-20 flex flex-col items-center">
      {addedProducts.map((item) => (
        <div className={"animateAdd"} key={item.effectId}>
          <p className="text-xs md:text-sm text-wrap">
            <FontAwesomeIcon icon={faCircleCheck} />{" "}
            <strong>{item.name}</strong> was added
          </p>
        </div>
      ))}
    </div>
  );
}