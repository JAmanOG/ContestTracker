import React from "react";

const adminPanel = () => {
    const [isChecked, setIsChecked] = React.useState(false);
  return (
    <>
      <div
        id="adminPanel"
        className="page-section bg-gray-50 dark:bg-gray-900 py-8 min-h-screen"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  Admin Panel
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage contest solutions and YouTube video links
                </p>
              </div>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  <span className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2"></span>
                  Admin Access
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
              <li className="mr-2">
                <a
                  href="#"
                  className="inline-block p-4 border-b-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-500 rounded-t-lg active"
                  aria-current="page"
                >
                  Add Solution Links
                </a>
              </li>
              <li className="mr-2">
                <a
                  href="#"
                  className="inline-block p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 rounded-t-lg"
                >
                  Automated Solutions
                </a>
              </li>
              <li className="mr-2">
                <a
                  href="#"
                  className="inline-block p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 rounded-t-lg"
                >
                  Manage Contests
                </a>
              </li>
              <li className="mr-2">
                <a
                  href="#"
                  className="inline-block p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 rounded-t-lg"
                >
                  User Statistics
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Add Solution Link
            </h3>
            <form>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="platform"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Platform
                  </label>
                  <select
                    id="platform"
                    name="platform"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a platform</option>
                    <option value="codeforces">Codeforces</option>
                    <option value="codechef">CodeChef</option>
                    <option value="leetcode">LeetCode</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contest"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Contest
                  </label>
                  <select
                    id="contest"
                    name="contest"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a contest</option>
                    <option value="contest1">
                      Codeforces Round #889 (Div. 2)
                    </option>
                    <option value="contest2">
                      Educational Codeforces Round 166
                    </option>
                    <option value="contest3">
                      CodeChef April Long Challenge 2023
                    </option>
                    <option value="contest4">
                      LeetCode Weekly Contest 343
                    </option>
                    <option value="contest5">
                      LeetCode Biweekly Contest 102
                    </option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="youtube_link"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    YouTube Solution Link
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                      https://youtube.com/watch?v=
                    </span>
                    <input
                      type="text"
                      id="youtube_link"
                      name="youtube_link"
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter video ID"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Enter the full YouTube URL or just the video ID
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="solution_date"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Solution Date
                  </label>
                  <input
                    type="date"
                    id="solution_date"
                    name="solution_date"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="video_title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Video Title (Optional)
                  </label>
                  <input
                    type="text"
                    id="video_title"
                    name="video_title"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Custom video title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Any additional information about this solution"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Add Solution Link
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              YouTube Solution Playlists
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-red-500 text-white p-3">
                  <h4 className="font-medium">Codeforces Solutions</h4>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      24 videos
                    </span>
                    <a
                      href="#"
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View All
                    </a>
                  </div>
                  <a
                    href="#"
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Codeforces PCDs
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Open YouTube Playlist
                      </p>
                    </div>
                  </a>
                  <div className="mt-3">
                    <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm transition-colors">
                      Sync with YouTube
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-yellow-500 text-white p-3">
                  <h4 className="font-medium">LeetCode Solutions</h4>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      37 videos
                    </span>
                    <a
                      href="#"
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View All
                    </a>
                  </div>
                  <a
                    href="#"
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        LeetCode PCDs
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Open YouTube Playlist
                      </p>
                    </div>
                  </a>
                  <div className="mt-3">
                    <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm transition-colors">
                      Sync with YouTube
                    </button>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-green-500 text-white p-3">
                  <h4 className="font-medium">CodeChef Solutions</h4>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      19 videos
                    </span>
                    <a
                      href="#"
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View All
                    </a>
                  </div>
                  <a
                    href="#"
                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        CodeChef PCDs
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Open YouTube Playlist
                      </p>
                    </div>
                  </a>
                  <div className="mt-3">
                    <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm transition-colors">
                      Sync with YouTube
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Recently Added Solution Links
              </h3>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View All
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Date Added
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Platform
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Contest
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Solution Link
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Added By
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      May 10, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Codeforces
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        Educational Codeforces Round 166
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm"
                      >
                        https://youtu.be/AbCdEfG123
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      admin@example.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Edit
                      </button>
                      <button className="ml-3 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        Delete
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      May 8, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          LeetCode
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        Weekly Contest 344
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm"
                      >
                        https://youtu.be/XyzJkLm456
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      editor@example.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Edit
                      </button>
                      <button className="ml-3 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        Delete
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      May 5, 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          CodeChef
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        April Long Challenge 2023
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm"
                      >
                        https://youtu.be/PqrStu789
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      admin@example.com
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Edit
                      </button>
                      <button className="ml-3 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300">
                  Automated YouTube Integration
                </h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  Configure automatic fetching of solution videos
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <svg
                    className="-ml-0.5 mr-1.5 h-2 w-2 text-green-600 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  Enabled
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                  YouTube API Settings
                </h4>
                <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center mb-3">
                    <svg
                      className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      API Key: ••••••••••••••••
                    </span>
                  </div>
                  <div className="space-y-2">
                    <button className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 py-1 px-2 rounded">
                      Update API Key
                    </button>
                    <button className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 py-1 px-2 rounded ml-2">
                      Test Connection
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                  Sync Schedule
                </h4>
                <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      Auto-sync frequency:
                    </span>
                    <select className="text-xs border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-1 px-2">
                      <option>Every 6 hours</option>
                      <option>Every 12 hours</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Last sync: May 12, 2023 at 09:45 AM
                  </div>
                  <button className="mt-3 w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded transition-colors">
                    Run Manual Sync Now
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                Video Matching Rules
              </h4>
              <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-indigo-200 dark:border-indigo-800">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="rule1"
                        name="rule1"
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="rule1"
                        className="font-medium text-gray-700 dark:text-gray-200"
                      >
                        Match by contest name in video title
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        E.g., "LeetCode Weekly Contest 344 Solutions"
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="rule2"
                        name="rule2"
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="rule2"
                        className="font-medium text-gray-700 dark:text-gray-200"
                      >
                        Match by contest date in video description
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        Look for date patterns that match the contest date
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="rule3"
                        name="rule3"
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="rule3"
                        className="font-medium text-gray-700 dark:text-gray-200"
                      >
                        Use machine learning to identify solution videos
                      </label>
                      <p className="text-gray-500 dark:text-gray-400">
                        Advanced NLP to analyze video content (Beta)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default adminPanel;
