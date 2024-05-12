function addMoonButton() {
    const controls = document.querySelector('.ytp-right-controls');
    if (controls) {
        
        const moonButton = document.createElement('button');
        moonButton.innerHTML = '<svg id="moon" viewBox="-6 -6 12 12"><title>Dark mode</title><defs><mask id="earth"><rect fill="white" x="-5" y="-5" width="10" height="10"></rect><circle fill="black" cx="3.141592654" r="5"/></mask></defs><circle r="5" fill="currentColor" mask="url(#earth)" transform="rotate(-23.5)"/></svg>';
        moonButton.id = 'moon-mode-button';
        moonButton.style = "padding: 10px; font-size: 12px; background-color: transparent; color: white; border: none; cursor: pointer;";

        const panel = document.createElement('div');
        panel.className = 'ytp-panel';
        panel.style = "display: none; height: auto; background-color: black; min-width: fit-content; max-width: 50px; min-height: fit-content; background-color: #212121; border-radius: 10px;";

        const panelMenu = document.createElement('div');
        panelMenu.className = 'ytp-panel-menu';
        panelMenu.style = "min-width: fit-content; height: auto; display: flex; flex-direction: column;";
        
        const fullscreenButton = document.querySelector('.ytp-fullscreen-button');
        if (fullscreenButton) {
            const style = window.getComputedStyle(fullscreenButton);
            moonButton.style.width = style.width;
            moonButton.style.height = style.height;
            moonButton.style.padding = style.padding;
        }

        [5, 15, 30, 45, 60, 120].forEach(time => {
            const menuItem = document.createElement('div');
            menuItem.className = 'ytp-menuitem';
            menuItem.role = 'menuitem';
            menuItem.style = "display: flex; align-items: center; cursor: pointer; margin: auto; width: fit-content; padding-left: 10px; padding-right: 10px;";
            menuItem.onclick = function () {
                setTimeout(() => {
                    const video = document.querySelector('video');
                    if (video) video.pause();
                }, time * 60 * 1000);

                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            }

            const itemLabel = document.createElement('div');
            itemLabel.className = 'ytp-menuitem-label';
            itemLabel.textContent = time + ' minutes';
            itemLabel.style = "flex-grow: 1; padding: 0";

            menuItem.appendChild(itemLabel);
            panelMenu.appendChild(menuItem);
        });

        panel.appendChild(panelMenu);

        moonButton.onclick = function () {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        };

        controls.appendChild(moonButton);

        moonButton.onclick = function () {
            const reference = document.querySelector('.ytp-overlay.ytp-speedmaster-overlay');
        
            if (reference) {
                const refRect = reference.getBoundingClientRect();
                panel.style.left = `${refRect.left}px`;
                panel.style.top = `${refRect.top}px`;
            }
        
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        };

        controls.appendChild(moonButton);
        document.body.appendChild(panel);

        document.addEventListener('click', function(event) {
            if (panel.style.display === 'block' && !panel.contains(event.target) && event.target !== moonButton) {
                panel.style.display = 'none';
            }
        });
        
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addMoonButton);
} else {
    addMoonButton();
}

