import {body} from "express-validator"

export const loginValidation = [
    body("email", "invalid mail format").isEmail(),
    body("password", "password must be at least 5 characters").isLength({min:5})
] 

export const registerValidation = [
    body("email", "invalid mail format").isEmail(),
    body("password", "password must be at least 5 characters").isLength({min:5}),
    body("fullName", "write a name").isLength({min: 3}),
    body("avatarUrl", "wrong avatar link").optional().isURL(),
] 

export const postCreateValidation = [
    body("title", "enter article title").isLength({min:3}).isString(),
    body("text", "enter the text of the article").isLength({min:10}).isString(),
    body("tags", "invalid tag format").optional().isString(),
    body("imageUrl", "invalid image link").optional().isString(),
] 