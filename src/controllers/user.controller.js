// 사용자 관련 비즈니스 로직
exports.getAllUsers = (req, res) => {
    res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
  };
  
  exports.createUser = (req, res) => {
    const { name } = req.body;
    res.status(201).json({ message: `User ${name} created successfully!` });
  };
  