import { useNavigate } from "react-router";

function HeroHeader() {
  const navigate = useNavigate();

  const RegisterClick = () => {
    navigate("/signup");
  };

  const SignInClick = () => {
    navigate("/signin");
  };

  return (
    <>
      <div className="flex justify-between bg-base-100 p-5">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-[#22C55E] to-[#15803D] bg-clip-text text-transparent">
            FinVue
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={SignInClick}
            className="px-6 py-3  bg-[#32a316] hover:bg-green-600 rounded-2xl font-semibold shadow-lg text-white"
          >
            Sign In
          </button>
          <button
            onClick={RegisterClick}
            className="px-6 py-3 bg-[#32a316] hover:bg-green-600 rounded-2xl font-semibold shadow-lg text-white"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default HeroHeader;
