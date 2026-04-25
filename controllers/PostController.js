import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 5)


        res.json(tags)
    } catch (err) {
        console.log(err);

        res.status(500).json({
            massage: 'Posts was not found'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({
            path: 'user',
            select: ['fullName', 'avatarUrl'],
        }).exec()

        res.json(posts)
    } catch (err) {
        console.log(err);

        res.status(500).json({
            massage: 'Posts was not found'
        })
    }
}

export const getOne = async (req, res) => {

    try {


        const postId = req.params.id

        const doc = await PostModel.findOneAndUpdate({
            _id: postId,
        },
            { $inc: { viewsCount: 1 } },
            {
                returnDocument: 'after'
            },
        ).populate('user')
        if (!doc) {
            console.log(doc);
            return res.status(404).json({
                massage: 'Статті не існує'
            })
        }

        res.json(doc)
    }
    catch (err) {
        console.log(err);
        console.log("err");

        res.status(500).json({
            massage: 'Статтю не отримано'
        })
    }
}

export const remove = async (req, res) => {

    try {
        const postId = req.params.id

        const doc = await PostModel.findByIdAndDelete({
            _id: postId
        })
        if (!doc) {
            return res.status(404).json({
                massage: 'Post was not found'
            })
        }

        res.json({
            success: true,
        })
    }
    catch (err) {
        console.log(err);
        console.log("err");

        res.status(500).json({
            massage: 'Статтю не отримано'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        })

        console.log(req.userId);


        const post = await doc.save()

        res.json(post)

    } catch (err) {
        console.log(err);

        res.status(500).json({
            massage: 'Post was not saved'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        const doc = await PostModel.updateOne({
            _id: postId
        },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(','),
                user: req.userId,
            })

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err);

        res.status(500).json({
            massage: 'Post was not updated'
        })
    }
}