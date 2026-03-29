import { useTheme } from "../../contexts/useTheme";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    "light",
    "retro",
    "cyberpunk",
    "valentine",
    "aqua",
    "synthwave",
    "coffee",
    "luxury",
    "mint-ice-cream",
  ];

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn h-11">
        Theme: {theme}
        <svg
          width="12px"
          height="12px"
          className="inline-block ml-2 h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl max-h-72 overflow-y-auto"
      >
        {themes.map((t) => (
          <li key={t}>
            <button
              onClick={() => setTheme(t)}
              className={`btn btn-sm btn-block m-1 justify-start ${
                theme === t ? "btn-active" : "btn-ghost"
              }`}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;