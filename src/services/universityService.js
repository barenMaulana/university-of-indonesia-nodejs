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
 * 
 * @param {*} callback 
 * @return void
 */
export const getUniversities = function (callback) {
    connection.query('SELECT * FROM universities', (error,results) => {
        if (error) {
            callback(null,error)
        }
        callback(results,null)
    })
 }

/**
 * Get university by id
 * 
 * @param {*} callback 
 * @return void
 */
export const getUniversity = function (request, callback) {
    connection.query('SELECT * FROM universities WHERE id = ?',[request.params.id],(error,results,fields) => {
        if (results.length == 0) {
            callback(null,error)
        }
            callback(results,null)
    })
}

/**
 * Insert university
 * 
 * @param {*} callback
 * @return void
 */
export const createUniversity = function (request,callback){
    connection.query('INSERT INTO universities SET ?',request.body,(error,results,fields) => {
        if (error) {
            callback(null,error)
        }
        callback(results,null)
    })
}