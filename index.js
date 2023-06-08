import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import {UserController, PostController} from "./controllers/index.js";
import {handleValidationErrors, checkAuth} from './utils/index.js';
import cors from "cors";


mongoose.connect("mongodb+srv://adam:55555@blogs.gri2pat.mongodb.net/blogs?retryWrites=true&w=majority")
    .then(() => console.log("DB CONNECTED!"))
    .catch((error) => console.log("DB ERROR!", error)
    )

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, callb) => {
        callb(null, "uploads")
    },
    filename: (_, file, callb) => {
        callb(null, file.originalname)
    }
})

const upload = multer({storage})

app.use(express.json())
app.use("/uploads", express.static("uploads")) 
app.use(cors())

/* // Роуты авторизации и регистрации:
app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe); */

app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)


/* // Роут для загрузки файлов:
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
}); */

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})


/* // Роуты связанные с постами:
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.get('/posts/createdAt', PostController.getPostsSortedByDate);
app.get('/posts/viewCount', PostController.getPostsSortedByViews);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:tag', PostController.getPostsByHashTag);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update); */

//////////
/* app.get('/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.get('/posts/createdAt', PostController.getPostsSortedByDate);
app.get('/posts/viewCount', PostController.getPostsSortedByViews);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:tag', PostController.getPostsByHashTag); */


app.get('/tags', PostController.getLastTags)

app.get('/posts/viewCount', PostController.getPostsSortedByViews)
app.get('/posts/createdAt', PostController.getPostsSortedByDate)

app.get('/posts/:id', PostController.getOne)

app.get('/posts/tags/:tag', PostController.getPostsByHashTag)
app.get('/posts/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll)

app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)


app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)


///////////
/* // Роут связанный с тегами:
app.get('/tags', PostController.getLastTags)

// Роуты связанные с постами:
app.get('/posts', PostController.getAll)
app.get('/posts/createdAt', PostController.getPostsSortedByDate)
app.get('/posts/viewCount', PostController.getPostsSortedByViews)
app.get('/posts/:id', PostController.getOne)
app.get('/posts/tags', PostController.getLastTags)
app.get('/posts/:tag', PostController.getPostsByHashTag)

app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update)
 */

/* // Роуты связанные с тегами:
app.get('/tags', PostController.getLastTags); */

app.listen(4444, (error) => {
    if (error) return console.log(error)
    
    console.log("server ok!")
})
