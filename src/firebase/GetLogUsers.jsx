// firebase.js
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export { auth };

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("No user found"));
      }
    });
  });
};
