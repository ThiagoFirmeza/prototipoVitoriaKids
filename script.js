// Salve este arquivo como: script.js (SUBSTITUA O ANTIGO)

document.addEventListener('DOMContentLoaded', () => {
    
    // --- CÓDIGO DO MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // --- LÓGICA GERAL DO CARROSSEL ---
    /**
     * Função reutilizável para criar um carrossel.
     * @param {string} trackId - ID do track (o container que se move)
     * @param {string} prevBtnId - ID do botão "anterior"
     * @param {string} nextBtnId - ID do botão "próximo"
     * @param {string} dotsId - ID do container das "bolinhas"
     * @param {number} totalPages - Quantidade total de "páginas" ou "slides"
     */
    function setupCarousel(trackId, prevBtnId, nextBtnId, dotsId, totalPages) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        const dotsContainer = document.getElementById(dotsId);

        // Se os elementos essenciais não existirem, não faz nada
        if (!track || !prevBtn || !nextBtn || !dotsContainer) {
            console.warn(`Carrossel não iniciado: Elementos faltando para ${trackId}`);
            return;
        }

        let currentPage = 0;
        let dots = []; // Array para guardar os botões de bolinha

        // Calcula o quanto o track deve mover (em porcentagem)
        // 100% dividido pelo número de páginas
        const movePercentage = 100 / totalPages; 

        // Cria os dots (bolinhas) de paginação
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === 0) {
                dot.classList.add('active'); // Ativa o primeiro
            }
            dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
            
            dot.addEventListener('click', () => {
                currentPage = i;
                updateSlider();
            });
            
            dotsContainer.appendChild(dot);
            dots.push(dot); // Adiciona o dot ao array
        }
        
        function updateSlider() {
            // Move o track
            track.style.transform = `translateX(-${currentPage * movePercentage}%)`;

            // Habilita/Desabilita botões de seta
            prevBtn.disabled = (currentPage === 0);
            nextBtn.disabled = (currentPage === totalPages - 1);
            
            // Atualiza a classe 'active' dos dots
            dots.forEach((dot, index) => {
                if (index === currentPage) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Event Listeners para os botões de seta
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                updateSlider();
            }
        });

        // Define o estado inicial dos botões ao carregar a página
        updateSlider();
    }

    // --- INICIALIZAÇÃO DOS CARROSSÉIS ---

    // 1. Carrossel de Pilares (Diferenciais)
    setupCarousel('pilar-track', 'pilar-prev', 'pilar-next', 'pilar-dots', 2);

    // 2. Carrossel da Galeria (Sobre Nós)
    setupCarousel('gallery-track', 'gallery-prev', 'gallery-next', 'gallery-dots', 3);

    // 3. Carrossel Unidade Lagoa Nova
    setupCarousel('lagoa-track', 'lagoa-prev', 'lagoa-next', 'lagoa-dots', 3);

    // 4. Carrossel Unidade Parnamirim
    setupCarousel('parnamirim-track', 'parnamirim-prev', 'parnamirim-next', 'parnamirim-dots', 3);

    // 5. Carrossel Unidade Satélite
    setupCarousel('satelite-track', 'satelite-prev', 'satelite-next', 'satelite-dots', 3);
    
    // 6. NOVO: Carrossel da Galeria Principal (7 slides)
    setupCarousel('main-gallery-track', 'main-gallery-prev', 'main-gallery-next', 'main-gallery-dots', 7);

});
