import React, { useState, useEffect } from "react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState({});
  const [filteredPlatform, setFilteredPlatform] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");
  const [timeLeft, setTimeLeft] = useState({});

  // Load bookmarks from localStorage
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

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const updatedTimeLeft = {};
      
      Object.keys(bookmarks).forEach(key => {
        const contest = bookmarks[key];
        const startTime = new Date(contest.startTime || contest.startDate);
        
        if (startTime > now) {
          const diff = startTime - now;
          updatedTimeLeft[key] = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000)
          };
        } else {
          updatedTimeLeft[key] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
      
      setTimeLeft(updatedTimeLeft);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [bookmarks]);

  // Format number with leading zero
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  // Remove bookmark
  const removeBookmark = (bookmarkId) => {
    try {
      const updatedBookmarks = { ...bookmarks };
      delete updatedBookmarks[bookmarkId];
      
      setBookmarks(updatedBookmarks);
      localStorage.setItem("contestBookmarks", JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  // Get platform color
  const getPlatformColor = (platform) => {
    switch (platform) {
      case "codeforces": return "bg-red-500";
      case "codechef": return "bg-green-500";
      case "leetcode": return "bg-yellow-500";
      default: return "bg-blue-500";
    }
  };

  // Get formatted platform name
  const getPlatformName = (platform) => {
    switch (platform) {
      case "codeforces": return "Codeforces";
      case "codechef": return "CodeChef";
      case "leetcode": return "LeetCode";
      default: return platform;
    }
  };

  // Filter bookmarks
  const getFilteredBookmarks = () => {
    const now = new Date();
    const upcomingBookmarks = [];
    const pastBookmarks = [];
    
    Object.keys(bookmarks).forEach(key => {
      const contest = bookmarks[key];
      const startTime = new Date(contest.startTime || contest.startDate);
      
      // Add the bookmark ID to the contest object
      const bookmarkWithId = {
        ...contest,
        bookmarkId: key
      };
      
      if (startTime > now) {
        upcomingBookmarks.push(bookmarkWithId);
      } else {
        pastBookmarks.push(bookmarkWithId);
      }
    });
    
    // Sort upcoming by nearest start date
    upcomingBookmarks.sort((a, b) => {
      const dateA = new Date(a.startTime || a.startDate);
      const dateB = new Date(b.startTime || b.startDate);
      return dateA - dateB;
    });
    
    // Sort past by most recent
    pastBookmarks.sort((a, b) => {
      const dateA = new Date(a.startTime || a.startDate);
      const dateB = new Date(b.startTime || b.startDate);
      return dateB - dateA;
    });
    
    // Apply platform filter if needed
    const filtered = activeTab === "upcoming" ? upcomingBookmarks : pastBookmarks;
    return filteredPlatform === "all" 
      ? filtered 
      : filtered.filter(contest => contest.platform === filteredPlatform);
  };

  const bookmarkList = getFilteredBookmarks();
  const hasBookmarks = Object.keys(bookmarks).length > 0;

  return (
    <>
      <div
        id="bookmarks"
        className="page-section bg-gray-50 dark:bg-gray-900 py-8 min-h-screen"
      >
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Your Bookmarked Contests
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Quickly access your saved contests and track upcoming events.
            </p>
          </div>

          {!hasBookmarks ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center mb-8">
              <svg
                className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-500 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                ></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                No bookmarked contests yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                When you bookmark contests, they will appear here for easy access.
              </p>
              <a
                href="#upcomingContests"
                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Browse Contests
              </a>
            </div>
          ) : (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Filter Bookmarks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      className={`px-4 py-2 ${filteredPlatform === "codeforces" 
                        ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"} 
                        rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center gap-1`}
                      onClick={() => setFilteredPlatform(filteredPlatform === "codeforces" ? "all" : "codeforces")}
                    >
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      Codeforces
                    </button>
                    <button 
                      className={`px-4 py-2 ${filteredPlatform === "codechef" 
                        ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"} 
                        rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center gap-1`}
                      onClick={() => setFilteredPlatform(filteredPlatform === "codechef" ? "all" : "codechef")}
                    >
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      CodeChef
                    </button>
                    <button 
                      className={`px-4 py-2 ${filteredPlatform === "leetcode" 
                        ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"} 
                        rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center gap-1`}
                      onClick={() => setFilteredPlatform(filteredPlatform === "leetcode" ? "all" : "leetcode")}
                    >
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      LeetCode
                    </button>
                    <button 
                      className={`px-4 py-2 ${filteredPlatform === "all" 
                        ? "bg-indigo-600 text-white" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"} 
                        rounded-md hover:bg-indigo-700 transition-colors`}
                      onClick={() => setFilteredPlatform("all")}
                    >
                      All Platforms
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button 
                    className={`py-3 px-4 ${activeTab === "upcoming" 
                      ? "border-b-2 border-indigo-600 font-medium text-indigo-600 dark:text-indigo-400 dark:border-indigo-400" 
                      : "border-b-2 border-transparent font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"} 
                      focus:outline-none`}
                    onClick={() => setActiveTab("upcoming")}
                  >
                    Upcoming Contests
                  </button>
                  <button 
                    className={`py-3 px-4 ${activeTab === "past" 
                      ? "border-b-2 border-indigo-600 font-medium text-indigo-600 dark:text-indigo-400 dark:border-indigo-400" 
                      : "border-b-2 border-transparent font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"} 
                      focus:outline-none`}
                    onClick={() => setActiveTab("past")}
                  >
                    Past Contests
                  </button>
                </div>
              </div>

              {bookmarkList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarkList.map((contest) => (
                    <div key={contest.bookmarkId} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                      <div className={`p-1 ${getPlatformColor(contest.platform)} text-white text-center text-xs font-medium`}>
                        {getPlatformName(contest.platform)}
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {contest.name}
                          </h3>
                          <button
                            className="text-yellow-500 hover:text-yellow-600 focus:outline-none"
                            aria-label="Remove bookmark"
                            onClick={() => removeBookmark(contest.bookmarkId)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="currentColor"
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
                            {contest.startTime || contest.startDate}
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
                        {activeTab === "upcoming" && timeLeft[contest.bookmarkId] && (
                          <div className="mb-4">
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Starts in:
                            </div>
                            <div className="grid grid-cols-4 gap-2 text-center">
                              <div className="bg-indigo-100 dark:bg-indigo-900 rounded p-2">
                                <div className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
                                  {formatNumber(timeLeft[contest.bookmarkId].days)}
                                </div>
                                <div className="text-xs text-indigo-600 dark:text-indigo-300">
                                  Days
                                </div>
                              </div>
                              <div className="bg-indigo-100 dark:bg-indigo-900 rounded p-2">
                                <div className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
                                  {formatNumber(timeLeft[contest.bookmarkId].hours)}
                                </div>
                                <div className="text-xs text-indigo-600 dark:text-indigo-300">
                                  Hours
                                </div>
                              </div>
                              <div className="bg-indigo-100 dark:bg-indigo-900 rounded p-2">
                                <div className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
                                  {formatNumber(timeLeft[contest.bookmarkId].minutes)}
                                </div>
                                <div className="text-xs text-indigo-600 dark:text-indigo-300">
                                  Mins
                                </div>
                              </div>
                              <div className="bg-indigo-100 dark:bg-indigo-900 rounded p-2">
                                <div className="text-xl font-bold text-indigo-800 dark:text-indigo-200">
                                  {formatNumber(timeLeft[contest.bookmarkId].seconds)}
                                </div>
                                <div className="text-xs text-indigo-600 dark:text-indigo-300">
                                  Secs
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="flex space-x-2">
                          <a
                            href={contest.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 px-4 rounded-md transition-colors"
                          >
                            View Details
                          </a>
                          <a
                            href={`mailto:?subject=Join ${contest.name} on ${getPlatformName(contest.platform)}&body=Hey! Join me for ${contest.name} on ${getPlatformName(contest.platform)} starting at ${contest.startTime || contest.startDate}. Contest URL: ${contest.url}`}
                            className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 w-10 rounded-md transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center mb-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    No {activeTab} contests found for the selected platform.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

// Fix component name to use PascalCase
export default Bookmarks;