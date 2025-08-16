
import { useState } from "react";
import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../firebase/firebase";
import { userActions } from "../store/userSclice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";



export default function Singin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [islogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const newAuth = getAuth(app);

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        newAuth,
        email,
        password
      );
      const user = userCredential.user;

      
      // Update Redux on sign-up
      dispatch(userActions.userLoggedIn(true));
      dispatch(userActions.userId(user.uid));
      setEmail('')
      setPassword('')
      setShowPass(false);


      console.log("Account created:", user);
    } catch (err) {
      console.error("Signup error code:", err.code, "message:", err.message);
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Email already in use.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        default:
          setError(err.message);
      }
    }
    
  }
  


//LOGGING IN
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(userActions.userLoggedIn(true));
      dispatch(userActions.userId(userCredential.user.uid));
      setEmail("");
      setPassword("");
      setShowPass(false);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('Invalid Email or Password');
    }
   

  }
  
  return (
    <>
      <div className=" flex items-center justify-center g px-4">
        <form
          onSubmit={islogin ? handleSubmit : handleSignUp}
          className="bg-white shadow-md rounded-lg p-8 h-full flex flex-col gap-10  md:w-120 "
        >
          {error && <p className="text-red-500">{error}</p>}
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            {islogin ? "Sing in" : "Register"}
          </h2>
          <div className="space-y-6 m-3">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="relative">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                className="absolute right-1 top-[50%]"
                onClick={() => setShowPass((prev) => !prev)}
              >
                {showPass ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className=" w-full bg-fuchsia-600 text-white py-2 rounded-lg hover:bg-fuchsia-700 transition"
          >
            {islogin ? "Sing in" : "Create new Account"}
          </button>
          <p className="text-sm text-center text-gray-600">
            {islogin
              ? "Don’t have an account? "
              : "You already have an account? "}

            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              {islogin ? "Register" : "Log in"}
            </button>
          </p>
        </form>
      </div>
    </>
  );
}