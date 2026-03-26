import { useNavigate } from 'react-router';

function CtaSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="mt-12 rounded-[48px] p-14 bg-linear-to-r from-[#0F172A] via-[#142244] to-[#0F172A] text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to take control of your finances?
      </h2>
      <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
        Join thousands of users who have optimized their savings and reached their goals with FinVue.
      </p>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold shadow-lg"
        >
          Get Started for Free
        </button>
        <span className="text-gray-400 text-sm">
          No credit card required
        </span>
      </div>
    </div>
  );
}

export default CtaSection