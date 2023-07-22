import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v4} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {addEmptyTaskArrayAC} from "./store/reducers/tasks/tasksActionCreators";
import { createTodoListAC} from "./store/reducers/todoLists/todoListsActionCreators";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";

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
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)

    function addTodolist(title: string) {
        let newTodolistId = v4();
        dispatch(createTodoListAC(title, newTodolistId))
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
                                            listId={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            filter={tl.filter}
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
