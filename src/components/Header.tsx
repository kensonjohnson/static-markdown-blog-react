import { useState } from "react";
import { Menu, Xmark } from "iconoir-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header({
  setSelectedPost,
}: {
  setSelectedPost: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const onHomePage = searchParams.has("slug") === false;

  function resetPostView() {
    window.history.pushState(null, "", "/");
    setSelectedPost("home");
  }
  return (
    <header className="bg-zinc-100 shadow dark:bg-zinc-900">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 md:px-8"
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <h2 className="text-5xl">.md Blog</h2>
          </a>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:flex md:gap-x-12">
          {!onHomePage && (
            <button
              onClick={resetPostView}
              className="text-lg font-semibold text-gray-900 underline dark:text-white"
            >
              Back to All Posts
            </button>
          )}
        </div>
        <div className="hidden md:flex md:flex-1 md:justify-end">
          <ThemeToggle />
        </div>
      </nav>
      <dialog
        className="md:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-10" />
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-gray-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-white/10">
          <div className="flex items-center justify-between">
            <ThemeToggle />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <Xmark className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/25">
              <div className="space-y-2 py-6">
                <button
                  className="text-lg font-semibold text-gray-900 underline dark:text-white"
                  onClick={resetPostView}
                >
                  Back to All Posts
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </header>
  );
}
