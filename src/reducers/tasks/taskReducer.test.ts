import {v4} from "uuid";

import {TasksStateType} from "../../App";
import {ADD_TASK, CHANGE_TASK_STATUS, CHANGE_TASK_TITLE, REMOVE_TASK, UnionTasksACType,} from "./tasksActionCreators";
import {taskReducer} from "./taskReducer";

test('correct task should be removed', () => {
    let todolistId1 = v4()
    let todolistId2 = v4()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v4(), title: "HTML&CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v4(), title: "Milk", isDone: true},
            {id: v4(), title: "React Book", isDone: true}
        ]
    }

    const taskIdForRemove = startState[todolistId1][0].id
    const taskIdAfterRemoved = startState[todolistId1][1].id

    const action: UnionTasksACType = {
        type: REMOVE_TASK,
        payload: {
            taskId: taskIdForRemove,
            listId: todolistId1
        }
    }

    const endState = taskReducer(startState, action)

    expect(endState[todolistId1].length).toBe(1)
    expect(endState[todolistId1][0].id).toBe(taskIdAfterRemoved)
})

test('correct task should be added', () => {
    let todolistId1 = v4()
    let todolistId2 = v4()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v4(), title: "HTML&CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v4(), title: "Milk", isDone: true},
            {id: v4(), title: "React Book", isDone: true}
        ]
    }

    let newTaskTitle = 'New Title'

    const endState = taskReducer(startState, {
        type: ADD_TASK,
        payload: {
            listId: todolistId1,
            title: newTaskTitle,

        }})

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe(newTaskTitle)
})

test('correct task should change its title', () => {
    let todolistId1 = v4()
    let todolistId2 = v4()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v4(), title: "HTML&CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v4(), title: "Milk", isDone: true},
            {id: v4(), title: "React Book", isDone: true}
        ]
    }

    let newTaskTitle = 'New Title'
    let taskId = startState[todolistId1][1].id

    const changeAction: UnionTasksACType = {
        type: CHANGE_TASK_TITLE,
        payload: {
            id: taskId,
            newTitle: newTaskTitle,
            listId: todolistId1,
        }
    }

    const endState = taskReducer(startState, changeAction)
    expect(endState[todolistId1][0].title).toBe("HTML&CSS")
    expect(endState[todolistId1][1].title).toBe(newTaskTitle)
})

test('correct task should change its status', () => {
    let todolistId1 = v4()
    let todolistId2 = v4()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v4(), title: "HTML&CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v4(), title: "Milk", isDone: true},
            {id: v4(), title: "React Book", isDone: true}
        ]
    }

    let newTaskStatus = false
    let taskId = startState[todolistId1][1].id

    const changeAction: UnionTasksACType = {
        type: CHANGE_TASK_STATUS,
        payload: {
            id: taskId,
            isDone: newTaskStatus,
            listId: todolistId1,
        }
    }

    const endState = taskReducer(startState, changeAction)
    expect(endState[todolistId1][0].isDone).toBe(true)
    expect(endState[todolistId1][1].isDone).toBe(false)
})
//
// test('correct filter of todolist should be changed', () => {
//     let todolistId1 = v4()
//     let todolistId2 = v4()
//
//     let newFilter: FilterValuesType = 'completed'
//
//     const startState: Array<TodolistType> = [
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'}
//     ]
//
//     const action: SetFilterACType = {
//         type: SET_FILTER,
//         payload: {
//             filter: newFilter,
//             listId: todolistId2
//         }
//     }
//
//     const endState = todoListReducer(startState, action)
//
//     expect(endState[0].filter).toBe('all')
//     expect(endState[1].filter).toBe(newFilter)
// })
