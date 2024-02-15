import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { googleAuth } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {userLogin} from '../../reduxStore/slices/userSlice'

function Oauth() {
  const navigate = useNavigate();
  const userSelector = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleClick = async () => {
    try {
      setLoading(true);
      setError(null);

      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
     const res = await googleAuth(result);

      if (res?.status == 200) {
        const { user, token } = res.data
        localStorage.setItem('userToken', token)
        dispatch(
          userLogin({
            user: user,
            token: token
          })
        )
        
        navigate("/");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Button
  onClick={handleGoogleClick}
  type="button"
  className="bg-white text-gray-700 mt-3 hover:opacity-90 flex items-center justify-center" // Add flex, items-center, and justify-center here
  disabled={loading}
>
  <img
    className="w-6 h-6 mr-2" // Add some margin to the right of the image
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    loading="lazy"
    alt="google logo"
  />
  {loading ? "Signing in..." : "Continue with Google"}
</Button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
     

    </>
  );
}

export default Oauth;
