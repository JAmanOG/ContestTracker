import React, { useEffect, useState, useCallback } from "react";
import SiteNavigation from "./SiteNavigation";
import Dashboard from "./dashboard";
import Upcoming from "./upcoming";
import PastContests from "./pastContests";
import Bookmarks from "./bookmarks";
import AdminPanel from "./adminPanel";
import Settings from "./settings";

// Cache expiration time (in milliseconds) - 1 hour
const CACHE_EXPIRY_TIME = 60 * 60 * 1000;

const Layout = () => {
  const [contests, setContests] = useState({
    codechef: [],
    codeforces: [],
    leetcode: [],
    pastleetcode: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  // Helper functions for cache management
  const saveToCache = (key, data) => {
    try {
      const cacheItem = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (err) {
      console.error("Error saving to cache:", err);
    }
  };

  const getFromCache = (key) => {
    try {
      const cachedItem = localStorage.getItem(key);
      if (!cachedItem) return null;

      const { data, timestamp } = JSON.parse(cachedItem);
      const isExpired = Date.now() - timestamp > CACHE_EXPIRY_TIME;

      if (isExpired) {
        localStorage.removeItem(key);
        return null;
      }

      return { data, timestamp };
    } catch (err) {
      console.error("Error retrieving from cache:", err);
      return null;
    }
  };

  const fetchContests = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);

    // Check cache first if not forcing a refresh
    if (!forceRefresh) {
      const cachedContests = getFromCache("contestsData");
      if (cachedContests) {
        setContests(cachedContests.data);
        setLastFetched(new Date(cachedContests.timestamp).toLocaleString());
        setIsLoading(false);
        return;
      }
    }

    try {
      // Fetch data from all APIs
      const codechefRes = await fetch(
        `${import.meta.env.VITE_URl}/api/contest/codechef`
      );
      const codeforceRes = await fetch(
        `${import.meta.env.VITE_URl}/api/contest/codeforces`
      );
      const today = new Date();
      const threeYearsAgo = new Date(today);
      threeYearsAgo.setFullYear(today.getFullYear() - 3);

      const leetcodeRes = await fetch(
        `${import.meta.env.VITE_URl}/api/contests/leetcode`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: {
              upcoming: "true",
              order_by: "start",
              // limit: 10,
              start__gte: today.toISOString(),
              end__lte: "2025-12-31T23:59:59",
            },
          }),
        }
      );
      const pastleetcodeRes = await fetch(
        `${import.meta.env.VITE_URl}/api/contests/leetcode`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: {
              upcoming: "false",
              order_by: "start",
              // limit: 10,
              start__gte: threeYearsAgo.toISOString(),
              end__lte: today.toISOString(),
            },
          }),
        }
      );

      // Check if responses are OK before parsing JSON
      const codechefData = codechefRes.ok ? await codechefRes.json() : [];
      const codeforceData = codeforceRes.ok ? await codeforceRes.json() : [];
      const leetcodeData = leetcodeRes.ok ? await leetcodeRes.json() : [];
      const pastleetcodeData = pastleetcodeRes.ok
        ? await pastleetcodeRes.json()
        : [];

      const contestsData = {
        codechef: codechefData,
        codeforces: codeforceData,
        leetcode: leetcodeData,
        pastleetcode: pastleetcodeData,
      };

      // Update state and cache the results
      setContests(contestsData);
      saveToCache("contestsData", contestsData);
      const currentTime = new Date().toLocaleString();
      setLastFetched(currentTime);
    } catch (err) {
      console.error("Error fetching contests:", err);
      setError("Failed to fetch contest data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContests();

    // Set up auto refresh interval (every hour)
    const refreshInterval = setInterval(() => {
      fetchContests(true);
    }, CACHE_EXPIRY_TIME);

    return () => clearInterval(refreshInterval);
  }, [fetchContests]);

  return (
    <>
      <SiteNavigation />
      <div className="flex">
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4 sticky top-0 bg-white dark:bg-neutral-900 md:mt-14 p-2 z-10 shadow-sm">
            {lastFetched && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {lastFetched}
              </span>
            )}
            <button
              onClick={() => fetchContests(true)}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 font-medium flex items-center gap-2 transition-all  shadow-sm"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  Refreshing...
                </>
              ) : (
                <>
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
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh Data
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {isLoading && !lastFetched ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500">Loading contests data...</p>
            </div>
          ) : (
            <>
              <Dashboard contests={contests} />
              <Upcoming contests={contests} />
              <PastContests contests={contests} />
              <Bookmarks contests={contests} />
              {/* <AdminPanel />
              <Settings /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Layout;
