const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';


export const authEndpoints = {

}


export const categoryEndpoints = {
    GET_ALL_CATEGORIES: `${BASE_URL}/api/categories`,
    CREATE_CATEGORY: `${BASE_URL}/api/categories`,
}