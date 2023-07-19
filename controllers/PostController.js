import PostModel from "../models/Post.js"
import CommentSchema from "../models/Comment.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user").exec()
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            /*message: "не удалось получить статьи" */
            message: "failed to retrieve articles"
        })
    }
}

export const getPostsSortedByDate = async (req, res, next) => {
    try {
        const sortedPosts = await PostModel.find()
            .populate("user")
            .sort({createdAt: -1})
            .exec();
        const postsWithDate = sortedPosts.map(post => ({
            ...post._doc,
            createdAt: new Date(post.createdAt)
        }));
        res.json(postsWithDate);
    } catch (error) {
        console.warn(error);
        next(error); // Передача ошибки в следующий обработчик ошибок
    }
};


export const getPostsSortedByViews = async (req, res) => {
    try {
        const sortedPosts = await PostModel.find()
            .populate("user")
            .sort({viewsCount: -1})
            .exec();
        res.json(sortedPosts);
    } catch (error) {
        console.warn(error);
        // throw new Error("Не удалось получить сообщения, отсортированные по просмотрам");
        throw new Error("Failed to fetch posts sorted by views");
    }
};

export const getPostsSortedByUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const posts = await PostModel.find().populate("user").exec();
        const filteredPostsByUser = posts.filter(post => String(post.user._id) === String(userId));

        res.json(filteredPostsByUser);
    } catch (error) {
        console.warn(error);
        next(error);
    }
};

export const getPostsByHashTag = async (req, res) => {
    try {
        const tag = req.params.tag;
        const posts = PostModel.find({tags: {$in: [tag]}}).populate("user").sort({createdAt: -1}).exec();
        res.json(posts);
    } catch (error) {
        console.warn(error);
        res.status(500).json({
            message: "Не удалось получить статьи по хэштегу",
            error: error.message, // Добавляем сообщение об ошибке в ответ
        });
        throw new Error("Failed to fetch posts sorted by tags");
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).json({
                /* message: "Некорректный идентификатор поста" */
                message: "Invalid post identifier"
            });
        }
        const doc = await PostModel.findByIdAndUpdate(
            postId,
            {$inc: {viewsCount: 1}},
            {new: true}
        ).populate("user");

        if (!doc) {
            return res.status(404).json({
                /* message: "статья не найдена" */
                message: "article not found"
            });
        }
        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            /* message: "не удалось получить статью" */
            message: "failed to retrieve articles"
        });
    }
};

export const addComment = async (req, res) => {
    const postId = req.params.id; // Получаем id поста из параметров запроса
    const {user, content} = req.body; // Получаем id пользователя и текст комментария из тела запроса

    try {
        // Создаем новый комментарий
        const comment = new CommentSchema({
            user: user._id,
            avatarUrl: user.avatarUrl,
            fullName: user.fullName,
            content: content
        });
        // Находим пост по его id
        const post = await PostModel.findById(postId);
        // Добавляем комментарий к массиву комментариев в посте
        post.comments.push(comment);
        // Сохраняем изменения в базе данных
        await post.save();
        // Отправляем успешный ответ клиенту post с добавленным комментарием
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        console.log(error)
        // Если произошла ошибка, отправляем соответствующий ответ клиенту
        //res.status(500).json({error: "Ошибка при добавлении комментария"});
        res.status(500).json({error: "Error when adding a comment"});
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(","),
            user: req.userId
        });

        const post = await doc.save()
        res.json(post)
    } catch (error) {
        console.warn(error)
        res.status(500).json({
            /*message: "не удалось создать статью" */
            message: "failed to create article"
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndDelete({_id: postId});
        if (!doc) {
            return res.status(404).json({
                /* message: "статья не найдена" */
                message: "article not found"
            });
        }
        res.json({
            success: true
        });
    } catch (error) {
        console.warn(error);
        res.status(500).json({
            /* message: "не удалось удалить статью" */
            message: "failed to delete article"
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.updateOne(
            {
                _id: postId
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(","),
                user: req.userId
            },
        )
        res.json({
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            /*message: "не удалось обновить статью" */
            message: "failed to update article"
        })
    }
}


export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()
        const tags = posts.map((obj) => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            /*message: "не удалось получить статьи" */
            message: "failed to retrieve articles"
        })
    }
}
