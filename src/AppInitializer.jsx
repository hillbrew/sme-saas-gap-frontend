import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthFromStorage } from "./redux/slices/authSlice";
import { fetchCustomers } from "./redux/thunk/Thunk";


const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(setAuthFromStorage({ token }));
    }

    setInitialized(true);

    dispatch(fetchCustomers())
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Initializing application…
      </div>
    );
  }

  return children;
};

export default AppInitializer;
