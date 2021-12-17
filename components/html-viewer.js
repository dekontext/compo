class HTMLViewer extends HTMLElement {
    constructor() {
        super();
        this.template = document.getElementById('component-html-viewer');
        this.attachShadow({mode: 'open'});
        this.classList.add('component');
        this.id = 'html-viewer';
        this.shadowRoot.append(this.template.content.cloneNode(true));

        this.htmlViewerSrc = this.shadowRoot.getElementById(
            'html-viewer-src');
        this.htmlViewerIframe = this.shadowRoot.getElementById(
            'html-viewer-iframe');

        this.htmlViewerSrc.addEventListener('input', (e) => {
            //            this.htmlViewerIframe.src = `data:text/html;base64, ${btoa(this.toBinary(this.htmlViewerSrc.value))}`
            this.htmlViewerIframe.srcdoc = this.htmlViewerSrc.value;
        });
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
}

customElements.define('compo-html-viewer', HTMLViewer);

