import { rgaaRules } from './rules.js';

document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('scanBtn');
    const resultsList = document.getElementById('resultsList');
    const errorCount = document.getElementById('errorCount');
    const suggCount = document.getElementById('suggestionCount');
    const scoreVal = document.getElementById('scoreValue');
    const indicator = document.getElementById('statusIndicator');
    const template = document.getElementById('themeItemTemplate');

    scanBtn.addEventListener('click', async () => {
        setLoading(true);
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab) { setLoading(false); return; }

        try {
            await chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: ["content.css"] });
            await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
            
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (rules) => window.rgaaScan ? window.rgaaScan(rules) : null,
                args: [rgaaRules]
            });

            renderResults(results[0].result, tab.id);
        } catch (e) {
            console.error(e);
            resultsList.innerHTML = `<div class="empty-state"><p>Erreur d'analyse</p></div>`;
        } finally {
            setLoading(false);
        }
    });

    function setLoading(bool) {
        if(bool) {
            scanBtn.classList.add('loading');
            indicator.className = 'status-indicator busy';
        } else {
            scanBtn.classList.remove('loading');
            indicator.className = 'status-indicator ready';
        }
    }

    function renderResults(data, tabId) {
        resultsList.innerHTML = '';
        if(!data) return;

        // Mise à jour des stats
        errorCount.innerText = data.stats.error;
        suggCount.innerText = data.stats.suggestion;
        
        const totalIssues = data.stats.error + (data.stats.suggestion * 0.5);
        let score = Math.max(0, Math.round(100 - (totalIssues * 3)));
        scoreVal.innerText = score + "%";
        
        // Couleur Score dynamique
        if(score >= 90) scoreVal.style.background = "#34C759";
        else if(score >= 50) scoreVal.style.background = "#FF9500";
        else scoreVal.style.background = "#FF3B30";
        scoreVal.style.webkitBackgroundClip = "text";

        if(data.details.length === 0) {
            resultsList.innerHTML = `<div class="empty-state"><p>🎉 Tout semble parfait !</p></div>`;
            return;
        }

        data.details.forEach(group => {
            const clone = template.content.cloneNode(true);
            const card = clone.querySelector('.theme-card');
            
            clone.querySelector('.theme-tag').innerText = group.id;
            clone.querySelector('.theme-text').innerText = `${group.title} (${group.count})`;

            const body = clone.querySelector('.theme-body');
            
group.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item-row';
                
                const fixBtnHtml = item.canFix 
                    ? `<button class="btn-small btn-fix" data-id="${item.id}">Simuler Fix</button>` 
                    : '';

                // Nouvelle structure HTML compacte
                itemDiv.innerHTML = `
                    <div class="item-header">
                        <span class="item-badge ${item.type === 'error' ? 'badge-err' : 'badge-sugg'}">
                            ${item.type === 'error' ? 'ERREUR' : 'CONSEIL'}
                        </span>
                    </div>
                    <div class="item-msg">${item.msg}</div>
                    <div class="item-fix">${item.solution}</div>
                    <div class="actions">
                        <button class="btn-small btn-locate" data-id="${item.id}">Voir</button>
                        ${fixBtnHtml}
                    </div>
                `;
                body.appendChild(itemDiv);
            });

            // Toggle Accordion
            card.querySelector('.theme-head').addEventListener('click', () => {
                card.classList.toggle('open');
            });

            // Actions Buttons
            body.querySelectorAll('.btn-locate').forEach(btn => {
                btn.addEventListener('click', () => {
                    chrome.tabs.sendMessage(tabId, { action: "scrollToError", targetId: btn.dataset.id });
                });
            });

            body.querySelectorAll('.btn-fix').forEach(btn => {
                btn.addEventListener('click', () => {
                    chrome.tabs.sendMessage(tabId, { action: "simulateFix", targetId: btn.dataset.id });
                    btn.innerText = "Simulé ✓";
                    btn.disabled = true;
                });
            });

            resultsList.appendChild(clone);
        });
    }
});