import {FilterValuesType, TodolistType} from "../../../App";
import {v4} from "uuid";
import {todoListReducer} from "./todoListReducer";
import {
    CREATE_TODOLIST,
    DELETE_TODOLIST,
    CHANGE_TITLE,
    ChangeListTitleACType,
    SET_FILTER, SetFilterACType
} from "./todoListsActionCreators";

test('correct todolist should be removed', () => {
    let todolistId1 = v4()
    let todolistId2 = v4()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListReducer(startState, {
        type: DELETE_TODOLIST, payload: {
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
        type: CREATE_TODOLIST,
        payload: {
            listId: newTodolistId,
            title: newTodolistTitle,

        }})

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v4()
    let todolistId2 = v4()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const changeAction:ChangeListTitleACType = {
        type: CHANGE_TITLE,
        payload: {
        listId: todolistId2,
        title: newTodolistTitle
        }
    }

    const endState = todoListReducer(startState, changeAction)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v4()
    let todolistId2 = v4()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const action: SetFilterACType = {
        type: SET_FILTER,
        payload: {
            filter: newFilter,
            listId: todolistId2
        }
    }

    const endState = todoListReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})