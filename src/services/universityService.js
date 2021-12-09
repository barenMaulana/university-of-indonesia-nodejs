import mysql from 'mysql'

/**
 * database connection setting
 */
 const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'university'
})
connection.connect()

/**
 * Get universities
 */
export const getUniversities = function (callback) {
    connection.query('SELECT * FROM universities', (error,results) => {
        if (error) {
            callback(null,error)
        }
        callback(results,null)
    })
 }