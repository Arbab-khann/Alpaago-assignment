import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import Header from "../Header";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(auth);
        console.log("user successful login");
        // tost notificatin
        toast.success("user successful login", {
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
          navi("/table");
        }, 3000);

        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(`${error.Message}`, {
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
    console.log(email, password);
  };
  return (
    <>
      <Header />
      {/* making login form */}
      <div className="loginform">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="login">
            <form className="form">
              <p
                style={{ color: "white", fontWeight: "200" }}
                onClick={() => {
                  navi("/register");
                }}
                className="log-in register-btn"
              >
                Signup?
              </p>
              <label htmlFor="chk" aria-hidden="true">
                Log in
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                required=""
              />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input"
                type="password"
                name="pswd"
                placeholder="Password"
                required=""
              />
              <button onClick={submit}>Log in</button>
            </form>
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
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
