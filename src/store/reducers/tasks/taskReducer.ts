import {v4} from "uuid";
import {TasksStateType} from "../../../App";
import {
    ADD_EMPTY_TASK_ARRAY,
    ADD_TASK,
    CHANGE_TASK_STATUS,
    CHANGE_TASK_TITLE,
    REMOVE_TASK,
    UnionTasksACType
} from "./tasksActionCreators";
import {todolistId1, todolistId2} from "../todoLists/todoListReducer";

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v4(), title: "HTML&CSS", isDone: true},
        {id: v4(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v4(), title: "Milk", isDone: true},
        {id: v4(), title: "React Book", isDone: true}
    ]
}


export const taskReducer = (state: TasksStateType=initialState, action: UnionTasksACType): TasksStateType => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {
                ...state,
                [action.payload.listId]: state[action.payload.listId]
                    .filter(task => task.id !== action.payload.taskId)
            }
        }

        case ADD_TASK:
            const newTask = {id: v4(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.listId]: [newTask, ...state[action.payload.listId]]
            }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.payload.listId]: state[action.payload.listId]
                    .map(task => task.id === action.payload.id
                        ? {...task, isDone: action.payload.isDone}
                        : task
                    )
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.payload.listId]: state[action.payload.listId]
                    .map(task => task.id === action.payload.id
                        ? {...task, title: action.payload.newTitle}
                        : task
                    )
            }

        case ADD_EMPTY_TASK_ARRAY:
            return {
                ...state,
                [action.payload.listId]: []
            }

        default:
            return state

    }
}
