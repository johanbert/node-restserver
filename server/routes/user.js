const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const User = require('../models/user')

app.get('/users', (req, res) => {
    let from = Number(req.query.from || 0);
    let limit = Number(req.query.limit || 5)
    User.find({ status: true }, 'name email role status google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            User.count({ status: true }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    count
                })
            });

        })
})
app.post('/user', (req, res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            user: userDB
        })
    })
})
app.put('/user/:id', (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            user: userDB
        })
    })

})
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    }
    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, userDeleted) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!userDeleted) { // OR if (userDeleted === null)
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            userDeleted
        })
    })

})

module.exports = app;