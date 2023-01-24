import axios from "axios";

const url = "https://ytstream-download-youtube-videos.p.rapidapi.com/dl";
const ytApi = axios.create({
  baseURL: url,
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "ytstream-download-youtube-videos.p.rapidapi.com",
  },
});

export const getYtMusic = async (params) => {
  try {
    const response = await ytApi.get("/", {
      params: {
        id: params,
      },
    });

    if (response?.data?.status === "fail") {
      return {
        status: 404,
        data: [],
      };
    }

    const { title, thumb: thumbnail, author } = response.data;

    const video480p = {
      url: response?.data?.link[135][0] || null,
      size: response?.data?.link[135][1] || null,
      quality: response?.data?.link[135][3] || null,
      type: response?.data?.link[135][4] || null,
    };
    const video720p = {
      url: response?.data?.link[136][0] || null,
      size: response?.data?.link[136][1] || null,
      quality: response?.data?.link[136][3] || null,
      type: response?.data?.link[136][4] || null,
    };
    const video1080p = {
      url: response?.data.link[137][0] || null,
      size: response?.data.link[137][1] || null,
      quality: response?.data.link[137][3] || null,
      type: response?.data.link[137][4] || null,
    };

    const mp3 = {
      url: response?.data?.link[600][0] || null,
      size: response?.data?.link[600][1] || null,
      quality: response?.data?.link[600][3] || null,
      type: response?.data?.link[600][4] || null,
    };

    return {
      title: title || null,
      thumbnail: thumbnail || null,
      author: author || null,
      link: [mp3 || {}, video480p || {}, video720p || {}, video1080p || {}],
    };
  } catch (error) {
    return {
      status: 500,
      msg: error,
      data: [],
    };
  }
};
