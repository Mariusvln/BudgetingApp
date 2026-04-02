import { useState } from 'react';
import axios from 'axios';
import '../assets/styles/LoginPageStyle.css';

const RegisterPage = () => {
  // 1. Pridedame būseną (state) duomenims saugoti
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Registracijos funkcija
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Siunčiame tik email ir password, kaip prašei
      await axios.post('http://localhost:8080/api/auth/register', 
        { email, password }, 
        { withCredentials: true }
      );
      alert("Registration successful!");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed!");
    }
  };

  return (
    <div className="RegisterPage w-[424px] mx-auto mt-20">
      <div className="bg-card border border-card-line rounded-xl shadow-2xs overflow-hidden flex flex-col min-h-[715px] -translate-x-[8px] -translate-y-[20px] border-gray-300">
        <div className="flex-1 px-6 pt-6 pb-8">
          
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-400">
                <span className="text-lg font-bold text-black">F</span>
              </div>
              <span className="text-[18px] font-semibold text-foreground">FinVue</span>
            </div>

            <h3 id="hs-modal-signin-label" className="text-[48px] leading-none font-bold text-foreground">
              Sign Up
            </h3>

            <p className="mt-4 text-[16px] leading-8 text-muted-foreground-2 text-gray-500">
              Welcome! Please enter your
              <br />
              details.
            </p>
          </div>

          <div className="mb-6 border-t border-card-line border-gray-300" />

          {/* PRIDĖTA: onSubmit={handleRegister} */}
          <form onSubmit={handleRegister}>
            <div className="grid gap-y-5">
              
              {/* Username paliekame tik vizualiai (backendui nesiunčiame) */}
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-medium text-foreground">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground border-card-line bg-[#F8FAFC] border-gray-300"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email} // SUSIETA SU STATE
                  onChange={(e) => setEmail(e.target.value)} // NAUJINA STATE
                  placeholder="Enter your email"
                  className="block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground border-card-line bg-[#F8FAFC] border-gray-300"
                />
              </div>

              <div>
                <label htmlFor="password" name="password" className="mb-2 block text-sm font-medium text-foreground ">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={password} // SUSIETA SU STATE
                  onChange={(e) => setPassword(e.target.value)} // NAUJINA STATE
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground border-card-line bg-[#F8FAFC] border-gray-300" 
                />
              </div>

              <div>
                <label htmlFor="repeat-password" className="mb-2 block text-sm font-medium text-foreground">
                  Repeat password
                </label>
                <input
                  type="password"
                  id="repeat-password"
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-layer-line bg-layer px-4 py-3 text-sm text-foreground border-card-line bg-[#F8FAFC] border-gray-300"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label htmlFor="checkbox" className="flex items-center text-sm text-foreground">
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="shrink-0 size-4 rounded-sm border border-line-3 bg-transparent text-primary"
                  />
                  <span className="ms-3">Remember me</span>
                </label>

                <a href="#" className="text-sm font-medium text-green-500 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-green-400 px-4 py-3 text-base font-semibold text-black hover:opacity-90 "
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="bottomWindow flex min-h-[72px] items-center justify-center border-t border-card-line bg-[#F8FAFC] px-6 py-6 border-gray-300">
          <p className="text-center text-sm text-muted-foreground-2">
            have an account?{' '}
            <a href="#" className="font-medium text-green-500 hover:underline">
              Sign in </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
