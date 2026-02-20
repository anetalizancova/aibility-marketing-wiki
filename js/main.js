/* ==========================================================================
   Filip DS - Interactive Components
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initAccordions();
    initPromptCards();
    initCopyButtons();
    initCarousel();
    initTestimonialsCarousel();
    initHeader();
    initFadeInOnScroll();
});

/* ==========================================================================
   Accordion Component
   ========================================================================== */

function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const items = accordion.querySelectorAll('.accordion__item');
        
        items.forEach(item => {
            const header = item.querySelector('.accordion__header');
            const content = item.querySelector('.accordion__content');
            const icon = item.querySelector('.accordion__icon');
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('accordion__item--active');
                
                // Close all items in this accordion
                items.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.accordion__content');
                    const otherIcon = otherItem.querySelector('.accordion__icon');
                    const otherHeader = otherItem.querySelector('.accordion__header');
                    
                    otherItem.classList.remove('accordion__item--active');
                    otherContent.style.display = 'none';
                    
                    if (otherIcon) {
                        otherIcon.classList.remove('accordion__icon--active');
                    }
                    
                    if (otherHeader) {
                        otherHeader.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('accordion__item--active');
                    content.style.display = 'block';
                    header.setAttribute('aria-expanded', 'true');
                    
                    if (icon) {
                        icon.classList.add('accordion__icon--active');
                    }
                    
                    // Smooth height animation
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    header.setAttribute('aria-expanded', 'false');
                }
            });
        });
    });
}

/* ==========================================================================
   Prompt Cards - Expand/Collapse
   ========================================================================== */

function initPromptCards() {
    const expandButtons = document.querySelectorAll('[data-expand]');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.prompt-card');
            const content = card.querySelector('.prompt-card__content');
            const code = content.querySelector('.prompt-card__code');
            
            const isExpanded = button.classList.contains('is-expanded');
            
            if (isExpanded) {
                // Collapse
                button.classList.remove('is-expanded');
                button.innerHTML = `
                    Zobrazit celý prompt
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                code.textContent = code.dataset.preview || code.textContent.substring(0, 200) + '...';
            } else {
                // Expand
                button.classList.add('is-expanded');
                button.innerHTML = `
                    Skrýt prompt
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                
                // Store preview if not already stored
                if (!code.dataset.preview) {
                    code.dataset.preview = code.textContent;
                }
                
                // Show full content (simulated)
                code.textContent = code.dataset.full || getFullPromptContent(card);
            }
        });
    });
}

function getFullPromptContent(card) {
    const title = card.querySelector('.prompt-card__title')?.textContent || '';
    
    if (title.includes('psaní článků')) {
        return `Jsi zkušený copywriter a content creator. Tvým úkolem je pomáhat s tvorbou blogových článků.

PRAVIDLA:
- Piš v češtině, přirozeně a srozumitelně
- Používej aktivní slovesa
- Strukturuj text do přehledných odstavců
- Přidávej relevantní příklady

TVOJE ROLE:
- Pomáháš s tvorbou obsahu pro blog
- Navrhuju strukturu článků
- Edituješ a vylepšuješ texty
- Optimalizuješ pro SEO

FORMÁT ODPOVĚDI:
- Vždy začni stručným shrnutím
- Používej nadpisy a odrážky
- Končí call-to-action nebo závěrem`;
    }
    
    if (title.includes('Analytik')) {
        return `Jsi datový analytik specializující se na business intelligence.

TVOJE ROLE:
- Analyzuješ data a hledáš vzorce
- Vytváříš přehledné reporty
- Interpretuješ statistiky
- Navrhuješ datově podložená rozhodnutí

PRAVIDLA:
- Vždy uvádej zdroj dat
- Používej vizualizace kde je to vhodné
- Vysvětluj metodologii
- Upozorňuj na limitace dat

FORMÁT:
- Executive summary na začátku
- Klíčová zjištění v odrážkách
- Detailní analýza v sekcích
- Doporučení na závěr`;
    }
    
    if (title.includes('Mentor')) {
        return `Jsi zkušený life coach a mentor specializující se na osobní rozvoj a produktivitu.

TVOJE OSOBNOST:
- Empatický, ale přímý
- Motivující bez přehnaného pozitivismu
- Praktický a orientovaný na výsledky

TVOJE ROLE:
- Pomáháš s definováním cílů
- Podporuješ budování návyků
- Nabízíš perspektivu a reflexi
- Držíš zodpovědnost

PRAVIDLA:
- Ptej se na konkrétní situace
- Nabízej konkrétní kroky, ne obecné rady
- Oslavuj pokrok, ne jen výsledky
- Respektuj tempo klienta

FORMÁT KONVERZACE:
- Začni otázkou na aktuální stav
- Reflektuj, co slyšíš
- Nabídni 2-3 konkrétní kroky
- Dohodněte se na follow-up`;
    }
    
    return card.querySelector('.prompt-card__code')?.textContent || '';
}

/* ==========================================================================
   Copy to Clipboard
   ========================================================================== */

function initCopyButtons() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const card = button.closest('.prompt-card');
            const code = card.querySelector('.prompt-card__code');
            const textToCopy = code.dataset.full || code.textContent;
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Show success feedback
                const originalHTML = button.innerHTML;
                button.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                button.style.color = '#10B981';
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

/* ==========================================================================
   Phone Mockup Carousel
   ========================================================================== */

function initCarousel() {
    const prevBtn = document.querySelector('[data-prev]');
    const nextBtn = document.querySelector('[data-next]');
    const counter = document.querySelector('.phone-mockup__counter');
    const progressBars = document.querySelectorAll('.phone-mockup__progress-bar');
    const content = document.querySelector('.phone-mockup__content');
    
    if (!prevBtn || !nextBtn) return;
    
    let currentSlide = 0;
    const totalSlides = 7;
    
    const slides = [
        {
            label: '2024 WRAPPED',
            title: 'Tvoje AI',
            highlight: 'transformace',
            cta: 'Klikni pro pokračování →',
            gradient: 'linear-gradient(180deg, #581C87 0%, #7C3AED 50%, #4F46E5 100%)'
        },
        {
            label: 'STATISTIKA',
            title: 'Letos jsi využil',
            highlight: '1,247',
            subtitle: 'AI promptů',
            gradient: 'linear-gradient(180deg, #0F766E 0%, #14B8A6 50%, #2DD4BF 100%)'
        },
        {
            label: 'ÚSPORA ČASU',
            title: 'Ušetřil jsi',
            highlight: '127h',
            subtitle: 'pracovního času',
            gradient: 'linear-gradient(180deg, #9F1239 0%, #F43F5E 50%, #FB7185 100%)'
        },
        {
            label: 'TOP NÁSTROJ',
            title: 'Nejčastěji používáš',
            highlight: 'Claude',
            subtitle: '68% všech dotazů',
            gradient: 'linear-gradient(180deg, #1E40AF 0%, #3B82F6 50%, #60A5FA 100%)'
        },
        {
            label: 'OSOBNOST',
            title: 'Tvůj AI typ je',
            highlight: 'Stratég',
            subtitle: 'Analytický a systematický',
            gradient: 'linear-gradient(180deg, #7C2D12 0%, #EA580C 50%, #FB923C 100%)'
        },
        {
            label: 'ŽEBŘÍČEK',
            title: 'Patříš mezi',
            highlight: 'Top 5%',
            subtitle: 'nejaktivnějších uživatelů',
            gradient: 'linear-gradient(180deg, #4C1D95 0%, #8B5CF6 50%, #A78BFA 100%)'
        },
        {
            label: '2025',
            title: 'Připraven na',
            highlight: 'další level?',
            cta: 'Sdílet výsledky →',
            gradient: 'linear-gradient(180deg, #581C87 0%, #7C3AED 50%, #4F46E5 100%)'
        }
    ];
    
    function updateSlide() {
        const slide = slides[currentSlide];
        const frame = document.querySelector('.phone-mockup__frame');
        
        // Update gradient
        frame.style.background = slide.gradient;
        
        // Update content
        content.innerHTML = `
            <span class="phone-mockup__label">${slide.label}</span>
            <h3 class="phone-mockup__title">${slide.title}</h3>
            <h2 class="phone-mockup__highlight">${slide.highlight}</h2>
            ${slide.subtitle ? `<p class="phone-mockup__subtitle" style="color: rgba(255,255,255,0.7); margin-top: 8px;">${slide.subtitle}</p>` : ''}
            ${slide.cta ? `<p class="phone-mockup__cta">${slide.cta}</p>` : ''}
        `;
        
        // Update counter
        counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        
        // Update progress bars
        progressBars.forEach((bar, index) => {
            bar.classList.toggle('phone-mockup__progress-bar--active', index <= currentSlide);
        });
        
        // Update button states
        prevBtn.classList.toggle('phone-mockup__btn--active', currentSlide > 0);
        nextBtn.classList.toggle('phone-mockup__btn--active', currentSlide < totalSlides - 1);
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlide();
        }
    });
    
    // Click on phone content to advance
    content.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlide();
        }
    });
    
    // Initialize
    updateSlide();
}

/* ==========================================================================
   Testimonials Carousel
   ========================================================================== */

function initTestimonialsCarousel() {
    const carousel = document.querySelector('[data-carousel="testimonials"]');
    if (!carousel) return;
    
    const track = carousel.querySelector('.testimonials-carousel__track');
    const slides = carousel.querySelectorAll('.testimonials-carousel__slide');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');
    
    if (!track || !slides.length || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    let slidesPerView = 1;
    let totalSlides = slides.length;
    let autoScrollInterval = null;
    const autoScrollDelay = 5000; // 5 seconds
    
    // Calculate slides per view based on screen size
    function updateSlidesPerView() {
        if (window.innerWidth >= 1024) {
            slidesPerView = 3;
        } else if (window.innerWidth >= 768) {
            slidesPerView = 2;
        } else {
            slidesPerView = 1;
        }
    }
    
    // Create dots
    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        const totalPages = Math.ceil(totalSlides / slidesPerView);
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'testimonials-carousel__dot';
            dot.setAttribute('aria-label', `Přejít na stránku ${i + 1}`);
            dot.addEventListener('click', () => goToPage(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        // Calculate slide width including gap
        const wrapper = carousel.querySelector('.testimonials-carousel__wrapper');
        if (!wrapper) return;
        
        const wrapperWidth = wrapper.offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 24;
        
        // Calculate slide width based on slides per view
        let slideWidth;
        if (slidesPerView === 1) {
            slideWidth = wrapperWidth;
        } else if (slidesPerView === 2) {
            slideWidth = (wrapperWidth - gap) / 2;
        } else {
            slideWidth = (wrapperWidth - (gap * 2)) / 3;
        }
        
        const offset = -currentIndex * (slideWidth + gap);
        track.style.transform = `translateX(${offset}px)`;
        
        // Update button states
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        // Update dots
        updateDots();
    }
    
    // Update active dot
    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.testimonials-carousel__dot');
        const currentPage = Math.floor(currentIndex / slidesPerView);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('testimonials-carousel__dot--active', index === currentPage);
        });
    }
    
    // Go to specific page
    function goToPage(pageIndex) {
        const maxPage = Math.ceil(totalSlides / slidesPerView) - 1;
        const targetPage = Math.max(0, Math.min(pageIndex, maxPage));
        currentIndex = targetPage * slidesPerView;
        updateCarousel();
    }
    
    // Go to next slide
    function nextSlide() {
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        if (currentIndex < maxIndex) {
            currentIndex = Math.min(currentIndex + slidesPerView, maxIndex);
            updateCarousel();
        } else {
            // Loop back to start
            currentIndex = 0;
            updateCarousel();
        }
    }
    
    // Go to previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex = Math.max(0, currentIndex - slidesPerView);
            updateCarousel();
        }
    }
    
    // Auto-scroll functionality
    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => {
            nextSlide();
        }, autoScrollDelay);
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }
    
    // Pause auto-scroll on hover/interaction
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
    
    // Pause auto-scroll when user interacts
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoScroll();
        // Restart after delay
        setTimeout(startAutoScroll, autoScrollDelay * 2);
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoScroll();
        // Restart after delay
        setTimeout(startAutoScroll, autoScrollDelay * 2);
    });
    
    // Pause on touch
    track.addEventListener('touchstart', stopAutoScroll, { passive: true });
    track.addEventListener('touchend', () => {
        setTimeout(startAutoScroll, autoScrollDelay * 2);
    }, { passive: true });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldSlidesPerView = slidesPerView;
            updateSlidesPerView();
            
            // Recalculate current index if slides per view changed
            if (oldSlidesPerView !== slidesPerView) {
                const currentPage = Math.floor(currentIndex / oldSlidesPerView);
                currentIndex = currentPage * slidesPerView;
            }
            
            createDots();
            updateCarousel();
        }, 250);
    });
    
    // Initial update after a short delay to ensure layout is complete
    requestAnimationFrame(() => {
        updateCarousel();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Initialize
    updateSlidesPerView();
    createDots();
    updateCarousel();
    
    // Start auto-scroll
    startAutoScroll();
    
    // Pause when page is not visible (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    });
}

/* ==========================================================================
   Header Functionality
   ========================================================================== */

function initHeader() {
    const header = document.getElementById('header');
    const menuToggle = header?.querySelector('.header__menu-toggle');
    const mobileNav = header?.querySelector('.header__mobile-nav');
    
    if (!header || !menuToggle || !mobileNav) return;
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.getAttribute('data-state') === 'open';
        mobileNav.setAttribute('data-state', isOpen ? 'closed' : 'open');
        menuToggle.setAttribute('aria-expanded', !isOpen);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && mobileNav.getAttribute('data-state') === 'open') {
            mobileNav.setAttribute('data-state', 'closed');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle dropdown toggles (if needed in future)
    const dropdowns = header.querySelectorAll('[aria-expanded]');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (dropdown.classList.contains('header__nav-item--dropdown') || 
                dropdown.classList.contains('header__mobile-nav-item--dropdown')) {
                const isExpanded = dropdown.getAttribute('aria-expanded') === 'true';
                dropdown.setAttribute('aria-expanded', !isExpanded);
            }
        });
    });
}

/* ==========================================================================
   Fade-in on Scroll Animation
   ========================================================================== */

function initFadeInOnScroll() {
    // Use requestAnimationFrame to defer initialization and avoid blocking initial render
    requestAnimationFrame(() => {
        // Select all elements that should fade in (you can customize this selector)
        const elementsToAnimate = document.querySelectorAll(`
            section,
            .section,
            .hero,
            .hero__content,
            .section__title,
            .section__description,
            .cards-grid > *,
            .feature-card,
            .story-card,
            .blog-card,
            .prompt-card,
            .quote,
            .step-card,
            .stat,
            .badge,
            .accordion__item,
            .showcase-block,
            .component-showcase,
            .lists-grid > *,
            .presentation-feature,
            .phone-mockup,
            .comparison-table,
            .stats-grid > *,
            .buttons-row,
            .badges-row
        `);
        
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop observing once animated to reduce overhead
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
        });
        
        // Observe all elements
        elementsToAnimate.forEach(element => {
            element.classList.add('fade-in-on-scroll');
            observer.observe(element);
        });
    });
}

/* ==========================================================================
   Smooth Scroll (optional enhancement)
   ========================================================================== */

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
