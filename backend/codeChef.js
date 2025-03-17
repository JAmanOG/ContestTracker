// import puppeteer from "puppeteer";
// import { JSDOM } from "jsdom";

// const profilePath =
//   "C:/Users/Aman Jaiswal/AppData/Local/Google/Chrome/User Data/Default";

// function UpcomingextractTableData(data) {
//   const dom = new JSDOM(data);
//   const document = dom.window.document;

//   let table = document.querySelector(".MuiTable-root");
//   if (!table) {
//     console.log("Table not found!");
//     return;
//   }

//   let extractedData = [];

//   let rows = table.querySelectorAll("tr");
//   for (let i = 1; i < rows.length; i++) {
//     let row = rows[i];
//     let cells = row.querySelectorAll("td");

//     let code = cells[0].querySelector("p")?.textContent;
//     let name = cells[1].querySelector("span")?.textContent;
//     let start = cells[2].querySelector("p")?.textContent;
//     let duration = cells[3].querySelector("p")?.textContent;
//     let startsIn = cells[4]?.querySelectorAll("p");
//     let startsInDays = startsIn[0]?.textContent;
//     let startsInHours = startsIn[1]?.textContent;

//     extractedData.push({
//       code,
//       name,
//       start,
//       duration,
//       startsInDays,
//       startsInHours,
//     });
//   }

//   console.log(extractedData);
//   return extractedData;
// }
// function PastextractTableData(data) {
//   const dom = new JSDOM(data);
//   const document = dom.window.document;

//   let table = document.querySelector(".MuiTable-root");
//   if (!table) {
//     console.log("Table not found!");
//     return;
//   }

//   let extractedData = [];

//   let rows = table.querySelectorAll("tr");
//   for (let i = 1; i < rows.length; i++) {
//     let row = rows[i];
//     let cells = row.querySelectorAll("td");

//     let code = cells[0].querySelector("p")?.textContent;
//     let name = cells[1].querySelector("span")?.textContent;
//     let start = cells[2].querySelector("p")?.textContent;
//     let duration = cells[3].querySelector("p")?.textContent;
//     let startsIn = cells[4]?.querySelectorAll("p");
//     let Participants = startsIn[0]?.textContent;

//     extractedData.push({
//       code,
//       name,
//       start,
//       duration,
//       Participants,
//     });
//   }

//   console.log(extractedData);
//   return extractedData;
// }

// export async function codeChef() {
//   const browser = await puppeteer.launch({
//     headless: true,
//     userDataDir: profilePath,
//     executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//   });
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1200, height: 1200 });
//   await page.goto("https://www.codechef.com/contests", {
//     waitUntil: "networkidle2",
//   });

//   // await new Promise((resolve) => setTimeout(resolve, 4000));

//   const contests = await page.evaluate(() => {
//     const contests = {
//       upcoming: [],
//       test: [],
//       past: [],
//     };

//     const contestList = document.querySelector(
//       "._contest-tables__container_7s2sw_225"
//     );

//     if (contestList) {
//       const children = contestList.children;

//       if (children.length >= 3) {
//         contests.upcoming = children[0].outerHTML;
//         contests.test = children[1].outerHTML;
//         contests.past = children[2].outerHTML;
//       }
//     }

//     return contests;
//   });

//   const upcoming = UpcomingextractTableData(contests.upcoming);
//   const past = PastextractTableData(contests.past);
//   // const test = extractTableData(contests.test);

//   console.log(upcoming);
//   console.log(past);
//   // console.log(test);

//   // console.log(contests);

//   contests.upcoming = upcoming;
//   contests.past = past;
//   contests.test = undefined;

//   await browser.close();
//   return contests;
// }

import axios from "axios";

export async function codeChef() {
  const username = process.env.CLIST_USERNAME;
  const api_key = process.env.CLIST_API_KEY;

  if (!username || !api_key) {
    throw new Error("Username or API key not found");
  }

  const response = await axios.get(`https://clist.by/api/v4/contest/`, {
    params: {
      username,
      api_key,
      host: "codechef.com",
      order_by: "start",
      limit: 10,
    },
    headers: {
      Accept: "application/json",
    },
  });

  const contests = response.data.objects;

  const transformedContests = contests.map(contest => ({
    code: contest.id,
    name: contest.event,
    start: contest.start,
    duration: contest.duration,
    href: contest.href,
  }));

  return {
    upcoming: transformedContests.filter(contest => new Date(contest.start) > new Date()),
    past: transformedContests.filter(contest => new Date(contest.start) <= new Date()),
  };
}