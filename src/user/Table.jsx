import React, { useEffect, useState } from "react";
import { db, ref, onValue, remove } from "../firebase/FirebaseCompo";
import { getAuth, deleteUser } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteOutline } from "react-icons/md";
import "./style.css";
import Header from "./Header";

const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Path to the 'users' node in the database
    const usersRef = ref(db, "users");

    // Listen for changes in the 'users' node
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();

      // Convert the object of users into an array
      const usersArray = usersData ? Object.values(usersData) : [];

      setUsers(usersArray);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Run this effect only once, similar to componentDidMount

  const handleDelete = async (userId) => {
    try {
      // Remove the user from the Realtime Database
      const userRef = ref(db, `users/${userId}`);
      await remove(userRef);
      toast.success("User deleted ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Remove the user from Firebase Authentication
      const auth = getAuth();
      const user = await deleteUser(auth.currentUser);
      console.log("User deleted from Firebase Authentication", user);
    } catch (error) {
      console.error("Error deleting user:", error.message);
      // toster notification
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      {" "}
      <Header />
      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Added Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid}>
                <td>{user.displayName}</td>
                <td>{user.timestamp}</td>

                <td>Active</td>
                <td>
                  <button onClick={() => handleDelete(user.uid, user.email)}>
                    <MdDeleteOutline color="red" size="1.5rem" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
    </>
  );
};

export default Table;
