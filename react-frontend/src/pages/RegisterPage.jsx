import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "../assets/styles/LoginPageStyle.css";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const handleRegister = async (formData) => {
    try {
      setError("");

      const { username, email, password } = formData;

      await axios.post(
        "http://localhost:8080/api/auth/register",
        { username, email, password },
        { withCredentials: true }
      );

      alert("Registration successful!");
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
      email: "",
      password: "",
    },
  });

  return (
    <div className="RegisterPage w-[424px] mx-auto mt-20">
      <div className="bg-card border border-card-line rounded-xl shadow-2xs overflow-hidden flex flex-col min-h-[715px] -translate-x-[8px] -translate-y-[20px] border-gray-300">
        <div className="flex-1 px-6 pt-6 pb-8">
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-400">
                <span className="text-lg font-bold text-black">F</span>
              </div>
              <span className="text-[18px] font-semibold text-foreground">
                FinVue
              </span>
            </div>

            <h3
              id="hs-modal-signin-label"
              className="text-[48px] leading-none font-bold text-foreground"
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
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className={`block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground border-card-line bg-[#F8FAFC] ${errors.username?.message ? "border-red-500" : "border-gray-300"}`}
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <p className="text-red-500">{errors.username?.message}</p>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  className={`block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground border-card-line bg-[#F8FAFC] ${errors.email?.message ? `border-red-500` : `border-gray-300`}`}
                  {...register("email", {
                    required: "Email is required",
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
                  name="password"
                  className="mb-2 block text-sm font-medium text-foreground "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  className={`block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground border-card-line bg-[#F8FAFC] ${errors.password?.message ? `border-red-500` : `border-gray-300`}`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>

              <div>
                <label
                  htmlFor="repeatPassword"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Repeat password
                </label>
                <input
                  type="password"
                  id="repeatPassword"
                  placeholder="••••••••"
                  className={`block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground border-card-line bg-[#F8FAFC] ${errors.repeatPassword?.message ? `border-red-500` : `border-gray-300`}`}
                  {...register("repeatPassword", {
                    required: "Please repeat password",
                    validate: (value) => {
                      if (value != watch("password")) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                />
                <p className="text-red-500">{errors.repeatPassword?.message}</p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label
                  htmlFor="checkbox"
                  className="flex items-center text-sm text-foreground"
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
                  className="text-sm font-medium text-green-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-green-400 px-4 py-3 text-base font-semibold text-black hover:opacity-90 "
              >
                Sign Up
              </button>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
          </form>
        </div>

        <div className="bottomWindow flex min-h-[72px] items-center justify-center border-t border-card-line bg-[#F8FAFC] px-6 py-6 border-gray-300">
          <p className="text-center text-sm text-muted-foreground-2">
            have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-green-500 hover:underline"
            >
              Sign in{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;