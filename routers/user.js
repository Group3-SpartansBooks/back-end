const express = require('express')
const router = new express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')

router.post('/', async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post('/logout', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    }
    catch(error){
        res.status(500).send()
    }
})

router.post('/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }
    catch (error) {
        res.status(400).send()
    }
})

router.get('/me', auth, (req, res) => {
    res.send(req.user)
})

router.get('/admin/allusers', auth,  async (req, res) => {
    try{
        const users = await User.find()
        res.status(201).send(users)
    }
    catch(error){
        res.status(500).send(error)
    }   
})

router.delete('/me', auth, async (req, res) => {
    try{
        await req.user.remove() 
        res.send(req.user)
    }
    catch(error){
        res.status(500).send()
    }
})

router.delete('/admin/:id', auth, async (req, res) => {
    try{
        const user = await User.findOneAndDelete({_id: req.params.id})
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    }
    catch(error){
        res.status(500).send()
    }
})

router.get('/', (req, res) => {
    res.json("this is the user router")
})


module.exports = router