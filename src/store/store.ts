import {combineReducers, createStore} from "redux";
import {taskReducer} from "./reducers/tasks/taskReducer";
import {todoListReducer} from "./reducers/todoLists/todoListReducer";

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolists: todoListReducer
})

export const store = createStore(rootReducer)
// @ts-ignore
window.store = store