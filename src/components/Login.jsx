import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("shristi@gmail.com");
  const [password, setPassword] = useState("Fulsend@123");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", firstname: "", lastname: "" };

    // Firstname validation
    if (!isLogin && !firstname) {
      newErrors.firstname = "Firstname is required";
      isValid = false;
    }

    // Lastname validation
    if (!isLogin && !lastname) {
      newErrors.lastname = "Lastname is required";
      isValid = false;
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    try {
      const endpoint = isLogin ? `${BASE_URL}/login` : `${BASE_URL}/signup`;
      const res = await axios.post(
        endpoint,
        {
          emailId: email,
          password,
          ...(isLogin ? {} : { firstName: firstname, lastName: lastname }),
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      if (isLogin) {
        navigate("/");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        setErrors({ ...errors, general: error.response.data.message });
      }
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">
            {isLogin ? "Login" : "Signup"}
          </h2>
          {errors.general && (
            <div className="text-error text-sm text-center">
              {errors.general}
            </div>
          )}
          <div>
            {!isLogin && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className={`input ${errors.firstname ? "input-error" : ""}`}
                    placeholder="Type here"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  {errors.firstname && (
                    <div className="text-error text-sm mt-1">
                      {errors.firstname}
                    </div>
                  )}
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className={`input ${errors.lastname ? "input-error" : ""}`}
                    placeholder="Type here"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  {errors.lastname && (
                    <div className="text-error text-sm mt-1">
                      {errors.lastname}
                    </div>
                  )}
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className={`input ${errors.email ? "input-error" : ""}`}
                placeholder="Type here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="text-error text-sm mt-1">{errors.email}</div>
              )}
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className={`input ${errors.password ? "input-error" : ""}`}
                placeholder="Type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="text-error text-sm mt-1">{errors.password}</div>
              )}
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleAuth}>
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create an account" : "Already have an account?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
