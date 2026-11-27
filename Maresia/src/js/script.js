
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
   PESQUISA INTELIGENTE DO SITE
===================================== */

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");


/* =====================================
   PALAVRAS-CHAVE DAS SEÇÕES
===================================== */

const pesquisas = {

    // SERVIÇOS
    "massagem": "#servicos",
    "massagens": "#servicos",
    "relaxante": "#servicos",
    "relaxamento": "#servicos",
    "drenagem": "#servicos",
    "drenagem suave": "#servicos",
    "massagem casal": "#servicos",
    "massa casal": "#servicos",
    "massagem para casal": "#servicos",
    "casal": "#servicos",

    // PRODUTOS
    "produto": "#produtos",
    "produtos": "#produtos",
    "body splash": "#produtos",
    "bodysplash": "#produtos",
    "body": "#produtos",
    "splash": "#produtos",
    "creme corporal": "#produtos",
    "cremecorporal": "#produtos",
    "creme": "#produtos",
    "serum": "#produtos",
    "sérum": "#produtos",
    "sabonete": "#produtos",

    // PACOTES
    "pacote": "#pacotes",
    "pacotes": "#pacotes",
    "combo": "#pacotes",
    "combos": "#pacotes",

    // SOBRE
    "quem somos": "#sobre",
    "sobre": "#sobre",
    "equipe": "#sobre",
    "funcionarios": "#sobre",
    "funcionários": "#sobre",

    // EXPERIÊNCIA
    "experiencia": "#experiencia",
    "experiência": "#experiencia",
    "spa": "#experiencia",
    "bem estar": "#experiencia",
    "bem-estar": "#experiencia",

    // DEPOIMENTOS
    "depoimento": "#depoimentos",
    "depoimentos": "#depoimentos",
    "avaliacoes": "#depoimentos",
    "avaliações": "#depoimentos",
    "clientes": "#depoimentos",

    // AGENDAMENTO
    "agendar": "#presente",
    "agendamento": "#presente",
    "agenda": "#presente",
    "marcar": "#presente",
    "marcar horario": "#presente",
    "marcar horário": "#presente",

    // LOCALIZAÇÃO
    "local": "#local",
    "localizacao": "#local",
    "localização": "#local",
    "endereco": "#local",
    "endereço": "#local",
    "onde fica": "#local",
    "como chegar": "#local",

    // CONTATO
    "contato": "#local",
    "contatos": "#local",
    "falar conosco": "#local",

    // REDES SOCIAIS
    "whatsapp": "#local",
    "whats": "#local",
    "zap": "#local",
    "instagram": "#local",
    "insta": "#local",
    "rede social": "#local"

};


/* =====================================
   FUNÇÃO PARA NORMALIZAR PESQUISA
===================================== */

function normalizarTexto(texto) {

    return texto
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


/* =====================================
   PESQUISA
===================================== */

if (searchForm && searchInput) {

    searchForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const pesquisaOriginal = searchInput.value.trim();

        if (!pesquisaOriginal) return;

        const pesquisa = normalizarTexto(pesquisaOriginal);

        let destinoSelector = null;


        /* ---------------------------------
           1. PROCURA NAS PALAVRAS-CHAVE
        --------------------------------- */

        for (const palavra in pesquisas) {

            const palavraNormalizada = normalizarTexto(palavra);

            if (
                pesquisa === palavraNormalizada ||
                pesquisa.includes(palavraNormalizada)
            ) {

                destinoSelector = pesquisas[palavra];

                break;
            }

        }


        /* ---------------------------------
           2. SE NÃO ENCONTROU,
              PROCURA NOS LINKS DO MENU
        --------------------------------- */

        if (!destinoSelector && typeof linksMenu !== "undefined") {

            const linkEncontrado = Array.from(linksMenu).find(link => {

                const texto = normalizarTexto(link.textContent);

                return texto.includes(pesquisa);

            });

            if (linkEncontrado) {

                destinoSelector =
                    linkEncontrado.getAttribute("href");

            }

        }


        /* ---------------------------------
           3. IR PARA A SEÇÃO
        --------------------------------- */

        if (destinoSelector) {

            const destino =
                document.querySelector(destinoSelector);

            if (destino) {

                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /* Atualiza menu ativo */

                if (typeof linksMenu !== "undefined") {

                    linksMenu.forEach(link => {
                        link.classList.remove("active");
                    });

                    const linkAtivo =
                        document.querySelector(
                            `.nav-links a[href="${destinoSelector}"]`
                        );

                    if (linkAtivo) {
                        linkAtivo.classList.add("active");
                    }

                }


                /* Fecha menu mobile */

                if (typeof navLinks !== "undefined" && navLinks) {
                    navLinks.classList.remove("show");
                }


                /* Limpa pesquisa */

                searchInput.value = "";

            }

        } else {

            alert(
                "Não encontramos essa seção. " +
                "Tente pesquisar por massagens, produtos, pacotes ou localização."
            );

        }

    });

}

/* =========================================
   PACOTE PERSONALIZADO
========================================= */

const choices = document.querySelectorAll(".choice");
const totalElement = document.getElementById("total");

let total = 0;

choices.forEach(choice => {

    choice.addEventListener("click", () => {

        const price = Number(choice.dataset.price);

        /* ---------------------------------
           SE JÁ ESTIVER SELECIONADO
        --------------------------------- */

        if (choice.classList.contains("active")) {

            choice.classList.remove("active");

            total -= price;

        } else {

            choice.classList.add("active");

            total += price;

        }


        /* ---------------------------------
           ANIMAÇÃO DO PREÇO
        --------------------------------- */

        totalElement.classList.remove("price-update");

        void totalElement.offsetWidth;

        totalElement.classList.add("price-update");


        /* ---------------------------------
           ATUALIZA O VALOR
        --------------------------------- */

        totalElement.textContent =
            `R$ ${total.toLocaleString("pt-BR")}`;

    });

});


/* =========================================
   RESERVAR PACOTE PERSONALIZADO
========================================= */

function reservarPersonalizado() {

    const selecionados = Array.from(
        document.querySelectorAll(".choice.active")
    );

    if (selecionados.length === 0) {

        alert(
            "Escolha pelo menos um serviço para criar sua experiência."
        );

        return;
    }


    const servicos = selecionados.map(item => {

        return item.textContent
            .replace(/\+\s*R\$\s*\d+/g, "")
            .trim();

    });


    const mensagem =
        `Olá! Gostaria de reservar meu ritual personalizado na Maresia.%0A%0A` +
        `Serviços escolhidos:%0A` +
        servicos.map(servico => `• ${servico}`).join("%0A") +
        `%0A%0AValor estimado: R$ ${total}`;


    /* COLOQUE AQUI O NÚMERO DO WHATSAPP */

    const numeroWhatsApp = "5500000000000";

    const url =
        `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;


    window.open(url, "_blank");
}

