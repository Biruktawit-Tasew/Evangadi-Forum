import React, { useState, useRef, useEffect } from "react";
import axiosInstance from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import css from "./signUp.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [allFieldsEmptyError, setAllFieldsEmptyError] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {};

    const isAllFieldsEmpty =
      !formData.username &&
      !formData.first_name &&
      !formData.last_name &&
      !formData.email &&
      !formData.password;

    if (isAllFieldsEmpty) {
      setAllFieldsEmptyError(true);
      return false;
    } else {
      setAllFieldsEmptyError(false);
    }

    if (!formData.username) {
      newErrors.username = true;
      setErrors(newErrors);
      return false;
    }

    if (!formData.first_name) {
      newErrors.first_name = true;
      setErrors(newErrors);
      return false;
    }

    if (!formData.last_name) {
      newErrors.last_name = true;
      setErrors(newErrors);
      return false;
    }

    if (!formData.email) {
      newErrors.email = true;
      setErrors(newErrors);
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";

      setErrors(newErrors);
      return false;
    }

    if (!formData.password) {
      newErrors.password = true;
      setErrors(newErrors);
      return false;
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";

      setErrors(newErrors);
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/register", formData);
      setSuccessMessage(response.data.message);
      setErrors({});

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      if (err.response) {
        setErrors({ api: err.response.data.error });
      } else {
        setErrors({ api: "An error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={css.signUp_container}>
      {allFieldsEmptyError && (
        <p style={{ color: "red" }} className="error-message">
          Please fill out All required fields.
        </p>
      )}
      {successMessage && (
        <p style={{ color: "green" }} className="success-message">
          {successMessage}
        </p>
      )}
      {errors.api && (
        <p style={{ color: "red" }} className="error-message">
          {errors.api}
        </p>
      )}
      <h2>Join the network</h2>
      <p>
        Already have an account?<Link to="#">Sign in</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            ref={usernameRef}
            placeholder="Username"
            className={css.username_input}
            style={{
              borderColor: errors.username ? "red" : "",
            }}
          />
        </div>
        <div className={css.nameFields}>
          <div className={css.formGroup}>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              style={{
                borderColor: errors.first_name ? "red" : "",
              }}
            />
          </div>

          <div className={css.formGroup}>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              style={{
                borderColor: errors.last_name ? "red" : "",
              }}
            />
          </div>
        </div>
        <div className={css.formGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            style={{
              borderColor: errors.email ? "red" : "",
            }}
          />
        </div>
        {errors.email && <div className={css.errorMessage}>{errors.email}</div>}

        <div className={css.formGroup} style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={{
              borderColor: errors.password ? "red" : "",
              paddingRight: "40px",
            }}
          />

          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "20px",
              top: "30%",

              cursor: "pointer",
            }}
          >
            {showPassword ? (
              <FaEye style={{ color: "#fc9105" }} />
            ) : (
              <FaEyeSlash style={{ color: "#fc9105" }} />
            )}{" "}
          </span>
        </div>
        {errors.password && (
          <div className={css.errorMessage}>{errors.password}</div>
        )}

        <div className={css.centeredText}>
          <small>
            i agree to the <Link to="#">privacy policy</Link> and
            <a href="#"> term of service</a>
          </small>
        </div>
        <button type="submit" className={css.signUp_Button}>
          {loading ? (
            <ClipLoader color="#ffffff" size={20} />
          ) : (
            "Agree and Join"
          )}
        </button>
      </form>
      <Link to="#" className={css.account}>
        Already have an account?
      </Link>
    </div>
  );
};

export default SignUp;
