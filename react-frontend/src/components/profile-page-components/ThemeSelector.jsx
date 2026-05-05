import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../contexts/useTheme";

function ThemePreviewCard({ preview }) {
  return (
    <div
      className="h-10 w-14 shrink-0 rounded-lg border border-black/10 p-1.5"
      style={{ backgroundColor: preview.bg }}
    >
      <div
        className="flex h-full w-full flex-col justify-between rounded-md p-1"
        style={{ backgroundColor: preview.surface }}
      >
        <div className="flex items-center gap-1">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: preview.primary }}
          />
          <span
            className="h-1 w-6 rounded-full opacity-80"
            style={{ backgroundColor: preview.text }}
          />
        </div>

        <div className="space-y-1">
          <div
            className="h-1.5 w-full rounded-full opacity-90"
            style={{ backgroundColor: preview.text }}
          />
          <div
            className="h-1.5 w-3/5 rounded-full"
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
    {
      name: "valentine",
      preview: {
        bg: "#fdf2f4",
        surface: "#ffffff",
        primary: "#e96d7b",
        text: "#7c2d3a",
      },
    },
  ];

  const checkDropdownPosition = () => {
    if (!dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const estimatedMenuHeight = 260;

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
    <div ref={dropdownRef} className={`dropdown ${openUp ? "dropdown-top" : ""}`}>
      <div
        tabIndex={0}
        role="button"
        className="flex h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-base-300 bg-base-100 px-4 shadow-sm transition-all duration-200 hover:shadow-md sm:min-w-55"
        onClick={checkDropdownPosition}
      >
        <div className="min-w-0">
          <p className="text-xs leading-none text-gray-500">Theme</p>
          <p className="truncate text-sm font-medium capitalize">{theme}</p>
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
        className="dropdown-content z-50 mt-2 max-h-80 w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl sm:w-80"
      >
        <div className="px-3 pb-2 pt-2 text-xs uppercase tracking-wide text-gray-400">
          Choose theme
        </div>

        {themes.map((t) => (
          <li key={t.name}>
            <button
              onClick={() => setTheme(t.name)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm transition-all duration-150 ${
                theme === t.name
                  ? "bg-green-500 text-white shadow-sm"
                  : "text-base-content hover:bg-base-200"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <ThemePreviewCard preview={t.preview} />
                <span className="truncate font-medium capitalize">{t.name}</span>
              </div>

              {theme === t.name && (
                <span className="shrink-0 text-xs font-semibold opacity-90">
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