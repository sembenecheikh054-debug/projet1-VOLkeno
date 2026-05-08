async function register() {

    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").checked;
    const erreur = document.getElementById("erreur");

    if (!nom || !email || !password) {
        erreur.textContent = "Remplir tous les champs";
        return;
    }

    if (!confirm) {
        erreur.textContent = "Veuillez accepter les conditions";
        return;
    }

    const res = await request(
        "/auth/register",
        "POST",
        { nom, email, password }
    );

    console.log(res);

    // succès inscription
    // succès inscription
    if (res.message === "Compte créé. Vérifiez votre email ✅") {

        erreur.classList.remove("text-red-500");

        erreur.classList.add("text-green-600");

        erreur.textContent =
            "Compte créé. Vérifiez votre email pour activer votre compte.";

    } else {

        erreur.classList.remove("text-green-600");

        erreur.classList.add("text-red-500");

        erreur.textContent =
            res.error ||
            res.message ||
            "Erreur serveur";
    }
}