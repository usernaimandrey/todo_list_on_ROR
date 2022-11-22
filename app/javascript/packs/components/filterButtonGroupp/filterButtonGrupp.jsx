import React from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { filtered } from '../../slices/toDoReducer.js';

const filters = [['all', 'Все'], ['active', 'Активные'], ['finished', 'Завершенные']];
const FilterButtonGrupp = () => {
    const dispatch = useDispatch();
    const handlerFiltered = (filter) => (e) => {
        e.preventDefault();
        dispatch(filtered({ filter }));
    }
    return (
        <div className="btn-group filters" role="group" aria-label="Basic example">
            {filters.map(([filter, text]) => <button key={_.uniqueId()} type="button" className="btn btn-primary" onClick={handlerFiltered(filter)}>{text}</button>)}
            </div>
    );
};

export default FilterButtonGrupp;