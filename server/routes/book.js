import express from 'express';
const router = express.Router();
import { verifyAdmin } from './auth.js';
import { Book } from '../models/Book.js';

router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, author, imageUrl } = req.body;

        const newbook = new Book({
            name,
            author,
            imageUrl
        })
        await newbook.save();
        return res.json({ added: true });
    } catch (error) {
        return res.json({ message: "Error in adding Book" })
    }
})

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        return res.json(books);
    } catch (error) {
        return res.json(error);
    }
})

router.get('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById({ _id: id });
        return res.json(book);
    } catch (error) {
        return res.json(error);
    }
}
)
router.put('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndUpdate({ _id: id }, req.body)
        return res.json({ updated: true, book });
    } catch (error) {
        return res.json(error);
    }
})

router.delete('/book/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findByIdAndDelete({_id: id})
        return res.json({deleted: true, book});
    } catch (error) {
        return res.json(error);
    }
})

export { router as bookRouter } 