import { useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.theme ?? "light",
  );
  return (
    <div className={`form-switch flex flex-col justify-center ${className}`}>
      <input
        id="light-switch"
        type="checkbox"
        name="light-switch"
        className="light-switch sr-only"
        checked={theme === "dark"}
        onLoad={() => {
          console.log("onload", theme);
        }}
        onChange={() => {
          if (theme === "light" || theme === undefined) {
            window.document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            return setTheme("dark");
          } else {
            window.document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            return setTheme("light");
          }
        }}
      />
      <label className="relative" htmlFor="light-switch">
        <span
          className="relative z-10 bg-gradient-to-t from-blue-100 to-white shadow-sm dark:from-gray-800 dark:to-gray-700"
          aria-hidden="true"
        ></span>
        <svg
          className="absolute inset-0"
          width="44"
          height="24"
          viewBox="0 0 44 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            className="fill-current text-white"
            fillRule="nonzero"
            opacity=".88"
          >
            <path d="M32 8a.5.5 0 00.5-.5v-1a.5.5 0 10-1 0v1a.5.5 0 00.5.5zM35.182 9.318a.5.5 0 00.354-.147l.707-.707a.5.5 0 00-.707-.707l-.707.707a.5.5 0 00.353.854zM37.5 11.5h-1a.5.5 0 100 1h1a.5.5 0 100-1zM35.536 14.829a.5.5 0 00-.707.707l.707.707a.5.5 0 00.707-.707l-.707-.707zM32 16a.5.5 0 00-.5.5v1a.5.5 0 101 0v-1a.5.5 0 00-.5-.5zM28.464 14.829l-.707.707a.5.5 0 00.707.707l.707-.707a.5.5 0 00-.707-.707zM28 12a.5.5 0 00-.5-.5h-1a.5.5 0 100 1h1a.5.5 0 00.5-.5zM28.464 9.171a.5.5 0 00.707-.707l-.707-.707a.5.5 0 00-.707.707l.707.707z" />
            <circle cx="32" cy="12" r="3" />
            <circle fillOpacity=".4" cx="12" cy="12" r="6" />
            <circle fillOpacity=".88" cx="12" cy="12" r="3" />
          </g>
        </svg>
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
}
