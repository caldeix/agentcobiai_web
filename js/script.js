window.addEventListener("load", function () {
    let currentLang = localStorage.getItem("language") || "es"; // Carga el idioma guardado
    loadLanguage(currentLang);

    document.getElementById("btnEs").addEventListener("click", function () {
        switchLanguage("es");
    });

    document.getElementById("btnEn").addEventListener("click", function () {
        switchLanguage("en");
    });
});

function switchLanguage(lang) {
    localStorage.setItem("language", lang); // Guarda el idioma en localStorage
    loadLanguage(lang);

    // Alternar botones de bandera
    document.getElementById("btnEs").style.display = lang === "es" ? "none" : "inline";
    document.getElementById("btnEn").style.display = lang === "en" ? "none" : "inline";
}

function loadLanguage(lang) {
    let jsonFile = lang === "es" ? "texts_es.json" : "texts_en.json";

    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            console.log("Cargando idioma:", lang, data);

            // Asignar textos dinámicamente
            document.querySelectorAll(".title").forEach(el => {
                el.textContent = data.title || "Título no encontrado";
            });
            document.getElementById("headerButton").textContent = data.headerButton || "Botón no encontrado";
            document.getElementById("headerButton").onclick = function() {
                window.location.href = "https://t.me/+kply1_olLgFiMzI0";
            };
            document.getElementById("heroHeading").textContent = data.hero.heading || "Encabezado no disponible";
            document.getElementById("heroSubheading").textContent = data.hero.subheading || "Subtítulo no disponible";
            document.getElementById("heroWhitelistButton").textContent = data.hero.whitelistButton || "Botón no encontrado";
            document.getElementById("heroWhitelistButton").onclick = function() {
                window.location.href = "https://t.me/+kply1_olLgFiMzI0";
            };
            document.getElementById("heroFollowButton").textContent = data.hero.followButton || "Botón no encontrado";
            document.getElementById("heroFollowButton").onclick = function() {
                window.location.href = "https://x.com/_caldeiX";
            };
            document.getElementById("followDev").textContent = data.followDev || "Texto de seguimiento no encontrado";
            document.getElementById("followDev").href = "https://x.com/_caldeiX";
            document.getElementById("footerText").textContent = data.footer.text || "Texto del pie de página no encontrado";

            // Limpiar y añadir dinámicamente los infoBoxes
            const infoBoxes = document.getElementById("infoBoxes");
            infoBoxes.innerHTML = "";
            if (Array.isArray(data.infoBoxes_checked)) {
                data.infoBoxes_checked.forEach(text => {
                    const div = document.createElement("div");
                    div.classList.add("box");
                    div.innerHTML = `<img style="width:45px;height:45px;" src="assets/svg/check.svg" alt="Icon"><span>${text}</span>`;
                    infoBoxes.appendChild(div);
                });
            } else {
                console.error("Error: data.infoBoxes no es un array.");
            }

            if (Array.isArray(data.infoBoxes_progress)) {
                data.infoBoxes_progress.forEach(text => {
                    const div = document.createElement("div");
                    div.classList.add("box");
                    div.innerHTML = `<img src="assets/svg/inprogres.svg" alt="Icon"><span>${text}</span>`;
                    infoBoxes.appendChild(div);
                });
            } else {
                console.error("Error: data.infoBoxes_progress no es un array.");
            }
        })
        .catch(error => console.error("Error al cargar el archivo JSON:", error));
}

document.getElementById("btnEn").click();