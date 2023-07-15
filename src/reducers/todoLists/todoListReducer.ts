import {
    SET_FILTER,
    CHANGE_TITLE,
    CREATE_TODOLIST,
    DELETE_TODOLIST,
    UnionTodoListACType
} from "./todoListsActionCreators";
import {FilterValuesType, TodolistType} from "../../App";

export const todoListReducer = (state: TodolistType[], action: UnionTodoListACType): TodolistType[] => {
    switch (action.type) {
        case SET_FILTER:
            return state.map(todolist => todolist.id === action.payload.listId
                ? {...todolist, filter: action.payload.filter}
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
            return [newTodoList, ...state];

        case DELETE_TODOLIST:
            return state.filter(todolist => todolist.id !== action.payload.listId)

        default:
            return state;
    }

}