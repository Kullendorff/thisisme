// Enhanced LLM interaction with modal preview
// This provides a better UX by showing the prompt before opening AI service

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

// AI service configurations
const aiServices = {
    'openai': {
        name: 'OpenAI ChatGPT',
        url: 'https://chat.openai.com/',
        supportsUrlParam: false
    },
    'claude': {
        name: 'Claude',
        url: 'https://claude.ai/new',
        supportsUrlParam: false
    },
    'gemini': {
        name: 'Google Gemini',
        url: 'https://gemini.google.com/',
        supportsUrlParam: false
    },
    'perplexity': {
        name: 'Perplexity',
        url: 'https://www.perplexity.ai/',
        supportsUrlParam: true,
        urlParamKey: 'q'
    },
    'mistral': {
        name: 'Mistral',
        url: 'https://chat.mistral.ai/',
        supportsUrlParam: false
    }
};

// Create and inject modal HTML
function createModal() {
    const modalHTML = `
        <div id="prompt-modal" class="prompt-modal">
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button class="modal-close" id="modal-close">&times;</button>
                <div class="modal-header">
                    <h3>AI Prompt Preview</h3>
                    <p class="modal-subtitle">This prompt will be used to query <span id="ai-service-name"></span></p>
                </div>
                <div class="modal-body">
                    <pre id="prompt-text"></pre>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn modal-btn-secondary" id="copy-only-btn">
                        📋 Copy Only
                    </button>
                    <button class="modal-btn modal-btn-primary" id="proceed-btn">
                        Open <span id="service-name-btn"></span> →
                    </button>
                </div>
                <p class="modal-note" id="auto-fill-note"></p>
            </div>
        </div>
    `;

    const modalStyles = `
        <style>
            .prompt-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 1rem;
            }

            .prompt-modal.show {
                display: flex;
            }

            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(4px);
            }

            .modal-content {
                position: relative;
                background: #1a1a1a;
                border: 2px solid #00f0ff;
                border-radius: 12px;
                max-width: 700px;
                width: 100%;
                max-height: 90vh;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 240, 255, 0.3);
                animation: modalSlideIn 0.3s ease-out;
            }

            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-30px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: transparent;
                border: none;
                color: #999;
                font-size: 2rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                border-radius: 50%;
            }

            .modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
            }

            .modal-header {
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid #333;
            }

            .modal-header h3 {
                color: #00f0ff;
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
            }

            .modal-subtitle {
                color: #999;
                font-size: 0.9375rem;
            }

            .modal-body {
                padding: 1.5rem 2rem;
                max-height: 400px;
                overflow-y: auto;
            }

            .modal-body pre {
                background: #0a0a0a;
                border: 1px solid #333;
                border-radius: 8px;
                padding: 1.5rem;
                color: #e8e8e8;
                font-family: 'Courier New', monospace;
                font-size: 0.875rem;
                line-height: 1.6;
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            .modal-footer {
                padding: 1.5rem 2rem;
                border-top: 1px solid #333;
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }

            .modal-btn {
                padding: 0.875rem 1.75rem;
                border: none;
                border-radius: 6px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                font-family: inherit;
            }

            .modal-btn-secondary {
                background: #2a2a2a;
                color: #e8e8e8;
                border: 1px solid #444;
            }

            .modal-btn-secondary:hover {
                background: #333;
            }

            .modal-btn-primary {
                background: #00f0ff;
                color: #0a0a0a;
            }

            .modal-btn-primary:hover {
                background: #00d4e0;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 240, 255, 0.4);
            }

            .modal-note {
                padding: 0 2rem 1.5rem;
                color: #666;
                font-size: 0.8125rem;
                font-style: italic;
                text-align: center;
            }

            .modal-note.highlight {
                color: #00f0ff;
            }

            @media (max-width: 768px) {
                .modal-content {
                    max-width: 100%;
                    margin: 1rem;
                }

                .modal-footer {
                    flex-direction: column;
                }

                .modal-btn {
                    width: 100%;
                }
            }
        </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalStyles + modalHTML);
}

// Show modal with prompt
function showPromptModal(service, url) {
    const modal = document.getElementById('prompt-modal');
    const serviceConfig = aiServices[service];

    // Update modal content
    document.getElementById('ai-service-name').textContent = serviceConfig.name;
    document.getElementById('service-name-btn').textContent = serviceConfig.name;
    document.getElementById('prompt-text').textContent = llmPrompt;

    // Update note based on whether auto-fill is supported
    const noteEl = document.getElementById('auto-fill-note');
    if (serviceConfig.supportsUrlParam) {
        noteEl.textContent = '✓ This service supports auto-fill! The prompt will be pre-filled automatically.';
        noteEl.classList.add('highlight');
    } else {
        noteEl.textContent = 'Note: Prompt has been copied to clipboard. Paste it in the chat after opening.';
        noteEl.classList.remove('highlight');
    }

    // Copy to clipboard
    copyToClipboard(llmPrompt);

    // Show modal
    modal.classList.add('show');

    // Set up event listeners
    const closeBtn = document.getElementById('modal-close');
    const copyOnlyBtn = document.getElementById('copy-only-btn');
    const proceedBtn = document.getElementById('proceed-btn');
    const backdrop = modal.querySelector('.modal-backdrop');

    const closeModal = () => {
        modal.classList.remove('show');
    };

    const proceedToAI = () => {
        let targetUrl = url;

        // If service supports URL parameter, append the prompt
        if (serviceConfig.supportsUrlParam) {
            const encodedPrompt = encodeURIComponent(llmPrompt);
            targetUrl = `${url}?${serviceConfig.urlParamKey}=${encodedPrompt}`;
        }

        window.open(targetUrl, '_blank', 'noopener,noreferrer');
        closeModal();

        // Show toast if prompt was copied (for services without auto-fill)
        if (!serviceConfig.supportsUrlParam) {
            showToast();
        }
    };

    closeBtn.onclick = closeModal;
    backdrop.onclick = closeModal;
    copyOnlyBtn.onclick = () => {
        copyToClipboard(llmPrompt);
        showToast();
        closeModal();
    };
    proceedBtn.onclick = proceedToAI;

    // ESC key to close
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
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

// Toast notification function
function showToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// LLM icon click handler
function handleLLMClick(event) {
    const button = event.currentTarget;
    const url = button.dataset.url;
    const service = button.dataset.service;

    // Show modal instead of directly opening
    showPromptModal(service, url);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create modal
    createModal();

    // Attach click handlers to all LLM icons
    const llmIcons = document.querySelectorAll('[data-service]');
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
    document.querySelectorAll('.strength-card, .timeline-item, .skill-card, .capability-card, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Add keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.hasAttribute('data-service')) {
            e.preventDefault();
            e.target.click();
        }
    }
});
