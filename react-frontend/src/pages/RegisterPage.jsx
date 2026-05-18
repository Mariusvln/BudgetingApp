import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import "../assets/styles/LoginPageStyle.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      setError("");

      const { username, email, password } = formData;

      await axios.post(
        "http://localhost:8080/api/auth/register",
        { username, email, password },
        { withCredentials: true }
      );

      await login({
        email,
        password,
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const inputClass =
    "block w-full rounded-xl border bg-[#F8FAFC] px-4 py-3 text-sm text-[#101828] caret-primary placeholder:text-[#98A2B3] focus:border-primary focus:outline-none";

  return (
    <div data-theme="light" className="RegisterPage w-106 mx-auto mt-20">
      <div className="overflow-hidden flex flex-col min-h-178.75 -translate-x-2 -translate-y-5 rounded-xl border border-gray-300 bg-white shadow-2xs">
        <div className="flex-1 px-6 pt-6 pb-8">
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-black">F</span>
              </div>
              <span className="text-[18px] font-semibold text-[#101828]">
                FinVue
              </span>
            </div>

            <h3
              id="hs-modal-signin-label"
              className="text-[48px] leading-none font-bold text-[#101828]"
            >
              Sign Up
            </h3>

            <p className="mt-4 text-[16px] leading-8 text-muted-foreground-2 text-gray-500">
              Welcome! Please enter your
              <br />
              details.
            </p>
          </div>

          <div className="mb-6 border-t border-card-line border-gray-300" />

          <form onSubmit={handleSubmit(handleRegister)} noValidate>
            <div className="grid gap-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-[#344054]"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className={`${inputClass} ${
                    errors.username?.message ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("username", {
                    required: "Username is required",
                    maxLength: {
                      value: 53,
                      message: "Username is too long",
                    },
                  })}
                />
                <p className="text-red-500">{errors.username?.message}</p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#344054]"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`${inputClass} ${
                    errors.email?.message ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    maxLength: {
                      value: 254,
                      message: "Email is too long",
                    },
                    pattern: {
                      value:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g,
                      message: "Invalid email address",
                    },
                  })}
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#344054]"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={`${inputClass} ${
                    errors.password?.message ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>

              <div>
                <label
                  htmlFor="repeatPassword"
                  className="mb-2 block text-sm font-medium text-[#344054]"
                >
                  Repeat password
                </label>
                <input
                  type="password"
                  id="repeatPassword"
                  placeholder="••••••••"
                  className={`${inputClass} ${
                    errors.repeatPassword?.message
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  {...register("repeatPassword", {
                    required: "Please repeat password",
                    validate: (value) => {
                      if (value !== watch("password")) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                />
                <p className="text-red-500">
                  {errors.repeatPassword?.message}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label
                  htmlFor="checkbox"
                  className="flex items-center text-sm text-[#344054]"
                >
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="shrink-0 size-4 rounded-sm border border-line-3 bg-transparent text-primary"
                  />
                  <span className="ms-3">Remember me</span>
                </label>

                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-primary px-4 py-3 text-base font-semibold text-primary-content hover:opacity-90"
              >
                Sign Up
              </button>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </form>
        </div>

        <div className="bottomWindow flex min-h-18 items-center justify-center border-t border-card-line bg-[#F8FAFC] px-6 py-6 border-gray-300">
          <p className="text-center text-sm text-muted-foreground-2">
            have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
