import React from "react";

const Header = () => {
  return (
    <div
      id="header"
      className="bg-white dark:bg-neutral-800 border-r border-neutral-200/20 dark:border-neutral-700/20 w-64 h-screen flex-shrink-0 hidden lg:block"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-neutral-200/20 dark:border-neutral-700/20">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600 dark:text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xl font-bold">Contest Tracker</span>
          </div>
        </div>

        <ul className="py-4 flex-1 overflow-y-auto">
          <li>
            <a
              href="#upcoming"
              className="flex items-center px-4 py-3 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-r-4 border-blue-600 dark:border-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              Upcoming Contests
            </a>
          </li>
          <li>
            <a
              href="#past"
              className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700/30 transition duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              Past Contests
            </a>
          </li>
          <li>
            <a
              href="#bookmarks"
              className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700/30 transition duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              Bookmarked
            </a>
          </li>
          <li>
            <a
              href="#solutions"
              className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700/30 transition duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              Contest Solutions
            </a>
          </li>
          <li>
            <a
              href="#admin"
              className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700/30 transition duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
              Admin Panel
            </a>
          </li>
        </ul>

        <div className="mt-auto border-t border-neutral-200/20 dark:border-neutral-700/20 p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Dark Mode</span>
            <button
              id="theme-toggle"
              className="w-12 h-6 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center transition duration-300 focus:outline-none shadow"
            >
              <div
                id="theme-toggle-dot"
                className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-0 dark:translate-x-6 transition duration-300"
              ></div>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://placehold.co/100x100?text=User"
                alt="User avatar"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                john@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
