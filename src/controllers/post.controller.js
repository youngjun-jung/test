// 게시물 관련 비즈니스 로직
exports.getAllPosts = (req, res) => {
    res.json([{ id: 1, title: 'First Post' }, { id: 2, title: 'Second Post' }]);
  };
  
  exports.createPost = (req, res) => {
    const { title } = req.body;
    res.status(201).json({ message: `Post "${title}" created successfully!` });
  };
  