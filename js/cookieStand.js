'use strict';
//header array with store times
let hours = ['', '0600', '0700', '0800', '0900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', 'Daily Location Total'];
let hourlyCookiesColumns = []
for (let i = 0; i < 14; i++) {
    hourlyCookiesColumns.push(0)
}
let siteCookieTotals = 0
//function location will allow for the generation of each store's data...location is a reserved word btw which effed me up for longer than it should. 

// console.log(hourlyCookiesColumns);
function Location(cityLoc, minC, maxC, avgSale) {
    this.cityLoc = cityLoc;
    this.minC = minC;
    this.maxC = maxC;
    this.avgSale = avgSale;
    this.hourlyCookies = [];
    this.cookieTotal = 0;
    //ramdomizer for hourly sales
    this.randomHourlyCookies = function () {
        let numeral = Math.floor((Math.floor(Math.random() * (this.maxC - this.minC + 1) + this.minC)) * this.avgSale);
        return numeral;

    }
    // this will add 14 random values within the confines of the min and max into the array
    for (let i = 1; i < hours.length - 1; i++) {
        this.hourlyCookies.push(this.randomHourlyCookies())
    }
    //not sure if the above is necessary to store in the array or if i can just call the random numbers in the for loop below that is generating the cells were appending to the table.
    //this function will create row arrays for each object and store that array within the object and then append that row as a table row to the 
    this.cookieMove = function () {
        let body = document.getElementById('tBody');    //WHAT THE FUCK IS HAPPENING HERE! old comment but still partially relevant
        let row = document.createElement('tr'); //creating the row element
        let cityData = document.createElement('td'); 
        let total = 0;
        cityData.innerText = this.cityLoc 
        row.appendChild(cityData) //first td on 'row' will be the city data
        for (let i = 0; i < this.hourlyCookies.length; i++) {
            let bodyData = document.createElement('td');
            bodyData.innerText = this.hourlyCookies[i]
            row.appendChild(bodyData);
        }
        body.appendChild(row); //for the length of hourlyCookies it will iterate creating the data object, filling that object iteratively from array hourlyCookies and then append that to row. Row is then appended to the body.

        for (let i = 0; i < this.hourlyCookies.length; i++) {
            // console.log(hourlyCookiesColumns [i], this.hourlyCookies[i])
            hourlyCookiesColumns[i] += this.hourlyCookies[i]
            total += this.hourlyCookies[i]
        }// 
        // console.log(hourlyCookiesColumns)
        let totalData = document.createElement('td');
        totalData.innerText = total
        row.appendChild(totalData);
        siteCookieTotals += total
    }
}


let seattle = new Location('Seattle', 23, 65, 6.3);
// console.log(seattle.hourlyCookies)
let tokyo = new Location('Tokyo', 3, 24, 1.2);
let dubai = new Location('Dubai', 11, 38, 3.7);
let paris = new Location('Paris', 20, 38, 2.3);
let lima = new Location('Lima', 2, 16, 4.6);

let stores = [seattle, tokyo, dubai, paris, lima];

seattle.cookieMove();
tokyo.cookieMove();
dubai.cookieMove();
paris.cookieMove();
lima.cookieMove();



function renderTableHeader() {
    let header = document.getElementById('tableHead')
    let row = document.createElement('tr')

    for (let i = 0; i < hours.length; i++) {
        let headerData = document.createElement('td');
        headerData.innerText = hours[i]
        row.appendChild(headerData);
    }
    header.appendChild(row);
}

renderTableHeader();


function renderTableFooter() {
    let footer = document.getElementById('tFoot');
    let row = document.createElement('tr');
    let tableCell = document.createElement('td');

    tableCell.innerText = 'Totals:';
    row.appendChild(tableCell);
    for (let i = 0; i < hourlyCookiesColumns.length; i++) {
        let summations = document.createElement('td');
        summations.innerText = hourlyCookiesColumns[i]
        row.appendChild(summations);
        // console.log(summations)
    }
    let finalCell = document.createElement('td')
    finalCell.innerText = siteCookieTotals
    row.appendChild(finalCell);
    footer.appendChild(row);


}
renderTableFooter();




// function renderTableBody (){
//     let body = document.getElementById('tBody')
//     let row = document.createElement('tr')
//     for (let i = 0; i<){
//         let bodyData = document.createElement('td');
//         bodyData.innerText = [i]
//         row.appendChild(bodyData);
//         }
//         body.appendChild(row);
//     }

