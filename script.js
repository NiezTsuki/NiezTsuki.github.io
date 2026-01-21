document.addEventListener('DOMContentLoaded', () => {
    
    const observerOptions = {
        threshold: 0.15, 
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.fade-in, .fade-in-right, .fade-up');
    animateElements.forEach(el => observer.observe(el));


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log("Portfolio Loaded. System Ready.");
});


function copyDiscord(user) {
    navigator.clipboard.writeText(user).then(() => {
        const statusText = document.getElementById('ds-status');
        const originalText = statusText.innerText;
        
        statusText.innerText = "¡Copiado!";
        statusText.style.color = "#5865F2"; 
        statusText.style.fontWeight = "bold";
        
        setTimeout(() => {
            statusText.innerText = "Copiar Usuario";
            statusText.style.color = "";
            statusText.style.fontWeight = "";
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        const statusText = document.getElementById('mail-status');
        const originalText = statusText.innerText;
        
        statusText.innerText = "¡Copiado!";
        statusText.style.color = "#ff6b6b"; 
        statusText.style.fontWeight = "bold";
        
        setTimeout(() => {
            statusText.innerText = "Copiar Correo";
            statusText.style.color = "";
            statusText.style.fontWeight = "";
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}