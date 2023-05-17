const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });

        console.log('Database initialized, success!!');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error when initializing database');        
    }
}

module.exports = {
    dbConnection
}
