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
        }
        let btn = document.getElementById("button");

        let table = JSON.parse(localStorage.getItem("key")) || [];
        function sauvegarder() {
            localStorage.setItem("key", JSON.stringify(table));
        }

        function afficher() {
            document.getElementById("compteur").textContent = table.length;


            document.getElementById("card").innerHTML = table
                .map((f, i) => `
    <div class="bg-white rounded-xl overflow-hidden border border-gray-200">
                <img src="${f.photo}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <p class="text-red-500">${f.adresse}</p>
                    <p class="text-xl font-bold">${f.nom}</p>
                    <p class="mt-2">${f.nuit} XOF / nuit</p>
                </div>
            </div>
    `
                ).join("");
        }
        let imageBase64 = null;

        function previewImage(input) {
            const fichier = input.files[0];
            if (!fichier) return;
            const reader = new FileReader();
            reader.onload = function (e) {
                imageBase64 = e.target.result;
                const img = document.getElementById("preview");
                img.src = imageBase64;
                img.classList.remove("hidden");

                document.getElementById("upload-zone").classList.add("hidden");
            };
            reader.readAsDataURL(fichier);
        }

        btn.addEventListener("click", function () {
            let nom = document.getElementById("nom").value
            let adresse = document.getElementById("adresse").value
            let mail = document.getElementById("mail").value
            let tel = document.getElementById("tel").value
            let nuit = document.getElementById("nuit").value;


            if (!nom || !adresse || !mail || !tel || !nuit || !imageBase64) {
                document.getElementById("erreur").textContent = "remplir tous les champs"
                return
            }

            let n = parseInt(nuit)

            if (isNaN(n)) {
                document.getElementById("erreur").textContent = "remplir une somme valable"
                return
            }
            document.getElementById("erreur").textContent = "";

            table.push({ photo: imageBase64, adresse, nom, nuit: n })




            afficher();
            sauvegarder();
            document.getElementById("nom").value = "";
            document.getElementById("adresse").value = "";
            document.getElementById("mail").value = "";
            document.getElementById("tel").value = "";
            document.getElementById("nuit").value = "";
            document.getElementById("preview").classList.add("hidden");
            document.getElementById("upload-zone").classList.remove("hidden");
            imageBase64 = null;
        })
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

        afficher();
    
