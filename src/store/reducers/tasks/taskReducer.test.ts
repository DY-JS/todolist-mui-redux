import {v4} from "uuid";

import {TasksStateType} from "../../../App";
import {
    ADD_EMPTY_TASK_ARRAY,
    ADD_TASK,
    CHANGE_TASK_STATUS,
    CHANGE_TASK_TITLE,
    REMOVE_TASK,
    UnionTasksACType,
} from "./tasksActionCreators";
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
            {id: v4(), title: "JS", isDone: true},
            { id: v4(), title: "React", isDone: false }
        ],
        [todolistId2]: [
            {id: v4(), title: "Milk", isDone: true},
            {id: v4(), title: "React Book", isDone: true},
            { id: v4(), title: "tea", isDone: false }
        ]
    }

    let newTaskTitle = 'New Title'

    const endState = taskReducer(startState, {
        type: ADD_TASK,
        payload: {
            listId: todolistId1,
            title: newTaskTitle,

        }})

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId1][0].title).toBe(newTaskTitle)
    expect(endState[todolistId2].length).toBe(3);
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][0].title).toBe("Milk");
    expect(endState[todolistId2][0].isDone).toBe(true);
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
    expect(endState[todolistId2][0].id).toBeDefined();
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
    expect(endState[todolistId2][0].id).toBeDefined();
    expect(endState[todolistId2][1].isDone).toBe(true)
})

test('correctly add empty array of tasks  to todolist', () => {
    let todolistId1 = v4()
    let todolistId2 = v4()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v4(), title: "HTML&CSS", isDone: true},
            {id: v4(), title: "JS", isDone: true}
        ]
    }

    const action: UnionTasksACType = {
        type: ADD_EMPTY_TASK_ARRAY,
        payload: {
            listId: todolistId2,
        }
    }

    const endState = taskReducer(startState, action)
    expect(endState[todolistId2]).toStrictEqual([])
    expect(Object.keys(endState).length).toBe(2)
})



