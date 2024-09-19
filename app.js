// app.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let tries = 0;
let won = false;

// For Express 4.16.0 and later, use the built-in middleware
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data


function generateRandom12Digits() {
    let digits = '0123456789';
    let result = '';
    
    for (let i = 0; i < 12; i++) {
        result += digits[Math.floor(Math.random() * digits.length)];
    }
    
    return result;
}

function generateArray(){
    let data = {
    }

    while (Object.keys(data).length < 1000000) {
        let code = generateRandom12Digits();
        if (!data[code]){
            data[code] = true;
        }
        console.log(Object.keys(data).length)
    }
    fs.writeFileSync('codes.json',JSON.stringify(data))
    return data;
}


// generateArray()
let data = JSON.parse(fs.readFileSync('codes.json'))
// console.log(data);










// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve views from the "views" directory
app.set('views', __dirname + '/views');

// Route to render the home.ejs view
app.get('/', (req, res) => {
    res.render('home',{won}); // This will render /views/home.ejs
});

// Route to render the home.ejs view
app.post('/', (req, res) => {
    if (won === false){
    let code = req.body.code;
    let win = false;
    tries++;
    if (data[code] === true){
        win = true;       
    }
    if (win === false){
        console.log(`
----------WRONG-----------
        ${code}
          TRY: ${tries}
    IP: ${req.ip}
--------------------------    
            `);
    }
    else if (win === true){
        console.log(`
--------------------------
                   88              
                   ""              
                                   
8b      db      d8 88 8b,dPPYba,   
'8b    d88b    d8' 88 88P'    "8a  
 '8b  d8''8b  d8'  88 88       88  
  '8bd8'  '8bd8'   88 88       88  
    YP      YP     88 88       88  
                                   

    ${code}
        TRY: ${tries}
IP: ${req.ip}
--------------------------  
    
    `);
        
            won = true;
    }
   
}
    
    res.render('home',{won}); // This will render /views/home.ejs
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});






