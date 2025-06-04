// TrataMentes - JavaScript Principal
(function() {
    'use strict';
    
    // Aguardar carregamento do DOM
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScroll();
        initLazyLoading();
        initFormValidation();
    });
    
    // ===== MENU MOBILE ===== 
    function initMobileMenu() {
        const toggle = document.getElementById('navbar-toggle');
        const menu = document.getElementById('navbar-menu');
        
        if (!toggle || !menu) return;
        
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
            
            // Acessibilidade
            const isExpanded = menu.classList.contains('active');
            toggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Fechar menu ao clicar em link
        const navLinks = menu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // ===== SCROLL SUAVE =====
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (!target) return;
                
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // ===== LAZY LOADING DE IMAGENS =====
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    // ===== VALIDAÇÃO DE FORMULÁRIOS =====
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (!validateForm(this)) {
                    e.preventDefault();
                }
            });
            
            // Validação em tempo real
            const inputs = form.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
            });
        });
    }
    
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';
        
        // Remover mensagens de erro anteriores
        removeErrorMessage(field);
        
        // Verificar se é obrigatório
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'Este campo é obrigatório.';
        }
        // Validar email
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Por favor, insira um email válido.';
            }
        }
        // Validar telefone
        else if (type === 'tel' && value) {
            const phoneRegex = /^[+]?[\d\s\-\(\)]{9,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                message = 'Por favor, insira um número de telefone válido.';
            }
        }
        
        // Mostrar erro se inválido
        if (!isValid) {
            showErrorMessage(field, message);
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
        
        return isValid;
    }
    
    function showErrorMessage(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
    
    function removeErrorMessage(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // ===== UTILITÁRIOS =====
    
    // Debounce function para performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function para scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // ===== ANALYTICS E TRACKING =====
    
    // Tracking de cliques em botões CTA
    function trackCTAClicks() {
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                const buttonHref = this.href || 'no-href';
                
                // Google Analytics 4 (se disponível)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'CTA',
                        event_label: buttonText,
                        value: buttonHref
                    });
                }
                
                // Console log para debug
                console.log('CTA Click:', buttonText, buttonHref);
            });
        });
    }
    
    // Inicializar tracking quando disponível
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackCTAClicks);
    } else {
        trackCTAClicks();
    }
    
})();

