import axios from "axios"

const BASE_URL = "https://pixabay.com/api/";
const apiKey = "39074092-1de595f7748cd839e3af14b59"

export const getImages = async (searchValue, page = 1) => {
    const searchParams = new URLSearchParams({
        key: apiKey,
        q: searchValue,
        page,
        image_type: "photo",
        orientation: "horizontal",
        per_page: 12,
    });

    const response = await axios.get(`${BASE_URL}?${searchParams.toString()}`);
    return {
        hits: response.data.hits,
        totalHits: response.data.totalHits,
    }
}