import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Wrong email').isEmail(),
    body('password', 'Wrong password').isLength({ min: 5 }),
]

export const registerValidation = [
    body('email', 'Wrong email').isEmail(),
    body('password', 'Wrong password').isLength({ min: 5 }),
    body('fullName', 'Wrong name').isLength({ min: 3 }),
    body('avatarURL', 'Wrong URL').optional().isURL()
]

export const postCreateValidation = [
    body('title', 'Wrong title').isLength({ min: 3 }).isString(),
    body('text', 'Wrong text').isLength({ min: 10 }).isString(),
    body('tags', 'Wrong tags').optional().isString(),
    body('imageUrl', 'Wrong URL').optional().isString()
]