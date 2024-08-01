import { Response, Request } from 'express'
import prisma from '../helpers/prisma'

async function getBooks(req: Request, res: Response) {
    await prisma.book
        .findMany({
            include: {
                authors: true,
            },
        })
        .then((books) => {
            res.json({
                books,
            })
        })
        .catch((err) => {
            res.json(err)
        })
}
async function getBook(req: Request, res: Response) {
    const { id } = req.params

    await prisma.book
        .findUnique({
            where: {
                id: Number(id),
            },
            include: {
                authors: true,
            },
        })
        .then((book) => {
            if (!book) {
                return res.status(404).json({
                    status: 404,
                    message: 'Book not found',
                })
            }
            res.json({
                book,
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

async function storeBook(req: Request, res: Response) {
    const { title, chapters, pages, authors } = await req.body
    await prisma.book
        .create({
            data: {
                title,
                chapters,
                pages,
                authors: {
                    create: authors,
                },
            },
        })
        .then((book) => {
            res.status(200).json({
                message: 'Book created successfully',
                book,
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

async function deleteBook(req: Request, res: Response) {
    const { id } = req.params

    await prisma.book
        .delete({
            where: {
                id: Number(id),
            },
        })
        .then((book) =>
            res.json({
                message: 'Book deleted successfully',
                book,
            })
        )
}

export { getBooks, getBook, storeBook, deleteBook }
