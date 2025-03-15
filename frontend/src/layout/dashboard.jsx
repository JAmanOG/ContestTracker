import React, { useState, useEffect } from "react";

const Dashboard = ({ contests }) => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filteredPlatform, setFilteredPlatform] = useState("all");
  const [timeLeft, setTimeLeft] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [bookmarks, setBookmarks] = useState({});

  //   console.log(contests);
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem("contestBookmarks");
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error("Error loading bookmarks:", error);
    }
  }, []);

  //   Setup countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft({}); 
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleBookmark = (contest) => {
    try {
      // Create a copy of bookmarks
      const updatedBookmarks = { ...bookmarks };

      const bookmarkId = `${contest.platform}-${contest.name.replace(
        /\s+/g,
        "-"
      )}`;

      if (updatedBookmarks[bookmarkId]) {
        delete updatedBookmarks[bookmarkId];
      } else {
        const bookmarkedContest = {
          ...contest,
          bookmarkedAt: new Date().toISOString(),
          startTime: contest.startDate,
        };

        updatedBookmarks[bookmarkId] = bookmarkedContest;
      }

      // Save to state and localStorage
      setBookmarks(updatedBookmarks);
      localStorage.setItem(
        "contestBookmarks",
        JSON.stringify(updatedBookmarks)
      );
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const isBookmarked = (contest) => {
    const bookmarkId = `${contest.platform}-${contest.name.replace(
      /\s+/g,
      "-"
    )}`;
    return !!bookmarks[bookmarkId];
  };

  // Get upcoming contests for dashboard display (show top 3)
  const getUpcomingContests = () => {
    const allContests = [];

    // Process CodeChef contests
    if (contests?.codechef?.upcoming) {
      console.log(contests.codechef.upcoming);
      contests.codechef.upcoming.forEach((contest) => {
        allContests.push({
          platform: "codechef",
          name: contest.name,
          code: contest.code,
          startDate: contest.start,
          duration: contest.duration,
          startsIn: {
            days: parseInt(contest.startsInDays?.split(" ")[0]) || 0,
            hours: parseInt(contest.startsInHours?.split(" ")[0]) || 0,
            minutes: 0,
            seconds: 0,
          },
          url: `https://www.codechef.com/contests/${contest.code}`,
          color: "bg-green-500",
        });
      });
    }

    console.log(contests?.codeforces?.contests?.upcoming);
    // Process CodeForces contests
    if (contests?.codeforces?.contests?.upcoming) {
      contests.codeforces?.contests?.upcoming.forEach((contest) => {
        const totalSeconds = contest.relativeTimeSeconds * -1;
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        const durationHours = Math.floor(contest.durationSeconds / 3600);
        const duration = `${durationHours} ${
          durationHours === 1 ? "hour" : "hours"
        }`;

        const startDate = new Date(
          contest.startTimeSeconds * 1000
        ).toLocaleDateString();

        allContests.push({
          platform: "codeforces",
          name: contest.name,
          type: contest.type,
          startDate: startDate,
          duration: duration,
          startsIn: { days, hours, minutes, seconds: 0 },
          url: `https://codeforces.com/contests/${contest.id}`,
          color: "bg-red-500",
        });
      });
    }

    // Process LeetCode contests
    if (contests?.leetcode?.objects) {
      contests.leetcode.objects.forEach((contest) => {
        const startTime = new Date(contest.start);
        const now = new Date();
        const diff = startTime - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

          const durationHours = contest.duration / 3600;
          const duration = `${durationHours} ${
            durationHours === 1 ? "hour" : "hours"
          }`;

          allContests.push({
            platform: "leetcode",
            name: contest.event,
            startDate: new Date(contest.start).toLocaleDateString(),
            duration: duration,
            startsIn: { days, hours, minutes, seconds: 0 },
            url: contest.href,
            color: "bg-yellow-500",
          });
        }
      });
    }

    // Sort contests by start time
    allContests.sort((a, b) => {
      return (
        a.startsIn.days * 86400 +
        a.startsIn.hours * 3600 +
        a.startsIn.minutes * 60 -
        (b.startsIn.days * 86400 +
          b.startsIn.hours * 3600 +
          b.startsIn.minutes * 60)
      );
    });

    // Return top 3 contests
    return allContests.slice(0, 3);
  };

  // Process past contests for dashboard display
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
      console.log(contests.codeforces.contests.finished);
      const sortedFinished = [...contests.codeforces.contests?.finished]
        .sort((a, b) => b.startTimeSeconds - a.startTimeSeconds)
        .slice(0, 100);
      sortedFinished.forEach((contest) => {
        // Format duration
        const durationHours = Math.floor(contest.durationSeconds / 3600);
        const durationMinutes = Math.floor(
          (contest.durationSeconds % 3600) / 60
        );
        const duration =
          durationHours > 0
            ? `${durationHours} ${durationHours === 1 ? "hour" : "hours"}`
            : `${durationMinutes} minutes`;

        // Format start date
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
        // Format duration in hours
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

  const upcomingContests = getUpcomingContests();
  //   getUpcomingContests();
  console.log(upcomingContests);
  const pastContests = getPastContests();

  // Get paginated past contests based on current filter
  const filteredPastContests = pastContests.filter(
    (contest) =>
      filteredPlatform === "all" || contest.platform === filteredPlatform
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPastContests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPastContests.length / itemsPerPage);

  return (
    <>
      <div
        id="dashboard"
        className="min-h-screen bg-gray-100 dark:bg-neutral-900 py-6 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contest Tracker
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by Platform:
            </span>

            <div className="flex flex-wrap gap-2">
              <button
                className={`inline-flex items-center px-3 py-1.5 ${
                  filteredPlatform === "all"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-300"
                } rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors`}
                onClick={() => setFilteredPlatform("all")}
              >
                <span>All</span>
              </button>

              <button
                className={`inline-flex items-center px-3 py-1.5 ${
                  filteredPlatform === "codeforces"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-300"
                } rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors`}
                onClick={() => setFilteredPlatform("codeforces")}
              >
                <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                <span>Codeforces</span>
              </button>

              <button
                className={`inline-flex items-center px-3 py-1.5 ${
                  filteredPlatform === "leetcode"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-300"
                } rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors`}
                onClick={() => setFilteredPlatform("leetcode")}
              >
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></span>
                <span>LeetCode</span>
              </button>

              <button
                className={`inline-flex items-center px-3 py-1.5 ${
                  filteredPlatform === "codechef"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-300"
                } rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors`}
                onClick={() => setFilteredPlatform("codechef")}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                <span>CodeChef</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-neutral-700 mb-6">
          <div className="flex -mb-px">
            <button
              className={`py-2 px-4 ${
                activeTab === "upcoming"
                  ? "border-b-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } font-medium text-sm`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Contests
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "past"
                  ? "border-b-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } font-medium text-sm`}
              onClick={() => setActiveTab("past")}
            >
              Past Contests
            </button>
          </div>
        </div>

        {activeTab === "upcoming" ? (
          <div className="grid grid-cols-1 gap-6">
            {upcomingContests
              .filter(
                (contest) =>
                  filteredPlatform === "all" ||
                  contest.platform === filteredPlatform
              )
              .map((contest, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-700 p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 ${contest.color} rounded-full`}
                      ></div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {contest.name}
                      </h3>
                    </div>
                    <button
                      className={`transition-colors ${
                        isBookmarked(contest)
                          ? "text-yellow-500 dark:text-yellow-400"
                          : "text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
                      }`}
                      onClick={() => toggleBookmark(contest)}
                      aria-label={
                        isBookmarked(contest)
                          ? "Remove bookmark"
                          : "Add bookmark"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill={isBookmarked(contest) ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">
                          {contest.startDate}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Time until start:
                        </span>
                        <div className="flex space-x-2 text-sm font-medium">
                          <div className="bg-gray-100 dark:bg-neutral-700 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                            {contest.startsIn.days}d
                          </div>
                          <div className="bg-gray-100 dark:bg-neutral-700 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                            {contest.startsIn.hours}h
                          </div>
                          <div className="bg-gray-100 dark:bg-neutral-700 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                            {contest.startsIn.minutes}m
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {contest.type && (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded dark:bg-red-900 dark:text-red-300">
                            {contest.type}
                          </span>
                        )}
                        <span
                          className={`${
                            contest.type ? "ml-2" : ""
                          } px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded dark:bg-blue-900 dark:text-blue-300`}
                        >
                          {contest.duration}
                        </span>
                      </div>
                      <a
                        href={contest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                      >
                        Register
                      </a>
                    </div>
                  </div>
                </div>
              ))}

            {upcomingContests.filter(
              (contest) =>
                filteredPlatform === "all" ||
                contest.platform === filteredPlatform
            ).length === 0 && (
              <div className="text-center py-8 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700">
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming contests found for this platform.
                </p>
              </div>
            )}

            {upcomingContests.length > 0 && filteredPlatform === "all" && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30 p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full mb-2">
                      View more
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Find all upcoming contests
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      See the complete list of all upcoming competitive
                      programming contests
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href="#upcomingContests"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    >
                      View All Contests
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {currentItems.map((contest, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700 overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-700 p-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 ${contest.color} rounded-full`}
                    ></div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {contest.name}
                    </h3>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {contest.platform === "leetcode" &&
                      contest.participants &&
                      `${contest.participants} participants`}
                    {contest.platform === "codechef" &&
                      contest.participants &&
                      `${contest.participants} participants`}
                  </div>
                  <button
                    className={`transition-colors ${
                      isBookmarked(contest)
                        ? "text-yellow-500 dark:text-yellow-400"
                        : "text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"
                    }`}
                    onClick={() => toggleBookmark(contest)}
                    aria-label={
                      isBookmarked(contest) ? "Remove bookmark" : "Add bookmark"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill={isBookmarked(contest) ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {contest.startDate}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">
                        {contest.duration}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {contest.type && (
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded dark:bg-red-900 dark:text-red-300">
                          {contest.type}
                        </span>
                      )}
                      {contest.platform === "leetcode" &&
                        contest.problemCount && (
                          <span
                            className={`${
                              contest.type ? "ml-2" : ""
                            } px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded dark:bg-yellow-900 dark:text-yellow-300`}
                          >
                            {contest.problemCount} problems
                          </span>
                        )}
                    </div>
                    <a
                      href={contest.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    >
                      View Results
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {currentItems.length === 0 && (
              <div className="text-center py-8 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700">
                <p className="text-gray-500 dark:text-gray-400">
                  No past contests found for this platform.
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredPastContests.length > itemsPerPage && (
              <div className="mt-6 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-400 dark:text-gray-600"
                        : "text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Previous
                  </button>

                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1 + Math.max(0, currentPage - 3);
                    if (pageNum <= totalPages) {
                      return (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 rounded-md text-sm font-medium ${
                            currentPage === pageNum
                              ? "bg-indigo-600 text-white"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-400 dark:text-gray-600"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
