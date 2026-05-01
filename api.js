const API_URL = "http://localhost:5000";

const request = async (url, method = "GET", data = null) => {
    const res = await fetch(API_URL + url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") 
                ? `Bearer ${localStorage.getItem("token")}` 
                : ""
        },
        body: data ? JSON.stringify(data) : null
    });
    return res.json();
};