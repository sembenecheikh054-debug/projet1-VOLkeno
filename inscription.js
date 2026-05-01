async function register() {
    const nom      = document.getElementById("nom").value;
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm  = document.getElementById("confirm").checked;
    const erreur   = document.getElementById("erreur");

    if (!nom || !email || !password || !confirm) {
        erreur.textContent = "Remplir tous les champs";
        return;
    }

    if (!confirm) {
        erreur.textContent = "Veuiller accepter les conditions";
        return;
    }

    const res = await request("/auth/register", "POST", { nom, email, password });
    console.log(res);
    if (res.message === "Compte créé ✅") {
        window.location.href = "both.html";
    } else {
        erreur.textContent = res.message;
    }
}