import axios from "axios";

export const searchVideos = async (playlistId, searchQuery) => {
    const API_KEY = process.env.YT_API_KEY;

    if (!API_KEY) {
        return { error: "Missing YouTube API Key" };
    }

    if (!playlistId || !searchQuery) {
        return { error: "Missing playlistId or searchQuery" };
    }

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const videos = response.data.items || [];

        if (videos.length === 0) {
            return { message: "No videos found in the playlist." };
        }

        const matchedVideo = videos.find(video =>
            video.snippet?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (matchedVideo) {
            return {
                title: matchedVideo.snippet.title,
                url: `https://www.youtube.com/watch?v=${matchedVideo.snippet.resourceId.videoId}`,
            };
        } else {
            return { message: "No video found with that title." };
        }
    } catch (error) {
        console.error("Error searching for videos:", error?.response?.data || error.message);
        return { error: "Failed to fetch videos. Please try again." };
    }
};
