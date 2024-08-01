import { Request, Response } from 'express'
import prisma from '../helpers/prisma'

async function getAuthors(req: Request, res: Response) {
    await prisma.author
        .findMany({
            include: {
                books: true,
            },
        })
        .then((authors) => {
            res.json({
                message: 'Authors retrieved successfully',
                authors,
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

async function getAuthor(req: Request, res: Response) {
    const { id } = req.params
    await prisma.author
        .findFirst({
            where: {
                id: Number(id),
            },
        })
        .then((author) => {
            if (!author) {
                res.status(404).json({
                    status: 404,
                    message: 'Author not found',
                })
            }
            res.json({
                author,
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

async function storeAuthor(req: Request, res: Response) {
    const { name, books } = await req.body
    await prisma.author
        .create({
            data: {
                name,
                books: {
                    create: books,
                },
            },
        })
        .then((author) => {
            res.status(200).json({
                message: 'Author created successfully',
                author,
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

async function updateAuthor(req: Request, res: Response) {
    const { id } = req.params
    const { name, books } = req.body
    await prisma.author
        .update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                books: {
                    create: books,
                },
            },
        })
        .then((author) => {
            res.status(200).json({
                message: 'Author updated successfully',
                author,
            })
        })
        .catch((err) => {
            res.json(err)
        })
}
async function deleteAuthor(req: Request, res: Response) {
    const { id } = req.params

    await prisma.author
        .delete({
            where: {
                id: Number(id),
            },
        })
        .then(() => {
            res.status(200).json({
                message: 'Author deleted successfully',
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

export { getAuthors, getAuthor, storeAuthor, updateAuthor, deleteAuthor }
