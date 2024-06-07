import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, editTask } from '../redux/actions/taskActions';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task) {
      dispatch(addTask({ id: uuidv4(), text: task }));
      setTask('');
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEditTask = () => {
    if (editTaskText) {
      dispatch(editTask(currentTaskId, { text: editTaskText }));
      setEditTaskText('');
      setIsEditMode(false);
    }
  };

  return (
    <div>
      <TextField
        label="Add Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <Button onClick={handleAddTask} variant="contained" color="primary">Add Task</Button>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.text} />
            <IconButton onClick={() => { setIsEditMode(true); setCurrentTaskId(task.id); setEditTaskText(task.text); }}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDeleteTask(task.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Dialog open={isEditMode} onClose={() => setIsEditMode(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Edit Task"
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditMode(false)} color="primary">Cancel</Button>
          <Button onClick={handleEditTask} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoApp;
