//Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

//Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

//Smooth scrolling for navigation links
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

//Enhanced navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.borderBottom = '3px solid rgba(102, 126, 234, 0.6)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.borderBottom = '3px solid rgba(102, 126, 234, 0.5)';
    }
});

//Advanced intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for multiple elements
            if (entry.target.classList.contains('skill') || entry.target.classList.contains('project-card')) {
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        }
    });
}, observerOptions);

//Observe skill cards with enhanced animations
document.querySelectorAll('.skill').forEach((skill, index) => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(50px)';
    skill.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    skill.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(skill);
});

//Observe project cards with enhanced animations
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    card.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(card);
});

//Observe contact items
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

//Observe experience cards
document.querySelectorAll('.experience-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    card.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(card);
});

//Observe language items
document.querySelectorAll('.language-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

//Observe soft skill tags
document.querySelectorAll('.soft-skill-tag').forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.8)';
    tag.style.transition = 'all 0.5s ease';
    tag.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(tag);
});

//Enhanced typing effect for the main title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add cursor blinking effect
            element.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    type();
}

//Initialize typing effect
window.addEventListener('load', () => {
    const title = document.querySelector('.slider-content h1');
    const originalText = title.textContent;
    typeWriter(title, originalText, 120);
});

//blinking animation
const style = document.createElement('style');
style.textContent = `
    .cursor {
        animation: blink 1s infinite;
        color: #667eea;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

//parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.slider');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

//Enhanced Astronomical background effects - Global theme
function createAstronomicalEffects() {
    const spaceContainer = document.createElement('div');
    spaceContainer.className = 'space-container';
    spaceContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    document.body.appendChild(spaceContainer);
    
    // Create many stars
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'space-star';
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 3;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.9 + 0.3});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            box-shadow: 0 0 ${size * 3}px rgba(102, 126, 234, 0.8), 0 0 ${size * 6}px rgba(118, 75, 162, 0.4);
            animation: space-twinkle ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        spaceContainer.appendChild(star);
    }
    
    // Create Moon
    const moon = document.createElement('div');
    moon.className = 'space-moon';
    moon.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        top: 10%;
        right: 5%;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), rgba(220, 220, 240, 0.8), rgba(180, 180, 200, 0.6));
        box-shadow: 
            0 0 150px rgba(255, 255, 255, 0.7),
            0 0 250px rgba(102, 126, 234, 0.5),
            inset -50px -50px 100px rgba(120, 120, 140, 0.4);
        animation: space-moon-float 30s ease-in-out infinite;
    `;
    spaceContainer.appendChild(moon);
    
    // Add craters to moon
    const moonCraters = document.createElement('div');
    moonCraters.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        top: 10%;
        right: 5%;
        border-radius: 50%;
        background-image: 
            radial-gradient(circle at 25% 30%, rgba(100, 100, 120, 0.5) 0%, transparent 15%),
            radial-gradient(circle at 60% 50%, rgba(90, 90, 110, 0.4) 0%, transparent 12%),
            radial-gradient(circle at 40% 70%, rgba(110, 110, 130, 0.3) 0%, transparent 10%);
    `;
    spaceContainer.appendChild(moonCraters);
    
    // Create large planets
    for (let i = 0; i < 3; i++) {
        const planet = document.createElement('div');
        planet.className = 'space-planet';
        const sizes = [250, 180, 140];
        const positions = [
            {top: '60%', left: '8%'},
            {top: '20%', left: '75%'},
            {top: '75%', left: '70%'}
        ];
        const colors = [
            'rgba(118, 75, 162, 0.6)',
            'rgba(102, 126, 234, 0.5)',
            'rgba(118, 75, 162, 0.4)'
        ];
        const duration = [25, 20, 18];
        
        planet.style.cssText = `
            position: absolute;
            width: ${sizes[i]}px;
            height: ${sizes[i]}px;
            border-radius: 50%;
            top: ${positions[i].top};
            left: ${positions[i].left};
            background: radial-gradient(circle at 30% 30%, ${colors[i]}, rgba(80, 50, 120, 0.3), transparent);
            box-shadow: 
                0 0 ${sizes[i] * 0.8}px ${colors[i]},
                0 0 ${sizes[i] * 1.2}px rgba(102, 126, 234, 0.4),
                inset -${sizes[i] * 0.3}px -${sizes[i] * 0.3}px ${sizes[i] * 0.6}px rgba(60, 30, 100, 0.4);
            animation: space-planet-float ${duration[i]}s ease-in-out infinite;
            filter: blur(${sizes[i] * 0.08}px);
        `;
        spaceContainer.appendChild(planet);
    }
    
    // Create nebulas
    for (let i = 0; i < 4; i++) {
        const nebula = document.createElement('div');
        nebula.className = 'space-nebula';
        const sizes = [450, 380, 320, 280];
        const positions = [
            {top: '15%', left: '12%'},
            {top: '50%', right: '15%'},
            {top: '70%', left: '50%'},
            {bottom: '10%', right: '25%'}
        ];
        const delays = [0, 5, 8, 3];
        
        nebula.style.cssText = `
            position: absolute;
            width: ${sizes[i]}px;
            height: ${sizes[i]}px;
            border-radius: 50%;
            ${Object.entries(positions[i]).map(([k, v]) => `${k}: ${v}`).join('; ')}
            background: radial-gradient(circle, rgba(102, 126, 234, 0.35), rgba(118, 75, 162, 0.25), transparent);
            filter: blur(50px);
            animation: space-nebula-drift ${30 + i * 5}s ease-in-out infinite;
            animation-delay: ${delays[i]}s;
        `;
        spaceContainer.appendChild(nebula);
    }
    
    // Create shooting stars
    for (let i = 0; i < 4; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'space-shooting-star';
        const startX = Math.random() * 100;
        const startY = Math.random() * 40;
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 6;
        
        shootingStar.style.cssText = `
            position: absolute;
            width: 4px;
            height: 120px;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(102, 126, 234, 1), rgba(118, 75, 162, 0.7), transparent);
            left: ${startX}%;
            top: ${startY}%;
            transform: rotate(-45deg);
            transform-origin: top left;
            animation: space-shoot ${duration}s linear infinite;
            animation-delay: ${delay}s;
            box-shadow: 
                0 0 20px rgba(102, 126, 234, 1),
                0 0 40px rgba(118, 75, 162, 0.8),
                0 0 60px rgba(255, 255, 255, 0.5);
        `;
        spaceContainer.appendChild(shootingStar);
    }
    
    // Add CSS animations
    const spaceStyle = document.createElement('style');
    spaceStyle.textContent = `
        @keyframes space-twinkle {
            0%, 100% {
                opacity: 0.4;
                transform: scale(1);
            }
            50% {
                opacity: 1;
                transform: scale(1.3);
            }
        }
        
        @keyframes space-shoot {
            0% {
                transform: translate(0, 0) rotate(-45deg);
                opacity: 0;
            }
            2% {
                opacity: 1;
            }
            98% {
                opacity: 1;
            }
            100% {
                transform: translate(2500px, 2500px) rotate(-45deg);
                opacity: 0;
            }
        }
        
        @keyframes space-moon-float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.85;
            }
            50% {
                transform: translate(-40px, 50px) scale(1.08);
                opacity: 1;
            }
        }
        
        @keyframes space-planet-float {
            0%, 100% {
                transform: translate(0, 0) scale(1) rotate(0deg);
                opacity: 0.7;
            }
            50% {
                transform: translate(60px, -70px) scale(1.12) rotate(180deg);
                opacity: 0.9;
            }
        }
        
        @keyframes space-nebula-drift {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.5;
            }
            50% {
                transform: translate(80px, -90px) scale(1.35);
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(spaceStyle);
}

//Initialize astronomical effects
createAstronomicalEffects();
