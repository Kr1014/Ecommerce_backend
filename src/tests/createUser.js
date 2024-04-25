const User = require("../models/User")

require("../models/User")

const createUser = async()=>{
    newUser= {
        firstName : "Yoneison",
        lastName: "Camacho",
        email : "yoneison@gmail.com",
        password : "yoneison1234",
        phone : "0412958"
    }
    await User.create(newUser)
}

module.exports = createUser