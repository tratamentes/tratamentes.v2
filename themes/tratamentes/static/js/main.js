// TrataMentes - JavaScript Principal

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animação fade-in para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.card, .problem-card').forEach(el => {
        observer.observe(el);
    });
    
    // Menu ativo baseado na página atual
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Tracking de cliques em botões CTA
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            // Analytics tracking pode ser adicionado aqui
            console.log('CTA clicked:', this.textContent.trim());
        });
    });
    
    // Tracking de cliques em telefone
    document.querySelectorAll('a[href^="tel:"]').forEach(tel => {
        tel.addEventListener('click', function() {
            console.log('Phone clicked:', this.getAttribute('href'));
        });
    });
    
    // Melhorar acessibilidade - adicionar indicadores de foco
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Lazy loading para imagens (se houver)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Scroll suave para o topo
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Adicionar botão de scroll to top se necessário
    let scrollTopButton = document.querySelector('.scroll-to-top');
    if (!scrollTopButton) {
        scrollTopButton = document.createElement('button');
        scrollTopButton.className = 'scroll-to-top';
        scrollTopButton.innerHTML = '↑';
        scrollTopButton.setAttribute('aria-label', 'Voltar ao topo');
        scrollTopButton.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
        `;
        document.body.appendChild(scrollTopButton);
    }
    
    scrollTopButton.addEventListener('click', scrollToTop);
    
    // Mostrar/esconder botão de scroll to top
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.visibility = 'visible';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.visibility = 'hidden';
        }
    });
    
    // Prevenção de FOUC (Flash of Unstyled Content)
    document.body.style.visibility = 'visible';
    
    console.log('TrataMentes website loaded successfully!');
});

