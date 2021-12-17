function main() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js');
    };
}

window.onload = main;
