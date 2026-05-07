async function resetPassword() {
    // récupère le token depuis l'URL
    const params   = new URLSearchParams(window.location.search);
    const token    = params.get("token");
    const password = document.getElementById("password").value;
    const confirm  = document.getElementById("confirm").value;
    const message  = document.getElementById("message");

    if (!password || !confirm) {
        message.textContent = "Remplir tous les champs";
        message.className = "text-red-500 text-sm";
        return;
    }

    if (password !== confirm) {
        message.textContent = "Les mots de passe ne correspondent pas";
        message.className = "text-red-500 text-sm";
        return;
    }

    const res = await request("/auth/reset-password", "POST", { token, password });

    message.textContent = res.message;
    if (res.message.includes("✅")) {
        setTimeout(() => window.location.href = "index.html", 2000);
    }
}