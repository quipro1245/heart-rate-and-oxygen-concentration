'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

const table = 'benhnhans'

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM benhnhans'
        db.query(sql, (err, response) => {
                if (err) throw err
                res.json(response)
            })
            // res.render('./views/index', { title: 'Trang chủ' })

    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM benhnhans WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let productId = req.params.productId;
        let sql = 'UPDATE benhnhans SET ? WHERE id = ?'
        db.query(sql, [data, productId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO benhnhans SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM benhnhans WHERE id = ?'
        db.query(sql, [req.params.productId], (err, response) => {
            if (err) throw err
            res.json({ message: 'Delete success!' })
        })
    },
    trangchu: (req, res) => {
        // res.send('index')
        console.log('a')
    }
}