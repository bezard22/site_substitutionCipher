import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

class substitutionCipher {
    // constructor
    constructor(alpha, action) {
        d3.select("#alpha").property("value", alpha);
        d3.select("#actionSelect").property("value", action);
        this.alphaUpdate();
        this.actionUpdate();
    }

    // update key and elements based on alphabet change
    alphaUpdate() {
        this.alpha = d3.select("#alpha").property("value");
        this.key = {}
        this.revKey = {}
        for (let i = 0; i < this.alpha.length; i++) {
            this.key[this.alpha[i]] = this.alpha[i]
            this.revKey[this.alpha[i]] = this.alpha[i]
        }
        d3.select("#key form").remove();
        const key = d3.select("#key")
            .append("form")
        for (let i = 0; i < this.alpha.length; i++) {
            const keySpan = key.append("span")
                .classed("keyspan", true);
            keySpan.append("label")
                .text(`${this.alpha[i]}:`)
            keySpan.append("input")
                .attr("type", "text")
                .property("value", this.key[this.alpha[i]])
                .on("keydown", (event) => {
                    event.preventDefault();
                    if (this.alpha.includes(event.key)) {
                        event.target.value = event.key;
                        this.key[this.alpha[i]] = event.key;
                        this.revKey[event.key] = this.alpha[i];
                    }
                })
        }
    }

    // update elements based on action selected
    actionUpdate() {
        this.action = d3.select("#actionSelect").property("value");
        if (this.action == "encrypt") {
            d3.select("#textLabel")
                .text("PLaintext: ");
            d3.select("#action")
                .text("Encrypt");
        } else if (this.action == "decrypt") {
            d3.select("#textLabel")
                .text("Ciphertext: ");
            d3.select("#action")
                .text("Decrypt");
        }
    }

    // perform encryption or decryption and report to screen
    cryption() {
        const text = d3.select("#text").property("value");
        let outText = "";
        for (let i = 0; i < text.length; i++) {
            if (this.action == "encrypt") {
                outText += this.key[text[i]];
            } else if (this .action == "decrypt") {
                outText += this.revKey[text[i]];
            }
        }
        d3.select("#output p")
            .remove()
        d3.select("#output")
            .append("p")
            .text(`${this.aciton == "encrypt" ? "Cipher" : "Plain"}text: ${outText}`)
    }
}

// main
d3.select("#text").property("value", "")
const subCiph = new substitutionCipher("abcdefghijklmnopqrstuvwxyz", "encrypt");    
window.subCiph = subCiph;