const express = require('express')
const router = new express.Router()
const Book = require('../models/Book')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {    
    const book = new Book({
        ...req.body,
        owner: req.user._id,
        email: req.user.email
    })                            
    try{
        await book.save()
        res.status(201).send(book)
    }
    catch (error){
        res.status(400).send(error)
    }
})

router.get('/me', auth,  async (req, res) => {
        try{
            const books = await Book.find({owner: req.user._id})
            res.status(201).send(books)
        }
        catch(error){
            res.status(500).send(error)
        }   
})

router.get('/allbooks', auth,  async (req, res) => {
    try{
        const books = await Book.find()
        res.status(201).send(books)
    }
    catch(error){
        res.status(500).send(error)
    }   
})

router.delete('/:id', auth, async (req, res) => {
    try{
        const book = await Book.findOneAndDelete({_id: req.params.id, owner: req.user._id })
        if(!book){
            res.status(404).send()
        }
        res.send(book)
    }
    catch(error){
        res.status(500).send()
    }
})

router.delete('/admin/:id', auth, async(req, res) => {
    try{
        const book = await Book.findOneAndDelete({_id: req.params.id})
        if(!book){
            res.status(404).send()
        }
        res.send(book)
    }catch(error){
        res.status(500).send()
    }
})

router.get('/', (req, res) => {
    res.json("this is the book router")
})

module.exports = router