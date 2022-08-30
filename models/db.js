const mysql = require('mysql2/promise')

async function query(sql, params) {
    try {
        const conn = await mysql.createPool({
            user: "dbuser",
            password: "password",
            database: "express_mysql_sequelize_development",
            host: "127.0.0.1",
            port: 3308,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        })

        const [results, _] = await conn.query(sql, params)

        return results
    } catch (error) {
        throw error;
    }
}

module.exports = {
    query
}
