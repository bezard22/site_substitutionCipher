import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

function encryptSetup() {
    alpha = d3.select("#alpha").property("value")
    d3.select("#text")
        .text("plaintext: ");
    const key = d3.select("#key")
        .append("table")
    for (let i = 0; i < alpha.length; i++) {
        const cell = key.append("tr")
            .append("td")
            .append("label")
            .text(`${alpha[i]}: `)
            .append("input")
            .attr("type", "text")
            .style("width", "15px")
            .property("value", alpha[i])
            .on("keypress", (event) => {
                event.preventDefault();
                if (alpha.includes(event.key)) {
                    event.target.value = event.key;
                }
            })
    }
    
    
}

function setup() {
    d3.select("#alpha")
        .property("value", "abcdefghijklmnopqrstuvwxyz");
}

setup();
encryptSetup();