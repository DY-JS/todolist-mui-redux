import {FilterValuesType} from "../../App";

export const ALL = "ALL"
export const ACTIVE = "ACTIVE"
export const COMPLETED = "COMPLETED"
export const CHANGE_TITLE = "CHANGE_TITLE"
export const CREATE_TODOLIST = "CREATE_TODOLIST"
export const DELETE_TODOLIST = "DELETE_TODOLIST"

export type UnionTodoListACType = SetAllACType
    | SetActiveACType
    | SetCompletedACType
    | ChangeListTitleACType
    | CreateTodoListACType
    | DeleteTodoListACType


export type SetAllACType = ReturnType<typeof setAllAC>
export const setAllAC = (filter: FilterValuesType, listId: string ) => {
    return {
        type: ALL,
        payload: { filter, listId }
    } as const

}

export type SetActiveACType = ReturnType<typeof setActiveAC>
export const setActiveAC = (filter: FilterValuesType, listId: string ) => {
    return {
        type: ACTIVE,
        payload: { filter, listId }
    } as const

}

export type SetCompletedACType = ReturnType<typeof setCompletedAC>
export const setCompletedAC = (filter: FilterValuesType, listId: string ) => {
    return {
        type: COMPLETED,
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

