import React, { useState, useEffect } from "react";

const PastContests = ({ contests }) => {
  const [filteredPlatform, setFilteredPlatform] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [solutions, setSolutions] = useState({});
  const [loadingSolution, setLoadingSolution] = useState(null);

  const getSolution = async (platform, contestName, contestId) => {
    try {
      // Set loading state for the specific contest
      setLoadingSolution(contestId);
  
      const response = await fetch(
        `${import.meta.env.VITE_URl}/api/contestSolution`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ platform, searchQuery: contestName }),
        }
      );
  
      const data = await response.json();
      console.log("Solution data:", data);
  
      // Fix: Handle both array and direct object responses
      if (data) {
        // If data is an array
        if (Array.isArray(data) && data.length > 0) {
          setSolutions((prev) => ({
            ...prev,
            [contestId]: data[0],
          }));
          
          if (data[0].url) {
            window.open(data[0].url, "_blank");
          }
        } 
        // If data is a direct object with url
        else if (data.url) {
          setSolutions((prev) => ({
            ...prev,
            [contestId]: data,
          }));
          
          window.open(data.url, "_blank");
        }
        // No valid solution found
        else {
          setSolutions((prev) => ({
            ...prev,
            [contestId]: null,
          }));
        }
      } else {
        // No data returned
        setSolutions((prev) => ({
          ...prev,
          [contestId]: null,
        }));
      }
    } catch (error) {
      console.error("Error fetching solution:", error);
      // Store null solution to indicate no solution was found
      setSolutions((prev) => ({
        ...prev,
        [contestId]: null,
      }));
    } finally {
      setLoadingSolution(null);
    }
  };

  console.log("Solution:", solutions);
  // Get past contests data
  const getPastContests = () => {
    const allPastContests = [];

    // Process CodeChef past contests
    if (contests?.codechef?.past) {
      contests.codechef.past.forEach((contest) => {
        allPastContests.push({
          platform: "codechef",
          name: contest.name,
          code: contest.code,
          startDate: contest.start,
          duration: contest.duration,
          participants: contest.Participants,
          url: `https://www.codechef.com/${contest.code}`,
          color: "bg-green-500",
        });
      });
    }

    // Process CodeForces finished contests
    if (contests?.codeforces?.contests?.finished) {
      const sortedFinished = [...contests.codeforces?.contests?.finished]
        .sort((a, b) => b.startTimeSeconds - a.startTimeSeconds)
        .slice(0, 100);

      sortedFinished.forEach((contest) => {
        const durationHours = Math.floor(contest.durationSeconds / 3600);
        const durationMinutes = Math.floor(
          (contest.durationSeconds % 3600) / 60
        );
        const duration =
          durationHours > 0
            ? `${durationHours} ${durationHours === 1 ? "hour" : "hours"}`
            : `${durationMinutes} minutes`;

        const startDate = new Date(
          contest.startTimeSeconds * 1000
        ).toLocaleDateString();

        allPastContests.push({
          platform: "codeforces",
          name: contest.name,
          id: contest.id,
          type: contest.type,
          startDate: startDate,
          duration: duration,
          url: `https://codeforces.com/contest/${contest.id}`,
          color: "bg-red-500",
        });
      });
    }

    // Process LeetCode past contests
    if (contests?.pastleetcode?.objects) {
      contests.pastleetcode.objects.forEach((contest) => {
        const durationHours = Math.floor(contest.duration / 3600);
        const durationMinutes = Math.floor((contest.duration % 3600) / 60);
        const duration =
          durationHours >= 1
            ? `${durationHours} ${durationHours === 1 ? "hour" : "hours"}`
            : `${durationMinutes} minutes`;

        allPastContests.push({
          platform: "leetcode",
          name: contest.event,
          startDate: new Date(contest.start).toLocaleDateString(),
          endDate: new Date(contest.end).toLocaleDateString(),
          duration: duration,
          problemCount: contest.n_problems,
          participants: contest.n_statistics,
          url: contest.href,
          color: "bg-yellow-500",
        });
      });
    }

    // Sort contests by start date (most recent first)
    allPastContests.sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate);
    });

    return allPastContests;
  };

  const allPastContests = getPastContests();

  // Apply filters
  const getFilteredContests = () => {
    let filtered = [...allPastContests];

    // Filter by platform
    if (filteredPlatform !== "all") {
      filtered = filtered.filter(
        (contest) => contest.platform === filteredPlatform
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((contest) =>
        contest.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by date
    if (dateFilter !== "all") {
      const now = new Date();
      let dateLimit;

      switch (dateFilter) {
        case "week":
          dateLimit = new Date(now.setDate(now.getDate() - 7));
          break;
        case "month":
          dateLimit = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case "3months":
          dateLimit = new Date(now.setMonth(now.getMonth() - 3));
          break;
        case "year":
          dateLimit = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          dateLimit = null;
      }

      if (dateLimit) {
        filtered = filtered.filter(
          (contest) => new Date(contest.startDate) >= dateLimit
        );
      }
    }

    // Sort contests
    if (sortBy === "platform") {
      filtered.sort((a, b) => a.platform.localeCompare(b.platform));
    } else if (sortBy === "duration") {
      filtered.sort((a, b) => {
        // Extract hours for comparison
        const getHours = (duration) => {
          const match = duration.match(/(\d+)\s*hour/);
          return match ? parseInt(match[1]) : 0;
        };
        return getHours(b.duration) - getHours(a.duration);
      });
    } else {
      // Default sort by date (most recent first)
      filtered.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    }

    return filtered;
  };

  const filteredContests = getFilteredContests();

  // Pagination
  const totalPages = Math.ceil(filteredContests.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContests = filteredContests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Get platform name
  const getPlatformName = (platform) => {
    switch (platform) {
      case "codeforces":
        return "Codeforces";
      case "codechef":
        return "CodeChef";
      case "leetcode":
        return "LeetCode";
      default:
        return platform;
    }
  };

  return (
    <>
      <section
        id="past"
        className="page-section bg-gray-50 dark:bg-gray-900 py-8 min-h-screen"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Past Contests
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Review previous competitive programming contests and access
              solutions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Filter Past Contests
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-4 py-2 ${
                    filteredPlatform === "codeforces"
                      ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  } rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center gap-1`}
                  onClick={() =>
                    setFilteredPlatform(
                      filteredPlatform === "codeforces" ? "all" : "codeforces"
                    )
                  }
                >
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  Codeforces
                </button>
                <button
                  className={`px-4 py-2 ${
                    filteredPlatform === "codechef"
                      ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  } rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center gap-1`}
                  onClick={() =>
                    setFilteredPlatform(
                      filteredPlatform === "codechef" ? "all" : "codechef"
                    )
                  }
                >
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  CodeChef
                </button>
                <button
                  className={`px-4 py-2 ${
                    filteredPlatform === "leetcode"
                      ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  } rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center gap-1`}
                  onClick={() =>
                    setFilteredPlatform(
                      filteredPlatform === "leetcode" ? "all" : "leetcode"
                    )
                  }
                >
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  LeetCode
                </button>
                <button
                  className={`px-4 py-2 ${
                    filteredPlatform === "all"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  } rounded-md hover:bg-indigo-700 transition-colors`}
                  onClick={() => setFilteredPlatform("all")}
                >
                  All Platforms
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search past contests..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">Filter by Date</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="year">Last Year</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="platform">Sort by Platform</option>
                <option value="duration">Sort by Duration</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
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
                    Contest Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Solution
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentContests.length > 0 ? (
                  currentContests.map((contest, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`h-4 w-4 rounded-full ${contest.color} mr-2`}
                          ></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {getPlatformName(contest.platform)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {contest.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {contest.startDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {contest.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {solutions[
                          contest.id || `${contest.platform}-${contest.name}`
                        ] &&
                        solutions[
                          contest.id || `${contest.platform}-${contest.name}`
                        ].url ? (
                            
                          <a
                            href={
                              solutions[
                                contest.id ||
                                  `${contest.platform}-${contest.name}`
                              ].url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center px-3 py-1 ${
                              contest.platform === "codeforces"
                                ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                                : contest.platform === "leetcode"
                                ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                                : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                            } rounded-md text-sm`}
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                            </svg>
                            Watch Solution
                          </a>
                        ) : (
                          <button
                            onClick={() =>
                              getSolution(
                                contest.platform,
                                contest.name,
                                contest.id ||
                                  `${contest.platform}-${contest.name}`
                              )
                            }
                            disabled={
                              loadingSolution ===
                              (contest.id ||
                                `${contest.platform}-${contest.name}`)
                            }
                            className={`inline-flex items-center px-3 py-1 ${
                              contest.platform === "codeforces"
                                ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                                : contest.platform === "leetcode"
                                ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                                : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                            } rounded-md text-sm`}
                          >
                            {loadingSolution ===
                            (contest.id ||
                              `${contest.platform}-${contest.name}`) ? (
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            ) : (
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                <path
                                  fillRule="evenodd"
                                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            )}
                            {solutions[
                              contest.id ||
                                `${contest.platform}-${contest.name}`
                            ] === null
                              ? "No Solution"
                              : "View Solution"}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href={contest.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 mr-3"
                        >
                          View Contest
                        </a>
                        <button className="text-yellow-500 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-200">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      No past contests found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Previous
                </button>

                {/* First page */}
                {currentPage > 2 && (
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    1
                  </button>
                )}

                {/* Ellipsis */}
                {currentPage > 3 && (
                  <span className="px-3 py-2 text-gray-500 dark:text-gray-400">
                    ...
                  </span>
                )}

                {/* Current page and surrounding pages */}
                {[...Array(Math.min(3, totalPages))].map((_, i) => {
                  const pageNumber = currentPage - 1 + i;
                  if (pageNumber > 0 && pageNumber <= totalPages) {
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          pageNumber === currentPage
                            ? "bg-indigo-600 text-white"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  return null;
                })}

                {/* Ellipsis */}
                {currentPage < totalPages - 2 && (
                  <span className="px-3 py-2 text-gray-500 dark:text-gray-400">
                    ...
                  </span>
                )}

                {/* Last page */}
                {currentPage < totalPages - 1 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Next
                </button>
              </nav>
            </div>
          )}

          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg shadow-md p-6 mt-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">
                  Access Problem Solutions
                </h3>
                <p className="text-indigo-600 dark:text-indigo-400">
                  Watch our YouTube tutorials for detailed explanations of
                  contest problems
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.youtube.com/playlist?list=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md inline-flex items-center transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                  LeetCode Solutions
                </a>
                <a
                  href="https://www.youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md inline-flex items-center transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                  Codeforces Solutions
                </a>
                <a
                  href="https://www.youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md inline-flex items-center transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                  CodeChef Solutions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PastContests;
