export const REMOVE_TASK = "REMOVE_TASK"
export const ADD_TASK = "ADD_TASK"
export const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE"
export const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"
export const ADD_EMPTY_TASK_ARRAY = "ADD_EMPTY_TASK_ARRAY"

export type UnionTasksACType =
    RemoveTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addEmptyTaskArrayACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, listId: string) => {
    return {
        type: REMOVE_TASK,     //as ActionType
        payload: {  taskId, listId }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, listId: string) => {
    return {
        type: ADD_TASK,
        payload: { title, listId }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (id: string, isDone: boolean, listId: string) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {
            id,
            isDone,
            listId,
        }
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, listId: string) => {
    return {
        type: CHANGE_TASK_TITLE,
        payload: {
            id,
            newTitle,
            listId
        },
    } as const
}

type addEmptyTaskArrayACType = ReturnType<typeof addEmptyTaskArrayAC>
export const addEmptyTaskArrayAC = (listId: string) => {
    return {
        type: ADD_EMPTY_TASK_ARRAY,
        payload: { listId },
    } as const
}


