import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../contexts/useTheme";

function ThemePreviewCard({ preview }) {
  return (
    <div
      className="w-14 h-10 rounded-lg border border-black/10 p-1.5 shrink-0"
      style={{ backgroundColor: preview.bg }}
    >
      <div
        className="w-full h-full rounded-md p-1 flex flex-col justify-between"
        style={{ backgroundColor: preview.surface }}
      >
        <div className="flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: preview.primary }}
          />
          <span
            className="h-1 rounded-full w-6 opacity-80"
            style={{ backgroundColor: preview.text }}
          />
        </div>

        <div className="space-y-1">
          <div
            className="h-1.5 rounded-full w-full opacity-90"
            style={{ backgroundColor: preview.text }}
          />
          <div
            className="h-1.5 rounded-full w-3/5"
            style={{ backgroundColor: preview.primary }}
          />
        </div>
      </div>
    </div>
  );
}

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef(null);
  const [openUp, setOpenUp] = useState(false);

  const themes = [
    {
      name: "light",
      preview: {
        bg: "#f8fafc",
        surface: "#ffffff",
        primary: "#22c55e",
        text: "#0f172a",
      },
    },
    // {
    //   name: "retro",
    //   preview: {
    //     bg: "#e4d8b4",
    //     surface: "#f4ebd0",
    //     primary: "#ef9995",
    //     text: "#7d7259",
    //   },
    // },
    // {
    //   name: "cyberpunk",
    //   preview: {
    //     bg: "#1a103d",
    //     surface: "#2a145e",
    //     primary: "#ff7598",
    //     text: "#fcee09",
    //   },
    // },
    {
      name: "valentine",
      preview: {
        bg: "#fdf2f4",
        surface: "#ffffff",
        primary: "#e96d7b",
        text: "#7c2d3a",
      },
    },
    // {
    //   name: "aqua",
    //   preview: {
    //     bg: "#162033",
    //     surface: "#1f2a44",
    //     primary: "#09ecf3",
    //     text: "#e0fbff",
    //   },
    // },
    // {
    //   name: "synthwave",
    //   preview: {
    //     bg: "#241b47",
    //     surface: "#2d1b69",
    //     primary: "#e779c1",
    //     text: "#58c7f3",
    //   },
    // },
    // {
    //   name: "coffee",
    //   preview: {
    //     bg: "#20161f",
    //     surface: "#2a1f29",
    //     primary: "#ddb787",
    //     text: "#f5e9dc",
    //   },
    // },
    // {
    //   name: "luxury",
    //   preview: {
    //     bg: "#171618",
    //     surface: "#1f1e21",
    //     primary: "#dca54c",
    //     text: "#f5f5f5",
    //   },
    // },
    // {
    //   name: "mint-ice-cream",
    //   preview: {
    //     bg: "#ecfdf5",
    //     surface: "#d2f4ea",
    //     primary: "#6ee7b7",
    //     text: "#134e4a",
    //   },
    // },
  ];

  const checkDropdownPosition = () => {
    if (!dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const estimatedMenuHeight = 360;

    setOpenUp(spaceBelow < estimatedMenuHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", checkDropdownPosition);
    window.addEventListener("scroll", checkDropdownPosition);

    return () => {
      window.removeEventListener("resize", checkDropdownPosition);
      window.removeEventListener("scroll", checkDropdownPosition);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${openUp ? "dropdown-top" : ""}`}
    >
      <div
        tabIndex={0}
        role="button"
        className="h-11 min-w-55 px-4 rounded-xl border border-base-300 bg-base-100 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer"
        onClick={checkDropdownPosition}
      >
        <div className="min-w-0">
          <p className="text-xs text-gray-500 leading-none">Theme</p>
          <p className="text-sm font-medium truncate capitalize">{theme}</p>
        </div>

        <svg
          width="12"
          height="12"
          className="shrink-0 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content mt-2 bg-base-100 rounded-2xl z-20 w-80 p-2 shadow-2xl border border-base-300 max-h-80 overflow-y-auto"
      >
        <div className="px-3 pt-2 pb-2 text-xs uppercase tracking-wide text-gray-400">
          Choose theme
        </div>

        {themes.map((t) => (
          <li key={t.name}>
            <button
              onClick={() => setTheme(t.name)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm transition-all duration-150 ${
                theme === t.name
                  ? "bg-green-500 text-white shadow-sm"
                  : "hover:bg-base-200 text-base-content"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <ThemePreviewCard preview={t.preview} />
                <span className="truncate capitalize font-medium">{t.name}</span>
              </div>

              {theme === t.name && (
                <span className="text-xs font-semibold opacity-90 shrink-0">
                  Active
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;