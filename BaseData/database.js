const mariadb = require("mariadb");

const config = {
    //host: "127.0.0.1",
    host: "localhost",
    //host: "192.168.0.27",
    user: "Luna",
    password: "liofilizador",
    database: "box",
    connectionLimit: 5,
    acquireTime: 300
};

class DBConnector {
    dbconnector = mariadb.createPool(config);
    
    async query(sQuery) {
        var conn = await this.dbconnector.getConnection();
        var ret = null;
        await conn.query(sQuery)
            .then(data => {
                ret = data;
                conn.end();
            })
            .catch(error => {
                console.log(error);
                conn.end();
            });
        return ret;
    };
    async queryWithParams(sQuery, params) {
        var conn = await this.dbconnector.getConnection();
        var ret = null;
        await conn.query(sQuery, params)
            .then(data => {
                ret = data;
                conn.end();
            })
            .then(error => {
                console.log(error);
                conn.end();
            });
        return ret;
    };
};

module.exports = new DBConnector();