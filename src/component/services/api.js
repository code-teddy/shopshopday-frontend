import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:9090/api/v1",
   // withCredentials: true,  // for authenticated requests
})

// export const api = axios.create({
//     baseURL: "/api/v1", // Remove the localhost:9090 part
//     // withCredentials: true,  // for authenticated requests
// })