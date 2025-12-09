(function() {
    console.clear();
    const styleTitle = "color: #fff; background: #000; font-size: 20px; padding: 10px; border-radius: 8px; font-weight: bold;";
    const styleLink = "color: #0071E3; font-size: 14px; font-weight: bold; text-decoration: underline;";
    
    console.log("%c RGAAPlus Activated ", styleTitle);
    console.log("%c https://github.com/djael-ml ", styleLink);

    // --- NETTOYAGE ---
    const existingOverlay = document.getElementById('rgaa-premium-overlay');
    if (existingOverlay) existingOverlay.remove();
    document.querySelectorAll('.rgaa-error-highlight, .rgaa-suggestion-highlight').forEach(el => {
        el.classList.remove('rgaa-error-highlight', 'rgaa-suggestion-highlight', 'rgaa-focus-active');
        delete el.dataset.rgaaId;
        let tooltip = el.querySelector('.rgaa-tooltip');
        if (tooltip) tooltip.remove();
        let fix = el.querySelector('.rgaa-fix-preview');
        if (fix) fix.remove();
    });

    const generateId = () => 'err-' + Math.random().toString(36).substr(2, 9);

    const testRegistry = {
        // --- ERREURS (ROUGE) ---
        "1.1": function() {
            let results = [];
            document.querySelectorAll('img').forEach(img => {
                const alt = img.getAttribute('alt');
                const role = img.getAttribute('role');
                if ((alt === null) && role !== 'presentation' && role !== 'none') {
                    const id = generateId();
                    img.dataset.rgaaId = id;
                    results.push({ 
                        id: id, type: 'error', element: img, 
                        msg: "Attribut Alt manquant", // Message raccourci
                        solution: "Ajoutez un texte alternatif.",
                        canFix: true 
                    });
                }
            });
            return results;
        },
        "6.1": function() {
            let results = [];
            document.querySelectorAll('a').forEach(link => {
                const text = link.innerText.trim();
                const ariaLabel = link.getAttribute('aria-label');
                const img = link.querySelector('img');
                const imgAlt = img ? img.getAttribute('alt') : null;

                if (!text && !ariaLabel && (!img || (img && !imgAlt))) {
                    const id = generateId();
                    link.dataset.rgaaId = id;
                    results.push({ 
                        id: id, type: 'error', element: link, 
                        msg: "Lien vide",
                        solution: "Ajoutez du texte ou un label.",
                        canFix: true
                    });
                }
            });
            return results;
        },
        
        // --- CONSEILS (ORANGE) ---
        // Règle 1 : Liens target blank non sécurisés
        "advice.1": function() {
            let results = [];
            document.querySelectorAll('a[target="_blank"]').forEach(link => {
                const rel = link.getAttribute('rel');
                if (!rel || (!rel.includes('noopener') && !rel.includes('noreferrer'))) {
                    const id = generateId();
                    link.dataset.rgaaId = id;
                    results.push({
                        id: id, type: 'suggestion', element: link,
                        msg: "Sécurité Target Blank",
                        solution: "Ajoutez rel=\"noopener\".",
                        canFix: true
                    });
                }
            });
            return results;
        },
        // Règle 2 : Attribut Title redondant sur les images (Nouveau !)
        "advice.2": function() {
            let results = [];
            document.querySelectorAll('img[title]').forEach(img => {
                const alt = img.getAttribute('alt');
                const title = img.getAttribute('title');
                // Si title est identique à alt, c'est du bruit pour les lecteurs d'écran
                if (alt && title && alt.trim() === title.trim()) {
                    const id = generateId();
                    // On ne réécrase pas l'ID si déjà marqué par une erreur
                    if(!img.dataset.rgaaId) img.dataset.rgaaId = id;
                    
                    results.push({
                        id: img.dataset.rgaaId, type: 'suggestion', element: img,
                        msg: "Attribut Title redondant",
                        solution: "Supprimez title s'il est identique au alt.",
                        canFix: true
                    });
                }
            });
            return results;
        }
    };

    // --- VISUALISATION ---
    function highlightElement(element, type, message, ruleId) {
        if (!element || element === document.documentElement) return;
        
        // On évite de rajouter plusieurs classes si déjà highlighté
        if(!element.classList.contains('rgaa-error-highlight') && !element.classList.contains('rgaa-suggestion-highlight')) {
            const className = type === 'error' ? 'rgaa-error-highlight' : 'rgaa-suggestion-highlight';
            element.classList.add(className);
        }

        // Tooltip (On évite les doublons)
        if(!element.querySelector('.rgaa-tooltip')) {
            const style = window.getComputedStyle(element);
            if (style.position === 'static') element.style.position = 'relative';

            const tooltip = document.createElement('div');
            tooltip.className = 'rgaa-tooltip';
            tooltip.innerHTML = `<strong>${type === 'error' ? '!' : 'i'}</strong>`; // Version minimaliste
            element.appendChild(tooltip);
        }
    }

    // --- SIMULATION ---
    function simulateFix(targetId) {
        const el = document.querySelector(`[data-rgaa-id="${targetId}"]`);
        if (!el) return;

        const existingFix = el.querySelector('.rgaa-fix-preview');
        if (existingFix) existingFix.remove();

        let badgeText = "✅ Corrigé";

        // Logique spécifique selon le cas
        if (el.tagName === 'IMG') {
            if (el.hasAttribute('title') && el.getAttribute('title') === el.getAttribute('alt')) {
                 el.removeAttribute('title'); // Fix advice.2
                 badgeText = "✅ Title retiré";
            } else {
                badgeText = "✅ Alt ajouté";
            }
            el.style.border = "2px solid #34C759";
        } else if (el.tagName === 'A') {
            if(el.getAttribute('target') === '_blank') {
                el.setAttribute('rel', 'noopener noreferrer');
                badgeText = "🔒 Sécurisé";
            } else {
                badgeText = "✅ Texte ajouté";
            }
            el.style.borderBottom = "2px solid #34C759";
        }

        const overlay = document.createElement('div');
        overlay.className = 'rgaa-fix-preview';
        overlay.innerHTML = badgeText;
        
        if(el.nextSibling) el.parentNode.insertBefore(overlay, el.nextSibling);
        else el.parentNode.appendChild(overlay);
    }

    // --- MESSAGING ---
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "scrollToError") {
            const el = document.querySelector(`[data-rgaa-id="${request.targetId}"]`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('rgaa-focus-active');
                setTimeout(() => el.classList.remove('rgaa-focus-active'), 2000);
            }
        }
        if (request.action === "simulateFix") {
            simulateFix(request.targetId);
        }
    });

    // --- SCANNER ---
    window.rgaaScan = function(rules) {
        let stats = { error: 0, suggestion: 0 };
        let results = [];

        // 1. Erreurs
        rules.forEach(theme => {
            theme.criteres.forEach(critere => {
                if (testRegistry[critere.id]) {
                    try {
                        const items = testRegistry[critere.id]();
                        if (items.length > 0) {
                            const errors = items.filter(i => i.type === 'error');
                            stats.error += errors.length;
                            if(errors.length > 0) {
                                results.push({
                                    id: critere.id, title: critere.titre, count: errors.length,
                                    items: errors
                                });
                                errors.forEach(e => highlightElement(e.element, e.type, e.msg, critere.id));
                            }
                        }
                    } catch (e) {}
                }
            });
        });

        // 2. Conseils (Tous regroupés)
        let allAdvices = [];
        ["advice.1", "advice.2"].forEach(key => {
             if(testRegistry[key]) allAdvices = allAdvices.concat(testRegistry[key]());
        });

        if (allAdvices.length > 0) {
            stats.suggestion += allAdvices.length;
            results.push({
                id: "UX", title: "Conseils & Optimisations", count: allAdvices.length,
                items: allAdvices
            });
            allAdvices.forEach(e => highlightElement(e.element, e.type, e.msg, "Conseil"));
        }

        return { stats: stats, details: results };
    };
})();