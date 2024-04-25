const sequelize = require('../utils/connection');
const createUser = require('./createUser');
require('../models')

const testMigrate = async () => {

    try {
        await sequelize.sync({ force: true })
        console.log('DB reset ✅');
        await createUser()
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

testMigrate()