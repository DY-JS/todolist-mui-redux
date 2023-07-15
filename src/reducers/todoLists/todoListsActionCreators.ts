import {FilterValuesType} from "../../App";

export const SET_FILTER = "SET_FILTER"
export const CHANGE_TITLE = "CHANGE_TITLE"
export const CREATE_TODOLIST = "CREATE_TODOLIST"
export const DELETE_TODOLIST = "DELETE_TODOLIST"

export type UnionTodoListACType =
    |SetFilterACType
    | ChangeListTitleACType
    | CreateTodoListACType
    | DeleteTodoListACType

export type SetFilterACType = ReturnType<typeof setFilterAC>
export const setFilterAC = (filter: FilterValuesType, listId: string ) => {
    return {
        type: SET_FILTER,
        payload: { filter, listId }
    } as const

}

export type ChangeListTitleACType = ReturnType<typeof changeListTitleAC>
export const changeListTitleAC = (listId: string, title: string ) => {
    return {
        type: CHANGE_TITLE,
        payload: { listId, title  }
    } as const
}

export type CreateTodoListACType = ReturnType<typeof createTodoListAC>
export const createTodoListAC = (title: string, listId: string) => {
    return {
        type: CREATE_TODOLIST,
        payload: {listId, title}
    } as const

}

export type DeleteTodoListACType = ReturnType<typeof deleteTodoListAC>
export const deleteTodoListAC = (listId: string) => {
    return {
        type: DELETE_TODOLIST,
        payload: {listId}
    } as const

}

