// Author: Ben Daigle
// Created Date: April 26, 2021
/* Note: 
The following is written for a particular instance of the Sierra WebPac software 
from Innovative Interfaces. While it should work in any instance of Sierra's WebPac, 
there may local customization details that prevent it from working right off the bat.
*/

$(document).ready(function(){

    // These problematic terms are derived from The Cataloging Lab - https://cataloginglab.org/problem-lcsh/
    // Terms in the array must be in lower case

    var terms = [
        "aleuts -- evacuation and relocation, 1942-1945",
        "american poetry -- indian authors",
        "antifa (organisation)",
        "argentina -- history -- dirty war, 1976-1983",
        "bossiness",
        "brothers and sisters",
        "child pornography",
        "children of egg donors",
        "children of sperm donors",
        "criminals",
        "defloration",
        "discovery and exploration",
        "dwarfs (persons)",
        "eskimos",
        "fetishism",
        "gays",
        "gender-nonconforming people",
        "german americans -- evacuation and relocation, 1941-1948",
        "hearing impaired",
        "hearing impaired children",
        "hearing impaired infants",
        "hispanic americans",
        "homeless persons",
        "husband and wife",
        "illegal aliens",
        "illegal immigration",
        "illegitimate children",
        "indians of north america",
        "inmates of institutions",
        "invalids",
        "italian americans -- evacuation and relocation, 1942",
        "japanese americans -- evacuation and relocation, 1942-1945",
        "juvenile delinquents",
        "kings and rulers",
        "noble savage",
        "oriental literature",
        "orientalism",
        "parolees",
        "poor",
        "popular music -- south korea -- 2011-2020",
        "primitive art",
        "primitive societies",
        "problem youth",
        "prisoners",
        "prisoners -- sexual behavior",
        "problem children",
        "race",
        "race relations",
        "race riots",
        "racially mixed people",
        "schizophrenics",
        "sexual minorities",
        "sexual reorientation programs",
        "slaveholders",
        "slavery",
        "slaves",
        "tramps",
        "victims",
        "word recognition"
    ]

    // Set a 1 second delay on the flag to allow the page to fully load first
    setTimeout(function() {
        flagTerms();
    }, 500);

    // Add a flag and an associated message card to problematic terms that appear in the bib record
    function flagTerms() {

        // Dynamically insert the flag's styles into the document head
        let cssFile = "/screens/term-flag-styles.css";
        let flagStylesheet = document.createElement("link");
        flagStylesheet.setAttribute("rel", "stylesheet");
        flagStylesheet.setAttribute("type", "text/css");
        flagStylesheet.setAttribute("href", cssFile);
        document.head.appendChild(flagStylesheet);

        // Select the table that contains bibliographic metadata
        let bibDetailTable = document.querySelector("div.bibDisplayContentMore table.bibDetail tbody tr td table");

        // Loop through the rows in the table to see if the problematic terms are present
        for (let [index, row] of Object.entries(bibDetailTable.rows)) {
            // Loop through each table cell in the current row
            for (let cell of row.cells) { 
                console.log(index, row);
                // Loop through the list of problematic terms and check to see if any are present in the table cell
                for (let term of terms) { 
                    let regex = new RegExp('^' + term + '(\\s--|$)');
                    // If the problematic term is found, create a new div containing the flag and the associated dropdown message
                    if (cell.innerHTML.includes("href=") && cell.innerText.toLowerCase().match(regex)) {
                        var newCell = `
                            <div class='term-flag'>
                                <a tabindex='0' 
                                data-toggle='collapse' 
                                data-target='#flagMessage${index}'
                                aria-expanded='false' 
                                aria-controls='flagMessage'>
                                <i class="fas fa-flag"></i>
                                </a>
                            </div>
                            <div class='collapse' id='flagMessage${index}'>
                                <div class='flag-card card-body'>
                                    <h4 class="term-flag-title">This term has been flagged as problematic</h4>
                                    <a href=\"https://id.loc.gov/authorities/subjects.html\">Subject headings</a> are meant to bring research together and to help us discover all the materials written on a specific topic. Certain headings can be hurtful, though, especially when they use outdated terms or offensive language.
                                    <br /><br />
                                    <a href="/screens/about_subject_flags.html">Learn more</a> about subject headings, problem flags, and how changes to subject headings are made. Or, <a href="#">suggest your own</a> alternative terms.
                                </div>
                            </div>
                        `;
                        // Attach the new flag div to the table cell
                        cell.innerHTML += newCell;
                    }
                }
            }
        }

    }

    
});

