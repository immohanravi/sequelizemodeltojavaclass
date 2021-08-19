var mysql = require("mysql");
let DB_NAME = "q2cinemas";
const GenerateJavaModel = require('./GenerateJavaModel')
let tablenames = [];
let columnames = []
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var con = mysql.createPool({
  connectionLimit : 10,
  host: "localhost",
  user: "mohan",
  password: "",
  database: DB_NAME,
});

var response;




  let query = `SELECT table_name FROM information_schema.tables WHERE table_type = 'base table' AND table_schema='${DB_NAME}'`;

  con.query(query, function (err, result, fields) {
    if (err) throw err;
    let resultvalues = Object.values(JSON.parse(JSON.stringify(result)));
    resultvalues.forEach((element) => {
      tablenames.push(element.table_name);
    });

    console.log('type exit to close the program')
    console.log("select number to generate java code\n");
    tablenames.forEach((item, index) => {
      console.log(`${index + 1}: ${item}`);
    });
  });
 

  rl.on("line", (userInput) => {
    response = userInput;
    console.log(response)
    if(response === 'exit'){
        rl.close()
    }else {
       
        let name = tablenames[response-1]
        let getcloumns = `SHOW COLUMNS FROM ${name}`
        con.query(getcloumns, function (err, result, fields) {
            if (err) throw err;
            
            let resultvalues = Object.values(JSON.parse(JSON.stringify(result)));
                columnames = []
                resultvalues.forEach(item=>{
                    columnames.push(item)
                })
                GenerateJavaModel.generate(name,columnames)
                    .then(value=>console.log(value))
                    .catch(err=>{
                        console.log(err)
                    })
               
                
            });
    }

    
  });
  



  /*rl.on("close", () => {
    console.log(response);
  });*/

 

