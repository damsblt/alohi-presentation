// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    // Budget Chart
    const budgetCtx = document.querySelector('.budget-chart');
    if (budgetCtx) {
        new Chart(budgetCtx, {
            type: 'pie',
            data: {
                labels: ['Sign.Plus', 'Fax.Plus', 'Scan.Plus'],
                datasets: [{
                    data: [40, 35, 25],
                    backgroundColor: [
                        '#1A56DB',
                        '#3B82F6',
                        '#60A5FA'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Budget Allocation (100K CHF)'
                    }
                }
            }
        });
    }

    // Market Analysis Chart
    const marketCtx = document.querySelector('.chart-container');
    if (marketCtx) {
        new Chart(marketCtx, {
            type: 'bar',
            data: {
                labels: ['Healthcare', 'Financial', 'Legal', 'Real Estate'],
                datasets: [{
                    label: 'Market Size',
                    data: [30, 25, 20, 25],
                    backgroundColor: '#1A56DB'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Target Market Distribution'
                    }
                }
            }
        });
    }
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation Highlight on Scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add hover effects to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 