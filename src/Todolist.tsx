import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
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
import {Task} from "./components/Task";

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

export const Todolist = React.memo(({listId, title, tasks, filter}: PropsType) => {
    console.log("TodoList")
    const dispatch = useDispatch();

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, listId))
    }, [dispatch, title, listId])

    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(taskId, listId))
    }, [dispatch, listId])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, listId))
    }, [dispatch, listId])

    const removeTodolist = useCallback(() => {
        dispatch(deleteTodoListAC(listId))
    }, [dispatch, listId])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeListTitleAC(listId, title))
    }, [dispatch, listId, title])

    const changeFilter = useCallback((filter: FilterValuesType) => {
        dispatch(setFilterAC(filter, listId))
    }, [dispatch, filter, listId])

    const onAllClickHandler = useCallback(() => changeFilter("all"), [changeFilter]);
    const onActiveClickHandler = useCallback(() => changeFilter("active"), [changeFilter]);
    const onCompletedClickHandler = useCallback(() => changeFilter("completed"), [changeFilter]);

    let tasksForTodolist: TaskType[] = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
    }
    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            {/*<button onClick={removeTodolist}>x</button>*/}
            <IconButton aria-label="delete" size="large" onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasksForTodolist.map(t =>
                    <Task
                        key={t.id}
                        taskId={t.id}
                        listId={listId}
                        title={t.title}
                        isDone={t.isDone}
                        changeTaskStatus={changeTaskStatus}
                        removeTask={removeTask}
                    />
                //{
                    // const onClickHandler = () => removeTask(t.id)
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     let newIsDoneValue = e.currentTarget.checked;
                    //     changeTaskStatus(t.id, newIsDoneValue);
                    // }
                    // const onTitleChangeHandler = (newValue: string) => {
                    //     dispatch(changeTaskTitleAC(t.id, newValue, listId))
                    // }
                    //
                    //
                    // return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    //     {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                    //     <Checkbox onChange={onChangeHandler} checked={t.isDone} color="primary"/>
                    //     <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                    //     {/*<button onClick={onClickHandler}>x</button>*/}
                    //     <IconButton aria-label="delete" size="large" onClick={onClickHandler}>
                    //         <Delete/>
                    //     </IconButton>
                    // </li>
               // }
                )
            }
        </ul>
        <div>
            <Button variant={filter === 'all' ? "outlined" : "text"}
                    color='inherit'
                    onClick={onAllClickHandler}>
                All
            </Button>
            <Button variant={filter === 'active' ? "outlined" : "text"}
                    color='primary'
                    onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button variant={filter === 'completed' ? "outlined" : "text"}
                    color='secondary'
                    onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>
})
