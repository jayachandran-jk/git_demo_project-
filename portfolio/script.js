document.addEventListener('DOMContentLoaded', () => {
    // Loader handling
    const loader = document.getElementById('loader');
    const decryptText = document.querySelector('.decrypt-text');
    const originalText = decryptText.dataset.text;
    
    let iterations = 0;
    const interval = setInterval(() => {
        decryptText.innerText = originalText.split("")
            .map((char, index) => {
                if(index < iterations) return originalText[index];
                return String.fromCharCode(65 + Math.floor(Math.random() * 26));
            })
            .join("");
        
        if(iterations >= originalText.length) clearInterval(interval);
        iterations += 1/3;
    }, 30);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2200);
    });

    // Background glow follow effect
    const glow = document.querySelector('.glow-point');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX - 300;
        const y = e.clientY - 300;
        glow.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Scroll entry animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal class and observe
    const elementsToReveal = document.querySelectorAll('.hero-text, .timeline-item, .card, .skill-group, .project-card, .cert-item, .achievement');
    
    // Inject keyframes for reveal effect
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            animation: revealEffect 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @keyframes revealEffect {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .hero-text, .timeline-item, .card, .skill-group, .project-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);

    elementsToReveal.forEach(el => observer.observe(el));

    // Staggered delay for timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Simple smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scrollspy
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Add active style via JS
    const style2 = document.createElement('style');
    style2.textContent = `
        .nav-links a.active {
            color: var(--primary);
            font-weight: 600;
        }
        .nav-links a.active::before {
            content: '>';
            margin-right: 4px;
        }
    `;
    document.head.appendChild(style2);
});
