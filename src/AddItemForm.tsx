import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    const buttonStyles = {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '40px',
        minHeight: '40px',
        marginLeft: '20px'

    }

    return <div>
        {/*<input value={title}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       className={error ? "error" : ""}*/}
        {/*/>*/}
        <TextField
            error={!!error}
            id="outlined-basic"
                   label={error ? 'Title is required' : 'Type title'}
                   variant="outlined"
                   size="small"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
        <Button
            variant="contained"
            color='primary'
            onClick={addItem}
            style={buttonStyles}
        >+</Button>
        {/*<button onClick={addItem}>+</button>*/}

        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}
