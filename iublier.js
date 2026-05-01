async function login() {
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const erreur   = document.getElementById("erreur");

    // validation
    if (!email || !password) {
        erreur.textContent = "Remplir tous les champs";
        return;
    }

    const res = await request("/auth/login", "POST", { email, password });
    console.log(res); // voir la réponse dans F12

    if (res.token) {
        // ✅ sauvegarde le token et le nom
        localStorage.setItem("token", res.token);
        localStorage.setItem("nom", res.nom);

        // redirige vers le dashboard
        window.location.href = "dashbord.html";
    } else {
        erreur.textContent = res.message;
    }
}