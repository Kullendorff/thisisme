// LLM Prompt Template
const llmPrompt = `Jag är en rekryterare som utvärderar Johan Kullendorff som kandidat. Baserat på följande profil, ge mig:

1. En professionell sammanfattning (3-4 meningar)
2. Tre styrkor relevanta för tech/IT/kommunikationsroller
3. Förslag på 3 intervjufrågor att ställa

PROFIL:
- Nuvarande: Senior Technical Advisor, Webhelp Nordic (2020-nu) - Second-line teknisk support för globalt techföretag
- Bakgrund: Journalist och redigerare (Hall Media, Hallpressen) - koordinerade produktion av 13 dagstidningar
- Utbildning: Journalistik, Göteborgs Universitet
- Tekniska skills: Python, Flask, REST APIs, Discord-botar, AI-integrationer (Claude API, OpenAI API, Google APIs), SQLite, Git
- Språk: Svenska (modersmål), Engelska (flytande)
- Plats: Göteborg, öppen för remote/hybrid

Unik edge: Kombinerar teknisk djupkompetens med journalistisk kommunikationsförmåga - kan både lösa komplexa problem OCH förklara lösningen för icke-tekniska stakeholders.`;

// Toast notification function
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Copy to clipboard function
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

// LLM icon click handler
function handleLLMClick(event) {
    const button = event.currentTarget;
    const url = button.dataset.url;
    const service = button.dataset.service;

    // Copy prompt to clipboard
    copyToClipboard(llmPrompt).then(success => {
        if (success) {
            // Show toast notification
            showToast();

            // Open AI service in new tab
            window.open(url, '_blank', 'noopener,noreferrer');

            // Add animation feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        } else {
            // Fallback: just open the URL if clipboard fails
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Attach click handlers to all LLM icons
    const llmIcons = document.querySelectorAll('.llm-icon');
    llmIcons.forEach(icon => {
        icon.addEventListener('click', handleLLMClick);
    });

    // Add smooth scroll behavior for navigation
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

    // Intersection Observer for fade-in animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe strength cards and timeline items
    document.querySelectorAll('.strength-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add hover sound effect simulation (optional subtle feedback)
    llmIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            // Subtle scale animation on hover
            icon.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Add keyboard accessibility for LLM icons
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('llm-icon')) {
            e.preventDefault();
            e.target.click();
        }
    }
});
