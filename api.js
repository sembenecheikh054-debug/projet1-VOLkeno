const API_URL = "https://back-yg1g.onrender.com";

const request = async (url, method = "GET", data = null) => {

    try {

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

        const result = await res.json();

        // 🔥 gestion erreurs backend
        if (!res.ok) {
            throw new Error(
                result.message ||
                result.error ||
                "Erreur serveur"
            );
        }

        return result;

    } catch (err) {

        console.error("❌ API ERROR:", err.message);

        return {
            error: err.message
        };
    }
};