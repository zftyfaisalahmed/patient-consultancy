const bcrypt = require('bcryptjs')

const comparePassword = async(pass, extPass)=> {
    // comparing stored encrypted with input password(string)
    let status = await bcrypt.compare(pass, extPass);
    return status;
}

module.exports = comparePassword