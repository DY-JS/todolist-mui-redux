import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
// import { Delete } from '@mui/icons-material'
// import { IconButton } from '@mui/material'
import {Delete} from '@material-ui/icons';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./store/reducers/tasks/tasksActionCreators";
import {useDispatch} from "react-redux";
import {changeListTitleAC, deleteTodoListAC, setFilterAC} from "./store/reducers/todoLists/todoListsActionCreators";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    listId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const dispatch = useDispatch();

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.listId))
    }

    const removeTask = (taskId: string) => {
        dispatch(removeTaskAC(taskId, props.listId))
    }

    const changeTaskStatus = (taskId:string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, props.listId))
    }

    const removeTodolist = () => {
        dispatch(deleteTodoListAC(props.listId))
    }

    function changeTodolistTitle(title: string) {
        dispatch(changeListTitleAC(props.listId, title))
    }

    function changeFilter(filter: FilterValuesType) {
        dispatch(setFilterAC(filter, props.listId))
    }

    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton aria-label="delete" size="large" onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        changeTaskStatus(t.id, newIsDoneValue);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.listId))
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                        <Checkbox onChange={onChangeHandler} checked={t.isDone} color="primary" />
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton aria-label="delete" size="large" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "text"}
                    color='inherit'
                    onClick={onAllClickHandler}>
                All
            </Button>
            <Button variant={props.filter === 'active' ? "outlined" : "text"}
                    color='primary'
                    onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "text"}
                    color='secondary'
                    onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>
}
