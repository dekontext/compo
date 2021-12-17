class Base64 extends HTMLElement {
    constructor() {
        super();
        this.template = document.getElementById('component-base64');
        this.attachShadow({mode: 'open'});
        this.classList.add('component');
        this.id = 'base64';
        this.shadowRoot.append(this.template.content.cloneNode(true));

        this.inputFieldElement = this.shadowRoot.
            getElementById('input-field-element');
        this.outputFieldElement = this.shadowRoot
            .getElementById('output-field-element');

        this.base64UrlInput = this.shadowRoot.
            getElementById('base64-url-input');
        this.base64UrlOutput = this.shadowRoot
            .getElementById('base64-url-output');

        this.inputFileElement = this.shadowRoot
            .getElementById('base64-input-file');

        this.outputFileElement = this.shadowRoot
            .getElementById('base64-output-file');

        this.inputFieldElement.addEventListener('input', (e) => {
            this.outputFieldElement.value = btoa(
                this.toBinary(this.inputFieldElement.value));
        });

        this.base64UrlOutput.addEventListener('input', (e) => {
            this.base64UrlInput.value = atob(this.base64urlReplacer(
                this.base64UrlOutput.value));
        });

        this.outputFieldElement.addEventListener('input', (e) => {
            try {                
                this.inputFieldElement.value = this.fromBinary(
                    atob(this.outputFieldElement.value));
            } catch(e) {
            }
        });

        this.inputFileElement.addEventListener('change', (e) => {
            const reader = new FileReader();

            reader.onload = () => {
                this.outputFileElement.value =
                    btoa(this.toBinary(reader.result));
            };
            
            reader.readAsBinaryString(this.inputFileElement.files[0]);
        });
    }

    base64urlReplacer(input) {
        // Replace non-url compatible chars with base64 standard chars
        input = input
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        // Pad out with standard base64 required padding characters
        var pad = input.length % 4;
        if(pad) {
            if(pad === 1) {
                throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
            }
            input += new Array(5-pad).join('=');
        }

        return input;
    }

    toBinary(string) {
        const codeUnits = new Uint16Array(string.length);
        for (let i = 0; i < codeUnits.length; i++) {
            codeUnits[i] = string.charCodeAt(i);
        }
        const charCodes = new Uint8Array(codeUnits.buffer);
        let result = '';
        for (let i = 0; i < charCodes.byteLength; i++) {
            result += String.fromCharCode(charCodes[i]);
        }
        return result;
    }

    fromBinary(binary) {
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        const charCodes = new Uint16Array(bytes.buffer);
        let result = '';
        for (let i = 0; i < charCodes.length; i++) {
            result += String.fromCharCode(charCodes[i]);
        }
        return result;
    }
}

customElements.define('compo-base64', Base64);
