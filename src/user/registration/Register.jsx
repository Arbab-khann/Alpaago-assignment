import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, ref, set } from "../../firebase/FirebaseCompo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navi = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("user register successful");
        console.log(user);
        // tost notificatin
        toast.success("user register successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navi("/login");
        }, 3000);

        // Additional data to be stored in the database
        const timestamp = new Date().toLocaleDateString("en-GB"); // Format to DD-MM-YY
        const userData = {
          uid: user.uid,
          email: user.email,
          password: password,
          displayName: name,
          timestamp: timestamp, // Add a timestamp field
        };

        // Path to store user data in the database
        const userRef = ref(db, `users/${user.uid}`);

        // Store user data in the database
        set(userRef, userData);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(`${errorMessage}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <div>
      <Header />
      {/* making register form  */}
      <div className="register-form">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="register">
            <form className="form">
              <p
                onClick={() => {
                  navi("/login");
                }}
                className="log-in"
              >
                Login?
              </p>
              <label htmlFor="chk" aria-hidden="true">
                Register
              </label>
              <input
                className="input"
                type="text"
                name="txt"
                placeholder="Username"
                required=""
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input"
                type="email"
                name="email"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input"
                type="password"
                name="pswd"
                placeholder="Password"
              />
              <button onClick={submit}>Register</button>
            </form>
          </div>
        </div>
      </div>
      {/* react toaster for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default Register;
