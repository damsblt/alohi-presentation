// Toggle content visibility
function toggleContent(contentId) {
    const content = document.getElementById(contentId);
    const button = content.previousElementSibling;
    const icon = button.querySelector('i');
    
    content.classList.toggle('active');
    
    // Update button text and icon
    if (content.classList.contains('active')) {
        button.querySelector('span').textContent = button.querySelector('span').textContent.replace('View', 'Hide');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        button.querySelector('span').textContent = button.querySelector('span').textContent.replace('Hide', 'View');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

// Smooth scrolling for navigation links and progress dots
document.querySelectorAll('a[href^="#"], .progress-dot').forEach(element => {
    element.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href') || `#${this.getAttribute('data-section')}`;
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const verticalNav = document.querySelector('.vertical-nav');

mobileMenuToggle.addEventListener('click', () => {
    verticalNav.classList.toggle('active');
    mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
    mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
});

// Navigation Controls
const prevButton = document.querySelector('.nav-control.prev');
const nextButton = document.querySelector('.nav-control.next');

function navigateToSection(direction) {
    const sections = Array.from(document.querySelectorAll('.section'));
    const currentSection = document.querySelector('.section.active');
    const currentIndex = sections.indexOf(currentSection);
    
    let targetIndex;
    if (direction === 'next' && currentIndex < sections.length - 1) {
        targetIndex = currentIndex + 1;
    } else if (direction === 'prev' && currentIndex > 0) {
        targetIndex = currentIndex - 1;
    } else {
        return;
    }
    
    sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
}

prevButton.addEventListener('click', () => navigateToSection('prev'));
nextButton.addEventListener('click', () => navigateToSection('next'));

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        navigateToSection('next');
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        navigateToSection('prev');
    }
});

// Enhanced Section Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Animate content cards with delay
            const cards = entry.target.querySelectorAll('.content-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 200);
            });
            
            // Update progress line
            const progressLine = document.querySelector('.progress-line');
            const progress = (Array.from(document.querySelectorAll('.section')).indexOf(entry.target) + 1) / document.querySelectorAll('.section').length * 100;
            progressLine.style.height = `${progress}%`;
        } else {
            entry.target.classList.remove('active');
            entry.target.querySelectorAll('.content-card').forEach(card => {
                card.classList.remove('animate');
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!verticalNav.contains(e.target) && !mobileMenuToggle.contains(e.target) && verticalNav.classList.contains('active')) {
        verticalNav.classList.remove('active');
        mobileMenuToggle.querySelector('i').classList.add('fa-bars');
        mobileMenuToggle.querySelector('i').classList.remove('fa-times');
    }
});

// Prevent scroll when mobile menu is open
verticalNav.addEventListener('touchmove', (e) => {
    if (verticalNav.classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });

// Get the main content scroll container
const mainContent = document.querySelector('.main-content');

function updateActiveStates() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressDots = document.querySelectorAll('.progress-dot');
    const progressLine = document.querySelector('.progress-line');

    let closestSection = null;
    let minDistance = Infinity;
    const containerRect = mainContent.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Calculate section center relative to the scroll container
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - containerCenter);
        if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
        }
    });

    const currentSectionId = closestSection ? closestSection.getAttribute('id') : '';

    // Update navigation links
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === currentSectionId);
    });

    // Update progress dots
    progressDots.forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('data-section') === currentSectionId);
    });

    // Update progress line
    const totalSections = sections.length;
    const currentIndex = Array.from(sections).findIndex(section => section.getAttribute('id') === currentSectionId);
    const progress = ((currentIndex + 1) / totalSections) * 100;
    progressLine.style.height = `${progress}%`;
}

// Listen to main-content scroll instead of window
let isScrolling = false;
mainContent.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            updateActiveStates();
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Initial update of active states
updateActiveStates();

// Toggle iframe visibility for a section
function toggleIframe(iframeId) {
    const iframeContainer = document.getElementById(iframeId);
    if (!iframeContainer) return;
    const isVisible = iframeContainer.style.display !== 'none';
    iframeContainer.style.display = isVisible ? 'none' : 'block';
}

// Fullscreen Iframe Modal for Digital Details
function openFullscreenIframe(src) {
    const modal = document.getElementById('fullscreen-iframe-modal');
    const iframe = document.getElementById('fullscreen-iframe');
    iframe.src = src;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeFullscreenIframe() {
    const modal = document.getElementById('fullscreen-iframe-modal');
    const iframe = document.getElementById('fullscreen-iframe');
    iframe.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Expand timeline iframe below the timeline (not modal)
function expandTimelineIframe(src, dotElem) {
    const container = document.getElementById('timeline-iframe-container');
    const allDots = document.querySelectorAll('.timeline-dot');
    // Remove active state from all dots
    allDots.forEach(dot => dot.classList.remove('active'));
    // If already open with this src, close it
    if (container.dataset.src === src && container.style.display !== 'none') {
        container.style.display = 'none';
        container.innerHTML = '';
        container.dataset.src = '';
        return;
    }
    // Set active state
    dotElem.classList.add('active');
    // Show and load iframe
    container.style.display = 'block';
    container.innerHTML = `<iframe src="${src}" frameborder="0" loading="lazy"></iframe>`;
    container.dataset.src = src;
} 