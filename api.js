const express = require('express')
const vc = require('./dbs')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(4500, () => {
    console.log('Hello world')
})

app.get('/mobiles', (req, res) => {
    vc.getMobiles()
        .then((mobiles) => {
            res.json(mobiles)
        })
        .catch(() => {
            res.send('error')
        })
})
app.post('/mobiles', (req,res) => {
    vc.postMobiles(req.body.mobile, req.body.price)
        .then((mobiles) => {
            res.send(mobiles)
        })
        .catch(() => {
            res.send('error')
        })
})
app.put('/mobiles', (req, res) => {
    vc.putMobiles(req.body.mobile, req.body.price, req.body.id)
        .then(() => {
            res.send(req.body)
        })
        .catch(() => {
            res.send('error')
        })
})
app.delete('/mobiles', (req, res) => {
    vc.delMobiles(req.body.id)
        .then((mobiles) => {
            res.send(mobiles)
        })
        .catch(() => {
            res.send('error')
        })
}) 
