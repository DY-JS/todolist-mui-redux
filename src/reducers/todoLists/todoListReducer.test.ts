import {TodolistType} from "../../App";
import {v4} from "uuid";
import {todoListReducer} from "./todoListReducer";
import {CREATE_TODOLIST, DELETE_TODOLIST} from "./todoListsActionCreators";

test('correct todolist should be removed', () => {
    let todolistId1 = v4()
    let todolistId2 = v4()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListReducer(startState, {
        type: 'DELETE_TODOLIST', payload: {
            listId: todolistId1
        }
    })

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v4()
    let todolistId2 = v4()

    let newTodolistTitle = 'New Todolist'
    let newTodolistId = v4()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListReducer(startState, {
        type: 'CREATE_TODOLIST',
        payload: {
            listId: newTodolistId,
            title: newTodolistTitle,

        }})

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})