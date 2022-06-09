'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

const table = 'products'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM data'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM data WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE data SET ? WHERE id = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO data SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM data WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    }
}