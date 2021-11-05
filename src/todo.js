import React, {useEffect, useState} from 'react'
import { List ,ListItem, ListItemText, Box, Button, Typography, Modal, Input} from '@material-ui/core'
import "./Todo.css"
import db from './firebase'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
  function Todo(props) {
      
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState(props.todo.todo);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
      
    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        },{merge: true})
        handleClose();
    }

    useEffect(()=>{
        setInput(props.todo.todo);
    },[props.todo.todo])

    return (
        <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="modal_box">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    UPDATE <br /><br />
                </Typography>
                <form action="">
                    <Input className="update_field" placeholder={props.todo.todo} value={input} onChange={changeEvent => setInput(changeEvent.target.value)}/>
                </form>
                <br />
                <Button className="modal_button" onClick={updateTodo}>✅UPDATE</Button>
            </Box>
        </Modal>
        <List className="todo_list">
            <ListItem className="todo_list_item">
                <ListItemText primary={props.todo.todo}></ListItemText>
                <Button onClick={handleOpen}>Edit</Button>
                <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()}>❌</Button>
            </ListItem> 
        </List>
        </>
    )
}

export default Todo
