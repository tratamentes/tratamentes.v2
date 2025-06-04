/**
 * main.js - JavaScript otimizado para performance
 * TrataMentes - Versão 4.0 (2025)
 * 
 * Otimizado para reduzir blocking time e melhorar Core Web Vitals
 */

// Configuração global mínima
const CONFIG = {
  bookingUrl: 'https://buk.pt/tratamentes?embed=true',
  animationDelay: 150
};

// Estado da aplicação
const STATE = {
  modalOpen: false,
  menuOpen: false
};

// Inicialização crítica (apenas o essencial)
document.addEventListener('DOMContentLoaded', initCritical);

// Inicialização não crítica (após load)
window.addEventListener('load', initNonCritical);

/**
 * Inicialização crítica - apenas funcionalidades essenciais
 */
function initCritical() {
  // Menu mobile (essencial para navegação)
  initMobileMenu();
  
  // Navegação básica
  initBasicNavigation();
}

/**
 * Inicialização não crítica - funcionalidades secundárias
 */
function initNonCritical() {
  // Carregar módulos não críticos de forma assíncrona
  requestIdleCallback(() => {
    initBookingSystem();
    initScrollEffects();
    initAccessibility();
  });
}

/**
 * Menu mobile otimizado
 */
function initMobileMenu() {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('.navbar-menu');
  
  if (!burger || !menu) return;
  
  burger.addEventListener('click', (e) => {
    e.preventDefault();
    
    const isActive = burger.classList.contains('is-active');
    
    // Toggle classes
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
    
    // Update state
    STATE.menuOpen = !isActive;
    
    // Accessibility
    burger.setAttribute('aria-expanded', STATE.menuOpen);
    
    // Prevent body scroll on mobile
    document.body.classList.toggle('menu-open', STATE.menuOpen);
  });
  
  // Fechar menu ao clicar em links
  menu.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      burger.classList.remove('is-active');
      menu.classList.remove('is-active');
      STATE.menuOpen = false;
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  });
}

/**
 * Navegação básica
 */
function initBasicNavigation() {
  // Smooth scroll para âncoras
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (!target) return;
    
    e.preventDefault();
    
    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
}

/**
 * Sistema de agendamento (carregado de forma assíncrona)
 */
function initBookingSystem() {
  // Cache de elementos
  const modal = document.getElementById('modalAgendamento');
  const iframe = document.getElementById('frameAgendamento');
  const spinner = document.getElementById('loadingSpinner');
  
  if (!modal || !iframe) return;
  
  // Event delegation para botões de agendamento
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-agendamento, .button[href*="agendar"]');
    if (!btn) return;
    
    e.preventDefault();
    openBookingModal();
  });
  
  // Fechar modal
  modal.addEventListener('click', (e) => {
    if (e.target.matches('.modal-background, .delete')) {
      closeBookingModal();
    }
  });
  
  // ESC para fechar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && STATE.modalOpen) {
      closeBookingModal();
    }
  });
  
  function openBookingModal() {
    if (spinner) spinner.style.display = 'flex';
    
    iframe.src = CONFIG.bookingUrl;
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
    
    STATE.modalOpen = true;
    modal.setAttribute('aria-hidden', 'false');
    
    // Fade in
    requestAnimationFrame(() => {
      modal.classList.add('is-active');
    });
    
    // Hide spinner when loaded
    iframe.onload = () => {
      if (spinner) spinner.style.display = 'none';
      iframe.focus();
    };
  }
  
  function closeBookingModal() {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    STATE.modalOpen = false;
    
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      iframe.src = '';
    }, 300);
  }
  
  // Expor funções globalmente se necessário
  window.openBookingModal = openBookingModal;
  window.closeBookingModal = closeBookingModal;
}

/**
 * Efeitos de scroll (não críticos)
 */
function initScrollEffects() {
  // Lazy loading de imagens
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
          }
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
  
  // Animações de entrada
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animationObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animationObserver.observe(el);
  });
}

/**
 * Melhorias de acessibilidade
 */
function initAccessibility() {
  // Skip links
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(skipLink.getAttribute('href'));
      if (target) {
        target.focus();
        target.scrollIntoView();
      }
    });
  }
  
  // Focus management
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
}

/**
 * Utility: requestIdleCallback polyfill
 */
window.requestIdleCallback = window.requestIdleCallback || function(cb) {
  const start = Date.now();
  return setTimeout(() => {
    cb({
      didTimeout: false,
      timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

