async function register() {
    const nom      = document.getElementById("nom").value;
    const email    = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const conditions = document.getElementById("confirm").checked;
    const erreur   = document.getElementById("erreur");

    if (!nom || !email || !password) {
        erreur.textContent = "Remplir tous les champs";
        return;
    }

    if (!conditions) {
        erreur.textContent = "Veuillez accepter les conditions";
        return;
    }

    const res = await request("/auth/register", "POST", { nom, email, password });
    console.log(res);

    if (res.message === "Compte créé. Vérifiez votre email ✅") {
        // ✅ affiche un message au lieu de rediriger
        erreur.style.color = "green";
        erreur.textContent = "Email envoyé ! Vérifiez votre boîte mail ✅";
    } else {
        erreur.style.color = "red";
        erreur.textContent = res.message;
    }
}