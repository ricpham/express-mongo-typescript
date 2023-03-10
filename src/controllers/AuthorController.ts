import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author, { IAuthorModel } from '../models/Author';

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    }) as IAuthorModel;

    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
};

const getAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
        .then((author) => (author ? res.status(200).json({ data:author }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const getAllAuthor = (req: Request, res: Response, next: NextFunction) => {
    return Author.find()
        .then((authors) => res.status(200).json({ data: authors }))
        .catch((error) => res.status(500).json({ error }));
};

const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                author.set(req.body);

                return author
                    .save()
                    .then((author) => res.status(200).json({ data: author }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ message: 'Deleted Success' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createAuthor, getAuthor, getAllAuthor, updateAuthor, deleteAuthor };
