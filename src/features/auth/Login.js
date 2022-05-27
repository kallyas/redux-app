import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, loginUser, reset } from "./authSlice";

export const Login = () => {
  const { isLoading, isError, errorMessage, isAuthenticated } =
    useSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to home page
      navigate("/");
    }
    if (isError) {
      setTimeout(() => {
        dispatch(reset());
      }, 5000);
    }
  }, [isAuthenticated, isError, dispatch, navigate]);

  return (
    <div>
      <h1>Login</h1>
      {isError && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
};
