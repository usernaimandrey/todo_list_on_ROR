import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { addTask } from '../../slices/toDoReducer.js'
import { createTodo } from '../../slices/toDoReducer.js';

const Form = () => {
    const dispatch = useDispatch();
    const [text, upDateText] = useState('');
    const ref = useRef(null);
    useEffect(() => {
        ref.current.focus();
    })
    const handlerChange = (e) => {
        const { value } = e.target;
        upDateText(value);
    };
    const handlerSubmit = (e) => {
        e.preventDefault();
        const task = {
            text,
            state: 'active',
        };
        dispatch(createTodo(task));
        upDateText('');
    };
    return (
        <>
            <form onSubmit={handlerSubmit}>
                <div className="d-flex align-items-end">
                    <div className="form-group">
                        <label htmlFor="input">Добавьте дело</label>
                        <input type="text"
                        ref={ref}
                        className="form-control"
                        id="input"
                        required={true}
                        placeholder="Enter Todo"
                        onChange={handlerChange}
                        value={text} 
                    />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Добавить</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Form;