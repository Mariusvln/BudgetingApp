import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext'; // Import the hook
import '../assets/styles/LoginPageStyle.css';
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // 4. Handle Form Submission
  const handleLogin = async (formData) => {
    setError("");

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error("Login Error:", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // username: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="LoginPage w-[424px] mx-auto mt-20">
      <div className="bg-card border border-card-line rounded-xl shadow-2xs overflow-hidden flex flex-col min-h-[715px] -translate-x-[8px] -translate-y-[20px] border-gray-300">
        <div className="flex-1 px-6 pt-6 pb-8">
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-400">
                <span className="text-lg font-bold text-black">F</span>
              </div>
              <span className="text-[28px] font-semibold text-foreground">FinVue</span>
            </div>

            <h3 className="text-[48px] leading-none font-bold text-foreground">Sign in</h3>
            <p className="mt-4 text-[16px] leading-8 text-muted-foreground-2 text-gray-500">
              Welcome back! Please enter your<br />details.
            </p>
            {error && <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>}
          </div>

          <div className="mb-6 border-t border-card-line border-gray-300" />

          {/* 5. Add onSubmit and value/onChange to inputs */}
          <form onSubmit={handleSubmit(handleLogin)} noValidate>
            <div className="grid gap-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground focus:border-primary-focus focus:ring-primary-focus border-card-line bg-[#F8FAFC] border-gray-300"
                  // {...register("username", {
                  //   required: "Username is required",
                  // })}
                />
                {/* <p className="text-red-500">{errors.username?.message}</p> */}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Email address</label>
                <input
                  type="email"
                  name="email"
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
                <label className="mb-2 block text-sm font-medium text-foreground">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••" 
                  className={`block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground border-card-line bg-[#F8FAFC] ${errors.password?.message ? `border-red-500` : `border-gray-300`}`}
                  {...register("password", {
                    required: "Password is required",
                  })} 
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center text-sm text-foreground">
                  <input type="checkbox" className="shrink-0 size-4 rounded-sm border border-line-3 bg-transparent text-primary" />
                  <span className="ms-3">Remember me</span>
                </label>
                <a href="#" className="text-sm font-medium text-green-500 hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-green-400 px-4 py-3 text-base font-semibold text-black hover:opacity-90  "
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="bottomWindow flex min-h-[72px] items-center justify-center border-t border-card-line bg-[#F8FAFC] px-6 py-6 border-gray-300">
          <p className="text-center text-sm text-muted-foreground-2 ">
            Don't have an account?{' '}
            {/* 6. Use Link for internal navigation */}
            <Link to="/signup" className="font-medium text-green-500 hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
