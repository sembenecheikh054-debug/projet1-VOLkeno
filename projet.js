let indexModification = null; // ✅ ajouté

let nom = document.getElementById("nom").value
let adresse = document.getElementById("adresse").value
let mail = document.getElementById("mail").value
let tel = document.getElementById("tel").value
let nuit = document.getElementById("nuit").value
let form = document.getElementById("hot")

function ouvirform() {
    document.getElementById("modal").classList.remove("hidden");
}

function fermerform() {
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("nom").value = "";
    document.getElementById("adresse").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("nuit").value = "";
    document.getElementById("erreur").textContent = "";
    // ✅ remet l'upload-zone
    document.getElementById("upload-zone").classList.remove("hidden");
    document.getElementById("preview").classList.add("hidden");

      const btnChanger = document.getElementById("btn-changer-photo");
    if (btnChanger) btnChanger.classList.add("hidden");

    imageBase64 = null;
    indexModification = null; // ✅ reset
}

document.getElementById("modal").addEventListener("click", function(e) {
    if (e.target === this) fermerform();
});

let btn = document.getElementById("button");
let table = JSON.parse(localStorage.getItem("compt")) || [];

function sauvegarder() {
    localStorage.setItem("compt", JSON.stringify(table));
}

function afficher(data = table) {
    document.getElementById("compteur").textContent = data.length;

    document.getElementById("card").innerHTML = data
        .map((f, i) => `
            <div class="relative group bg-white rounded-xl overflow-hidden border border-gray-200">
                <img src="${f.photo}" class="w-full h-48 object-cover">
                <div class="absolute bottom-0  right-2 
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 
                    flex justify-center gap-3 p-1">
                    <button onclick="modifier(${table.indexOf(f)})"
                        class="bg-green-500 text-white px-2 py-1 rounded-lg text-sm hover:bg-green-600">
                        ✏️
                    </button>
                    <button onclick="supprimer(${table.indexOf(f)})"
                        class="bg-red-500 text-white px-2 py-1 rounded-lg text-sm hover:bg-red-600">
                        🗑️
                    </button>
                </div>
                <div class="p-4">
                    <p class="text-red-500">${f.adresse}</p>
                    <p class="text-xl font-bold">${f.nom}</p>
                    <p class="mt-2">${f.nuit} XOF / nuit</p>
                </div>
            </div>
        `)
        .join("");
}

function supprimer(i) {
    table.splice(i, 1);
    sauvegarder();
    afficher();
}

function modifier(i) {
    indexModification = i;
    const f = table[i];

    document.getElementById("nom").value     = f.nom;
    document.getElementById("adresse").value = f.adresse;
    document.getElementById("mail").value    = f.mail;
    document.getElementById("tel").value     = f.tel;
    document.getElementById("nuit").value    = f.nuit;

    imageBase64 = f.photo;
    const preview = document.getElementById("preview");
    preview.src = f.photo;
    preview.classList.remove("hidden");
    document.getElementById("upload-zone").classList.add("hidden");

    // ✅ affiche le bouton changer photo
    document.getElementById("btn-changer-photo").classList.remove("hidden");
     console.log("avant ouvirform"); // ✅
    ouvirform();
    console.log("après ouvirform"); 

    
}

let imageBase64 = null;

function previewImage(input) {
    const fichier = input.files[0];
    if (!fichier) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        imageBase64 = e.target.result;
        const img = document.getElementById("preview");
        img.src = imageBase64;
        img.classList.remove("hidden");
        document.getElementById("upload-zone").classList.add("hidden");
    };
    reader.readAsDataURL(fichier);
}

btn.addEventListener("click", function() {
    let nom     = document.getElementById("nom").value;
    let adresse = document.getElementById("adresse").value;
    let mail    = document.getElementById("mail").value;
    let tel     = document.getElementById("tel").value;
    let nuit    = document.getElementById("nuit").value;

    if (!nom || !adresse || !mail || !tel || !nuit || !imageBase64) {
        document.getElementById("erreur").textContent = "Remplir tous les champs";
        return;
    }

    const telStr = tel.toString().replace(/\s/g, '');
    if (!/^\d{9}$/.test(telStr)) {
        document.getElementById("erreur").textContent = "Le téléphone doit contenir exactement 9 chiffres";
        return;
    }

    const n = parseInt(nuit);
    if (isNaN(n) || n <= 0 || n !== parseFloat(nuit)) {
        document.getElementById("erreur").textContent = "Le prix doit être un nombre entier positif";
        return;
    }

    document.getElementById("erreur").textContent = "";

    if (indexModification !== null) {
        // ✅ modification — remplace l'existant
        table[indexModification] = { photo: imageBase64, adresse, nom, mail, tel, nuit: n };
        indexModification = null;
    } else {
        // ✅ ajout normal
        table.push({ photo: imageBase64, adresse, nom, mail, tel, nuit: n });
    }

    afficher();
    sauvegarder();
    fermerform();
});

afficher();

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('-translate-x-full');
    sidebar.classList.toggle('translate-x-0');
    overlay.classList.toggle('hidden');
}

function fermerMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.add('-translate-x-full');
    sidebar.classList.remove('translate-x-0');
    overlay.classList.add('hidden');
}

function ouvrirModalDeconnexion() {
    document.getElementById("modalDeconnexion").classList.remove("hidden");
}

function fermerModalDeconnexion() {
    document.getElementById("modalDeconnexion").classList.add("hidden");
}

function deconnexion() {
    localStorage.removeItem("token");
    localStorage.removeItem("nom");
    window.location.href = "index.html";
}

document.getElementById("modalDeconnexion").addEventListener("click", function(e) {
    if (e.target === this) fermerModalDeconnexion();
});

let dataActive = table;

function filtrer() {
    const rech = document.getElementById("Recherche").value.toLowerCase();
    dataActive = table.filter(f =>
        f.nom.toLowerCase().includes(rech) ||
        f.adresse.toLowerCase().includes(rech)
    );
    afficher(dataActive);
}

let photoProfilBase64 = null;

function chargerProfil() {
    const photo = localStorage.getItem("photoProfil");
    const nom   = localStorage.getItem("nom");
    if (photo) document.getElementById("photoProfil").src = photo;
    if (nom)   document.getElementById("nomUser").textContent = nom;
}

function ouvrirModalProfil() {
    document.getElementById("modalProfil").classList.remove("hidden");
    const photo = localStorage.getItem("photoProfil");
    const nom   = localStorage.getItem("nom");
    if (photo) document.getElementById("previewProfil").src = photo;
    if (nom)   document.getElementById("nomProfil").value = nom;
}

function fermerModalProfil() {
    document.getElementById("modalProfil").classList.add("hidden");
    photoProfilBase64 = null;
}

function previewPhotoProfil(input) {
    const fichier = input.files[0];
    if (!fichier) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        photoProfilBase64 = e.target.result;
        document.getElementById("previewProfil").src = photoProfilBase64;
    };
    reader.readAsDataURL(fichier);
}

function sauvegarderProfil() {
    // ✅ sauvegarde uniquement la photo
    if (photoProfilBase64) {
        localStorage.setItem("photoProfil", photoProfilBase64);
    }

    chargerProfil();
    fermerModalProfil();
}

document.getElementById("modalProfil").addEventListener("click", function(e) {
    if (e.target === this) fermerModalProfil();
});

chargerProfil();

document.querySelectorAll('.nav-btn').forEach(btn => {
    const pageCourante = window.location.pathname.split('/').pop();
    const page = btn.getAttribute('onclick');
    if (page && page.includes(pageCourante)) {
        btn.style.background = "white";
        btn.style.color = "black";
    }
});
function changerPhoto() {
    document.getElementById("preview").classList.add("hidden");
    document.getElementById("btn-changer-photo").classList.add("hidden");
    document.getElementById("upload-zone").classList.remove("hidden");
    imageBase64 = null;
}
localStorage.removeItem("nom");