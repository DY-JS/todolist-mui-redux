import {
    ACTIVE,
    ALL,
    CHANGE_TITLE,
    COMPLETED,
    CREATE_TODOLIST,
    UnionTodoListACType
} from "./todoListsActionCreators";
import {FilterValuesType, TodolistType} from "../../App";
import {ADD_EMPTY_TASK_ARRAY} from "../tasks/tasksActionCreators";

export const todoListReducer = (state: TodolistType[], action: UnionTodoListACType): TodolistType[] => {
    switch (action.type) {
        // case ALL :
        // case COMPLETED:
        // case ACTIVE:
        //     return state.map(todolist => todolist.id === action.payload.listId
        //         ? { ...todolist, filter: action.payload.filter }
        //         : todolist
        //     );
        case ALL:
            return state.map((todolist) =>
                todolist.id === action.payload.listId
                    ? { ...todolist, filter: "all" }
                    : todolist
            );
        case COMPLETED:
            return state.map((todolist) =>
                todolist.id === action.payload.listId
                    ? { ...todolist, filter: "completed" }
                    : todolist
            );
        case ACTIVE:
            return state.map((todolist) =>
                todolist.id === action.payload.listId
                    ? { ...todolist, filter: "active" }
                    : todolist
            );
        case CHANGE_TITLE:
            return state.map(todolist => todolist.id === action.payload.listId
            ? {...todolist, title: action.payload.title}
            : todolist
            );

        case CREATE_TODOLIST:
        const newTodoList = {
            id: action.payload.listId,
            title: action.payload.title,
            filter: "all" as FilterValuesType
        }
    return [newTodoList, ...state]



        default:
            return state;
    }

}