import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v4} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {taskReducer} from "./reducers/tasks/taskReducer";
import {
    addEmptyTaskArrayAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./reducers/tasks/tasksActionCreators";
import {todoListReducer} from "./reducers/todoLists/todoListReducer";
import {
    changeListTitleAC, createTodoListAC, deleteTodoListAC, setFilterAC
} from "./reducers/todoLists/todoListsActionCreators";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistId1 = v4();
    let todolistId2 = v4();

    const initialTasks: TasksStateType = {
        [todolistId1]: [
            {id: v4(), title: "HTML&CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v4(), title: "Milk", isDone: true},
            {id: v4(), title: "React Book", isDone: true}
        ]
    }

    const initialTodoLists: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ];

    let [tasks, dispatch] = useReducer(taskReducer, initialTasks);

    let [todolists, dispatchLists] = useReducer(todoListReducer, initialTodoLists)


    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        dispatchLists(setFilterAC(filter, todolistId))
        // switch(filter) {
        //     case "all": return dispatchLists(setAllAC(filter, todolistId))
        //     case "completed": return dispatchLists(setCompletedAC(filter, todolistId))
        //     case "active": return dispatchLists(setActiveAC(filter, todolistId))
        // }
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function removeTodolist(id: string) {
        dispatchLists(deleteTodoListAC(id))
    }

    function changeTodolistTitle(id: string, title: string) {
        dispatchLists(changeListTitleAC(id, title))

    }

    function addTodolist(title: string) {
        let newTodolistId = v4();
        dispatchLists(createTodoListAC(title, newTodolistId))
        dispatch(addEmptyTaskArrayAC(newTodolistId))
    }

    return (
        // <div className="App">
        <div>
            <ButtonAppBar/>
            <Container fixed>
                {/*Container fixed - общий контейнер*/}
                {/*<Grid container> как флекс контайнер*/}
                <Grid container style={{padding: "25px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let tasksForTodolist = tasks[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }

                            return (
                                <Grid key={tl.id} item>
                                    {/*<Paper elevation={3} - это карточка с тенью 3px*/}
                                    <Paper elevation={3} style={{padding: "10px", minHeight: "300px"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
