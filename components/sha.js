class SHA extends HTMLElement {
    constructor() {
        super();
        this.template = document.getElementById('component-sha');
        this.attachShadow({mode: 'open'});
        this.classList.add('component');
        this.id = 'sha';
        this.shadowRoot.append(this.template.content.cloneNode(true));

        this.selectShaAlgorithm = this.shadowRoot.getElementById('select-sha-algorithm');
        this.shaInput = this.shadowRoot.getElementById('sha-input');
        this.shaOutput = this.shadowRoot.getElementById('sha-output');

        this.shaInput.addEventListener('input', (e) => {
            this.setOutputValue();
        });

        this.selectShaAlgorithm.addEventListener('change', (e) => this.setOutputValue());
    }

    async setOutputValue() {
        if (this.shaInput.value === '' || this.shaInput.value === undefined) {
            this.shaOutput.value = '';
        }
        const messageBuffer = new TextEncoder().encode(this.shaInput.value);
        const hashBuffer = await crypto.subtle.digest(
            this.selectShaAlgorithm.value, messageBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hex = hashArray.map(el => el.toString(16).padStart(2, '0')).join('');
        this.shaOutput.value = hex;
    }
}

customElements.define('compo-sha', SHA);
