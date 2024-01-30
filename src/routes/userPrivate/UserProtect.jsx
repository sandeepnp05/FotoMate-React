import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
function UserProtect(props) {
  try {
    const token = localStorage.getItem("userToken");
    if (token) {
        // eslint-disable-next-line react/prop-types
        return props.children;
    } else {
      toast.success("You must login first");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.log(error.message);
  }
}
export default UserProtect;
