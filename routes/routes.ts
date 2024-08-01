import { Router, Request, Response } from 'express'
import {
    deleteBook,
    getBook,
    getBooks,
    storeBook,
} from '../constrollers/book.controller'
import {
    deleteAuthor,
    getAuthor,
    getAuthors,
    storeAuthor,
} from '../constrollers/author.controller'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json({
        message:
            'Crear una API REST en Node.js que gestione Libros y Autores. se deben crear dos endpoints, uno para libros y otro para autores. Cada uno de estos endpoints debe permitir realizar las operaciones CRUD (Create, Read, Update, Delete).',
    })
})

router.get('/books', getBooks)
router.post('/books', storeBook)
router.get('/books/:id', getBook)
router.delete('/books/:id', deleteBook)

router.get('/authors', getAuthors)
router.post('/authors', storeAuthor)
router.get('/authors/:id', getAuthor)
router.delete('/authors/:id', deleteAuthor)

export { router }
