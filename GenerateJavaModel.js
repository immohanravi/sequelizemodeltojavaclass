const fs = require('fs');
exports.generate = (name,coloumnnames)=>{
    return new Promise((resolve,reject)=>{
        try {

            let value  = `public class ${name} {\n${getVariableNames(coloumnnames)}\n${getSettersAndGetter(coloumnnames)}\n}`
            fs.writeFile("./models/"+name+".java", value, function(err) {
                if(err) {
                    return reject(err);
                }
                console.log("The file was saved!");
            }); 

            return resolve(name)
        }catch (err){
            return reject(err)
        }
        
    })
}

const getVariableNames = (coloumnnames)=>{
    let variables = ''
    coloumnnames.forEach(element => {
        //console.log(`type = ${getType(element.Type)}`)
        variables = variables+`\n\t${getType(element.Type)} ${element.Field};`
    });
    return variables
}

const getSettersAndGetter = (coloumnnames)=>{
    let functionsvalues = ''
    coloumnnames.forEach(item =>{
        functionsvalues = functionsvalues + `\n${getSetterFunction(item.Field,getType(item.Type))}\n${getGetterFunction(item.Field,getType(item.Type))}\n\n`
    })

    return functionsvalues
}


const getGetters = (coloumnnames)=>{
    let functionsvalues = ''
    coloumnnames.forEach(item =>{
        functionsvalues = functionsvalues + `\n${getSetterFunction(item.Field,getType(item.Type))}\n${getGetterFunction(item.Field,getType(item.Type))}\n\n`
        
    })

    return functionsvalues
}



const getType = (field)=>{
    console.log(`${field} = ${field === 'int(11)'}`)
    field = field.split("(")[0]
    console.log(field)
    if(field === 'varchar' || field === 'char' || field === 'Text' || field === 'text'){
        return 'String'
    }else if(field === 'int'){
        return 'int'
    }else if(field === 'tinyint'){
        return 'boolean'
    }
}




const getSetterFunction = (field,variabletype)=>{
   return `public void set${field.charAt(0).toUpperCase() + field.slice(1)}(${variabletype} ${field}) {
        this.${field} = ${field};
    }`

}


const getGetterFunction = (field,variabletype)=>{
    return `public ${variabletype} get${field.charAt(0).toUpperCase() + field.slice(1)}() {
        return ${field};
    }`


     
 
 }