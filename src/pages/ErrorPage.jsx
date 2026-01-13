import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";


export default function ErrorPage() {
  return (
    <>
      <Header />
      <div className="size-full flex flex-col gap-4 items-center pt-[10%]">
        <h1 className="text-4xl text-(--primary) font-semibold">ERROR 404</h1>
        <h3 className="text-4xl text-(--primary) font-semibold">
          Page Not Found
        </h3>
        <FontAwesomeIcon
          className="text-4xl text-(--primary)"
          icon={faTriangleExclamation}
        />
      </div>
    </>
  );
}