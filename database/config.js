
const mongoose = require('mongoose');


const dbConnection = async () => {
    try{
        
        console.log('init db config');
        await mongoose.connect(process.env.DB_CNN);
        console.log('connecting to db');
    }catch(err){
        console.log(err);
        throw Error('Error en la base de datos');
    }
}


module.exports = {
    dbConnection
}