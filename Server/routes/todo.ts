import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
import { Todo } from  "../db";
const router = express.Router();

interface inputI{
  title: String;
  description: String;
}

router.post('/todos', authenticateJwt, (req, res) => {
  const input: inputI = req.body;
  //const { title, description } = req.body;
  const done = false;
  const userId = req.headers["UserId"];

  const newTodo = new Todo({ title: input.title, description: input.description, done, userId });

  newTodo.save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req, res) => {
  const userId = req.headers["UserId"];

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

//patch is used when only a few fileds need to be updated
router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.headers["UserId"];

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

//module.exports = router;
export default router;