/**
 * Moov Africa Tchad - JavaScript
 * Gestion des interactions: menu hamburger, FAQ accordéon, smooth scroll
 */

// ============================================
// Menu Hamburger
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu hamburger
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            // Empêcher le scroll du body quand le menu est ouvert
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(event) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // FAQ Accordéon
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function() {
                // Fermer les autres items ouverts
                const isActive = item.classList.contains('active');

                // Fermer tous les items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Ouvrir l'item cliqué s'il n'était pas actif
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // ============================================
    // Smooth Scroll pour les liens d'ancrage
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens vides ou juste "#"
            if (href === '#' || href === '') {
                return;
            }

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calculer la position en tenant compte du header fixe
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Scroll horizontal amélioré pour les offres
    // ============================================
    const offersScroll = document.querySelector('.offers-scroll');
    
    if (offersScroll) {
        // Ajouter un indicateur visuel de scroll sur mobile
        let isScrolling = false;
        
        offersScroll.addEventListener('scroll', function() {
            if (!isScrolling) {
                isScrolling = true;
                offersScroll.style.scrollBehavior = 'smooth';
            }
        });

        // Réinitialiser après un court délai
        offersScroll.addEventListener('scrollend', function() {
            isScrolling = false;
        });
    }

    // ============================================
    // Animation au scroll (fade-in pour les sections)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les sections principales
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ============================================
    // Sticky Bar - Actions rapides
    // ============================================
    const stickyBar = document.querySelector('.sticky-bar');
    const stickyButtons = document.querySelectorAll('.sticky-btn');

    if (stickyButtons.length > 0) {
        stickyButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Actions selon le bouton cliqué
                switch(index) {
                    case 0: // Recharger
                        window.location.href = '#offres';
                        break;
                    case 1: // Acheter
                        window.location.href = '#offres';
                        break;
                    case 2: // Support
                        window.location.href = '#aide';
                        break;
                }
            });
        });
    }

    // ============================================
    // Boutons d'action - Interactions
    // ============================================
    const actionCards = document.querySelectorAll('.action-card');

    actionCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            switch(index) {
                case 0: // Acheter un forfait
                    window.location.href = '#offres';
                    break;
                case 1: // Recharger
                    // Ici on pourrait ouvrir un modal ou rediriger
                    alert('Fonctionnalité de recharge à venir');
                    break;
                case 2: // Moov Money
                    window.location.href = '#moov-money';
                    break;
                case 3: // Support
                    window.location.href = '#aide';
                    break;
            }
        });
    });

    // ============================================
    // Boutons de forfaits - Liens tel: pour USSD
    // ============================================
    // Les boutons sont maintenant des liens <a href="tel:*...%23">
    // qui ouvriront automatiquement le composeur téléphonique
    // avec le code USSD pré-rempli. Pas besoin de JavaScript supplémentaire.

    // ============================================
    // Console log pour debug (peut être supprimé en production)
    // ============================================
    console.log('Moov Africa Tchad - Site web chargé avec succès!');
});

// ============================================
// Fonction utilitaire pour le responsive
// ============================================
function isMobile() {
    return window.innerWidth < 768;
}

// Écouter les changements de taille d'écran
window.addEventListener('resize', function() {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    
    // Fermer le menu mobile si on passe en mode desktop
    if (!isMobile() && nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
});
// Show popup on page load
window.addEventListener('load', () => {
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.popup-close');

    // Show popup
    popup.classList.add('active');

    // Close on click of X
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    // Close when clicking outside the popup content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});
