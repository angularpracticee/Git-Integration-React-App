import axios from 'axios'
const instanceEndPt1 = axios.create({
    // baseUrl: 'https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0'
    // baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
    baseURL: 'https://api.imgflip.com/get_memes'
})

export const instanceEndPt2 = axios.create({
    // baseUrl: 'https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0'
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
})

export default instanceEndPt1