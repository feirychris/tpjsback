const postController = require('../controllers/postController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

module.exports = (server) => {
    server.route('/posts')
        .all(jwtMiddleware.verifyToken)
        .get(jwtMiddleware.verifyRoleUser, postController.listAllPosts)
        .post(jwtMiddleware.verifyRoleUser, postController.createAPost);

    server.route('/posts/:id_post') // req.params.id_post
        .get(postController.getAPost)
        .put(postController.updateAPost)
        .delete(postController.deleteAPost);
}