import React from "react";

const settings = () => {
  const [isChecked, setIsChecked] = React.useState(true);
  const [isRadioChecked, setIsRadioChecked] = React.useState(true);
  return (
    <>
      <div
        id="settings"
        className="page-section bg-gray-50 dark:bg-gray-900 py-8 min-h-screen"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Settings
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Customize your contest tracking experience
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav
                className="flex overflow-x-auto whitespace-nowrap"
                aria-label="Tabs"
              >
                <button
                  className="py-4 px-6 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 font-medium text-sm"
                  aria-current="page"
                >
                  General
                </button>
                <button className="py-4 px-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm">
                  Notifications
                </button>
                <button className="py-4 px-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm">
                  Appearance
                </button>
                <button className="py-4 px-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm">
                  Data & Privacy
                </button>
                <button className="py-4 px-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm">
                  Advanced
                </button>
              </nav>
            </div>

            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Theme
                </h3>
                <div className="flex items-center">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      id="theme-toggle"
                      className="sr-only peer"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Dark Mode
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Light Mode
                      </span>
                      <div className="w-4 h-4 rounded-full border border-gray-400 dark:border-gray-600"></div>
                    </div>
                    <div className="h-20 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center">
                      <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-900 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors relative">
                    <div className="absolute -top-1 -right-1 bg-indigo-600 rounded-full w-5 h-5 flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-white">
                        Dark Mode
                      </span>
                      <div className="w-4 h-4 rounded-full border border-gray-600 bg-indigo-600"></div>
                    </div>
                    <div className="h-20 bg-gray-800 rounded-md border border-gray-700 flex items-center justify-center">
                      <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Default View
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="default-upcoming"
                      name="default-view"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="default-upcoming"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Upcoming Contests
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-past"
                      name="default-view"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="default-past"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Past Contests
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-bookmarks"
                      name="default-view"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="default-bookmarks"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Bookmarked Contests
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Default Platform Filters
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Select which platforms to show by default when you open the
                  app
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="platform-all"
                      name="platform-default"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="platform-all"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      All Platforms
                    </label>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="platform-custom"
                        name="platform-default"
                        type="radio"
                        checked={isRadioChecked}
                        onChange={(e) => setIsRadioChecked(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="platform-custom"
                        className="font-medium text-gray-700 dark:text-gray-300"
                      >
                        Custom Selection
                      </label>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center">
                          <input
                            id="codeforces"
                            name="codeforces"
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                            disabled
                          />
                          <label
                            htmlFor="codeforces"
                            className="ml-3 block text-sm font-medium text-gray-500 dark:text-gray-400"
                          >
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                              Codeforces
                            </div>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="leetcode"
                            name="leetcode"
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                            disabled
                          />
                          <label
                            htmlFor="leetcode"
                            className="ml-3 block text-sm font-medium text-gray-500 dark:text-gray-400"
                          >
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                              LeetCode
                            </div>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="codechef"
                            name="codechef"
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                            disabled
                          />
                          <label
                            htmlFor="codechef"
                            className="ml-3 block text-sm font-medium text-gray-500 dark:text-gray-400"
                          >
                            <div className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                              CodeChef
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Time Format
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="time-24"
                      name="time-format"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="time-24"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      24-hour (14:30)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="time-12"
                      name="time-format"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="time-12"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      12-hour (2:30 PM)
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Timezone
                </h3>
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  <div className="flex items-center">
                    <input
                      id="timezone-local"
                      name="timezone"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="timezone-local"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Use local timezone
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="timezone-custom"
                      name="timezone"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="timezone-custom"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Specify timezone
                    </label>
                  </div>
                  <div className="relative flex-grow">
                    <select
                      id="timezone-select"
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed"
                      disabled
                    >
                      <option>UTC (Coordinated Universal Time)</option>
                      <option>America/New_York (Eastern Time)</option>
                      <option>America/Chicago (Central Time)</option>
                      <option>America/Denver (Mountain Time)</option>
                      <option>America/Los_Angeles (Pacific Time)</option>
                      <option>Asia/Kolkata (India Standard Time)</option>
                      <option>Europe/London (British Time)</option>
                      <option>Europe/Paris (Central European Time)</option>
                    </select>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Your current local time:{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    May 12, 2023 10:30:45
                  </span>
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Date Format
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="date-mdy"
                      name="date-format"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                      checked
                    />
                    <label
                      htmlFor="date-mdy"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      MM/DD/YYYY (05/12/2023)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="date-dmy"
                      name="date-format"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="date-dmy"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      DD/MM/YYYY (12/05/2023)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="date-ymd"
                      name="date-format"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="date-ymd"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      YYYY-MM-DD (2023-05-12)
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Contest Duration Display
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="duration-hours"
                      name="duration-format"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                      checked
                    />
                    <label
                      htmlFor="duration-hours"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Hours and minutes (2 hours 30 minutes)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="duration-decimal"
                      name="duration-format"
                      type="radio"
                      checked={isRadioChecked}
                      onChange={(e) => setIsRadioChecked(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-700"
                    />
                    <label
                      htmlFor="duration-decimal"
                      className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Decimal hours (2.5 hours)
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Data Refresh Settings
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Auto-refresh contest data
                  </span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      id="auto-refresh"
                      className="sr-only peer"
                      checked
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="refresh-interval"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Refresh interval
                  </label>
                  <select
                    defaultValue="1 hour"
                    id="refresh-interval"
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option>5 minutes</option>
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>3 hours</option>
                    <option>6 hours</option>
                  </select>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Reset to Defaults
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <svg
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Accessibility
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Reduce animations
                  </span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      id="reduce-animations"
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    High contrast mode
                  </span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      id="high-contrast"
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <svg
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Notifications
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Contest reminders
                  </span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      id="contest-reminders"
                      className="sr-only peer"
                      checked
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Solution notifications
                  </span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      id="solution-notifications"
                      className="sr-only peer"
                      checked
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <svg
                  className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Privacy
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Save contest history
                  </span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      id="save-history"
                      className="sr-only peer"
                      checked
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Usage analytics
                  </span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      id="usage-analytics"
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Account Actions
            </h3>
            <div className="space-y-4">
              <div>
                <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Export Your Data
                </button>
              </div>
              <div>
                <button className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Clear All Bookmarks
                </button>
              </div>
              <div>
                <button className="w-full flex justify-center py-2 px-4 border border-red-300 dark:border-red-900 rounded-md shadow-sm text-sm font-medium text-red-700 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                  Delete Account Data
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              About Code Contest Tracker
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Version: 1.0.0</p>
              <p>&copy; 2023 Contest Tracker Team</p>
              <div className="pt-2">
                <a
                  href="#"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  Privacy Policy
                </a>
                <span className="mx-2">•</span>
                <a
                  href="#"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  Terms of Service
                </a>
                <span className="mx-2">•</span>
                <a
                  href="#"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default settings;
