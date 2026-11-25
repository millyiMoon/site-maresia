
/* =====================================
   NAVEGAÇÃO DINÂMICA
===================================== */

const linksMenu = document.querySelectorAll(".nav-links a");

const secoes = document.querySelectorAll(
    "header[id], section[id]"
);

const observadorMenu = new IntersectionObserver((entradas) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {

            const idAtual = entrada.target.id;

            linksMenu.forEach(link => {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + idAtual) {
                    link.classList.add("active");
                }

            });

        }

    });

}, {
    rootMargin: "-30% 0px -60% 0px"
});

secoes.forEach(secao => {
    observadorMenu.observe(secao);
});


/* =====================================
   MENU MOBILE
===================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    linksMenu.forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
        });

    });

}


/* =====================================
   PESQUISA DO SITE
===================================== */

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

if (searchForm && searchInput) {

    searchForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const pesquisa = searchInput.value
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        if (!pesquisa) return;

        const linkEncontrado = Array.from(linksMenu).find(link => {

            const texto = link.textContent
                .trim()
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            return texto.includes(pesquisa);

        });

        if (linkEncontrado) {

            const destino = document.querySelector(
                linkEncontrado.getAttribute("href")
            );

            if (destino) {

                destino.scrollIntoView({
                    behavior: "smooth"
                });

                linksMenu.forEach(link => {
                    link.classList.remove("active");
                });

                linkEncontrado.classList.add("active");

                navLinks?.classList.remove("show");

                searchInput.value = "";

            }

        } else {

            alert("Não encontramos essa seção. Tente pesquisar por massagens, produtos ou pacotes.");

        }

    });

}
