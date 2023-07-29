import React, {ChangeEvent, useCallback} from "react";
import {changeTaskTitleAC} from "../store/reducers/tasks/tasksActionCreators";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    taskId: string
    listId: string
    title: string
    isDone: boolean
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo(({taskId, listId, title, isDone, changeTaskStatus, removeTask}: TaskPropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = useCallback(() => removeTask(taskId), [taskId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue: boolean = e.currentTarget.checked;
        changeTaskStatus(taskId, newIsDoneValue);
    }, [])
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(taskId, newValue, listId))
    }, [taskId, listId])

    return (
        <li key={taskId} className={isDone ? "is-done" : ""}>
            {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
            <Checkbox onChange={onChangeHandler} checked={isDone} color="primary"/>
            <EditableSpan value={title} onChange={onTitleChangeHandler}/>
            {/*<button onClick={onClickHandler}>x</button>*/}
            <IconButton aria-label="delete" size="large" onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})
