let topics = async (req, res) => {
    const db = req.app.get('db');
    const topics = await db.topics.getTopics();
    res.status(200).json(topics)
}

let posts = async (req, res) => {
    const db = req.app.get('db');
    const topicID = +req.params.topicID;
    const posts = await db.posts.getTopicPosts(topicID);
    res.status(200).json(posts)
}

let addPost = async (req, res) => {
    const db = req.app.get('db');
    const {userID, topicID, userPost} = req.body

    if(!userPost){
        res.status(409).json('Post is empty')
    }else{
        const posts = await db.posts.addPost(topicID, userID, userPost);
        res.status(200).json(posts);
    }
}

let deletePost = async (req, res) => {
    const db = req.app.get('db');
    const {topicID, postID} = req.body

    const posts = await db.posts.deletePost(topicID, postID);
    res.status(200).json(posts)
}

module.exports = {
    topics,
    posts,
    addPost,
    deletePost
}