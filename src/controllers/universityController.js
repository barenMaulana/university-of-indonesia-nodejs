import mysql from 'mysql'
import { getUniversities } from '../services/universityService.js'

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
 export const index = (request, response) => {
    getUniversities((universities, error) => {
        if (error != null) {
            response.json({
                "status" : "failed",
                "message" : error,
                "data" : null
            })
        }
        response.json({
            "status" : "success",
            "message" : "List of universities",
            "data" : universities
        })
    })

}

/**
 * Get university
 */
 export const show = (request,response) => {
    connection.query('SELECT * FROM universities WHERE id = ?',[request.params.id],(error,results,fields) => {
        if (results.length == 0) {
            return response.status(400).json({
                "status" : "failed",
                "message" : "wrong university id",
                "data" : null
            })
        }
        return response.json({
            "status" : "success",
            "message" : "Detail of university",
            "data" : results[0]
        })
    })
} 

/**
 * Create university
 */
 export const store = (request,response) => {
    connection.query('INSERT INTO universities SET ?',request.body,(error,result,fields) => {
        if (error) {
            return response.status(500).json({
                "status" : "failed",
                "message" : error,
                "data" : null
            })
        }
        return response.status(201).json({
            "status" : "success",
            "message" : "New university added",
            "data" : null
        })
    })
}

/**
 * Update university
 */
 export const update = (request,response) => {
    connection.query('UPDATE universities SET name = ?, address = ?, abbreviation = ? WHERE id = ?',[request.body.name,request.body.address,request.body.abbreviation,request.params.id],(error,results,fields) =>{
        if (error) {
            return response.status(500).json({
                "status" : "failed",
                "message" : error,
                "data" : null
            })
        }
        return response.json({
            "status" : "success",
            "message" : "University updated",
            "data" : null
        });
    })
}

/**
 * Delete university
 */
 export const destroy = (request,response) => {
    connection.query('DELETE FROM universities WHERE id = ?',[request.params.id],(error,results,fields) => {
        if (error) {
            return response.status(500).json({
                "status" : "failed",
                "message" : error,
                "data" : null
            })
        }
        return response.status(204).json({
            "status" : "success",
            "message" : "Uiversity deleted",
            "data" : null
        })
    })
}

