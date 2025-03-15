import React, { useState, useEffect } from "react";

const Upcoming = ({ contests }) => {
  const [filteredPlatform, setFilteredPlatform] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [timeLeft, setTimeLeft] = useState({});
  const [bookmarks, setBookmarks] = useState({});

//   console.log("Contests", contests);
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

  const toggleBookmark = (contest) => {
    try {
      // Create a copy of bookmarks
      const updatedBookmarks = { ...bookmarks };
      
      // Create a unique ID for the contest
      const bookmarkId = `${contest.platform}-${contest.name.replace(/\s+/g, '-')}`;
      
      if (updatedBookmarks[bookmarkId]) {
        // Remove bookmark if it exists
        delete updatedBookmarks[bookmarkId];
      } else {
        // Add bookmark with fixed time format instead of countdown
        const bookmarkedContest = {
          ...contest,
          bookmarkedAt: new Date().toISOString(),
          // Store actual date instead of countdown
          startTime: contest.startDate
        };
        
        updatedBookmarks[bookmarkId] = bookmarkedContest;
      }
      
      // Save to state and localStorage
      setBookmarks(updatedBookmarks);
      localStorage.setItem("contestBookmarks", JSON.stringify(updatedBookmarks));
      
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  // Check if a contest is bookmarked
  const isBookmarked = (contest) => {
    const bookmarkId = `${contest.platform}-${contest.name.replace(/\s+/g, '-')}`;
    return !!bookmarks[bookmarkId];
  };



  // Parse and format contests data
  const parseContests = () => {
    const allContests = [];

    // Process CodeChef contests
    if (contests?.codechef?.upcoming) {
      contests.codechef.upcoming?.forEach((contest) => {
        allContests.push({
          platform: "codechef",
          name: contest.name,
          startDate: contest.start,
          duration: contest.duration,
          startsIn: {
            days: parseInt(contest.startsInDays?.split(" ")[0]) || 0,
            hours: parseInt(contest.startsInHours?.split(" ")[0]) || 0,
            minutes: 0,
            seconds: 0,
          },
          url: `https://www.codechef.com/contests/${contest.code}`,
        });
      });
    }

    // Process CodeForces contests
    if (contests?.codeforces?.contests?.upcoming) {
      contests.codeforces.contests.upcoming.forEach((contest) => {
        // Convert seconds to days, hours, minutes, seconds
        const totalSeconds = contest.relativeTimeSeconds * -1;
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

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

        allContests.push({
          platform: "codeforces",
          name: contest.name,
          startDate: startDate,
          duration: duration,
          startsIn: {
            days,
            hours,
            minutes,
            seconds,
          },
          url: `https://codeforces.com/contests/${contest.id}`,
        });
      });
    }

    // Process LeetCode contests
    if (contests?.leetcode?.objects) {
        contests.leetcode.objects.forEach((contest) => {
        // Calculate time difference
        const startTime = new Date(contest.start);
        const now = new Date();
        const diff = startTime - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          // Format duration in hours
          const durationHours = contest.duration / 3600;
          const durationMinutes = (contest.duration % 3600) / 60;
          const duration =
            durationHours >= 1
              ? `${durationHours} ${durationHours === 1 ? "hour" : "hours"}`
              : `${durationMinutes} minutes`;

          allContests.push({
            platform: "leetcode",
            name: contest.event,
            startDate: new Date(contest.start).toLocaleDateString(),
            duration: duration,
            startsIn: {
              days,
              hours,
              minutes,
              seconds,
            },
            url: contest.href,
          });
        }
      });
    }

    // Sort contests based on start time
    if (sortBy === "date") {
      allContests.sort((a, b) => {
        return (
          a.startsIn.days * 86400 +
          a.startsIn.hours * 3600 +
          a.startsIn.minutes * 60 +
          a.startsIn.seconds -
          (b.startsIn.days * 86400 +
            b.startsIn.hours * 3600 +
            b.startsIn.minutes * 60 +
            b.startsIn.seconds)
        );
      });
    } else if (sortBy === "platform") {
      allContests.sort((a, b) => a.platform.localeCompare(b.platform));
    }

    // Filter by platform if needed
    if (filteredPlatform !== "all") {
      return allContests.filter(
        (contest) => contest.platform === filteredPlatform
      );
    }

    // Filter by search query if provided
    if (searchQuery) {
      return allContests.filter((contest) =>
        contest.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return allContests;
  };

  // Setup countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft({}); // Force re-render to update countdown
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get platform color
  const getPlatformColor = (platform) => {
    switch (platform) {
      case "codeforces":
        return "bg-red-500";
      case "codechef":
        return "bg-green-500";
      case "leetcode":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  // Get formatted platform name
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

  // Format number with leading zero
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  // Get all contests after applying filters and sorting
  const allContests = parseContests();

  return (
    <>
      <div
        id="upcoming" 
        className="page-section bg-gray-50 dark:bg-gray-900 py-8 min-h-screen"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Upcoming Contests
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stay updated with all upcoming competitive programming contests.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Filter Contests
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
                  placeholder="Search contests..."
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
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="duration">Sort by Duration</option>
                <option value="platform">Sort by Platform</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allContests.length === 0 ? (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming contests found.
                </p>
              </div>
            ) : (
              allContests.map((contest, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`p-1 ${getPlatformColor(
                      contest.platform
                    )} text-white text-center text-xs font-medium`}
                  >
                    {getPlatformName(contest.platform)}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {contest.name}
                      </h3>
                      <button 
                      className={`transition-colors ${isBookmarked(contest) 
                        ? "text-yellow-500 dark:text-yellow-400" 
                        : "text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400"}`}
                      onClick={() => toggleBookmark(contest)}
                      aria-label={isBookmarked(contest) ? "Remove bookmark" : "Add bookmark"}
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
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {contest.startDate}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Duration: {contest.duration}
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Starts in:
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="bg-indigo-100 dark:bg-indigo-900 rounded p-2">
                          <div className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
                            {formatNumber(contest.startsIn.days)}
                          </div>
                          <div className="text-xs text-indigo-600 dark:text-indigo-300">
                            Days
                          </div>
                        </div>
                        <div className="bg-indigo-100 dark:bg-indigo-900 rounded p-2">
                          <div className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
                            {formatNumber(contest.startsIn.hours)}
                          </div>
                          <div className="text-xs text-indigo-600 dark:text-indigo-300">
                            Hours
                          </div>
                        </div>
                        <div className="bg-indigo-100 dark:bg-indigo-900 rounded p-2">
                          <div className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
                            {formatNumber(contest.startsIn.minutes)}
                          </div>
                          <div className="text-xs text-indigo-600 dark:text-indigo-300">
                            Mins
                          </div>
                        </div>
                        <div className="bg-indigo-100 dark:bg-indigo-900 rounded p-2">
                          <div className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
                            {formatNumber(contest.startsIn.seconds)}
                          </div>
                          <div className="text-xs text-indigo-600 dark:text-indigo-300">
                            Secs
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      href={contest.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 px-4 rounded-md transition-colors"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {allContests.length > 6 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white"
                >
                  1
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  2
                </a>
                <a
                  href="#"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Next
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Upcoming;
