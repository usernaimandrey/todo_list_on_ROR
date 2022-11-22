import React, { Fragment, useEffect } from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask } from '../../slices/toDoReducer.js';
import { selectors } from '../../slices/toDoReducer.js';
import { commentSelectors } from '../../slices/comentReducer.js';
import FormAddComent from '../../components/modal/FormAddComent.jsx';
import { fetchGetData, destroyTodo, updteTodo } from '../../slices/toDoReducer.js';
import { createComment } from '../../slices/comentReducer.js';

const Items = () => {
  useEffect(() => {
    dispatch(fetchGetData());
  }, []);
  const tasks = useSelector(selectors.selectAll);
  const comment = useSelector(commentSelectors.selectAll);
  const { activeFilter } = useSelector((state) => state.toDo);
  const newTasks = activeFilter === 'all' ? tasks : tasks.filter((t) => t.state === activeFilter); 
    const dispatch = useDispatch();

    const handlerRemoveTask = (id) => (e) => {
      e.preventDefault();
      dispatch(removeTask(id));
      dispatch(destroyTodo(id));
    };

    const handlerChangeState = (id) => (e) => {
      e.preventDefault();
      const { state } = tasks.find((t) => t.id === id);
      const newState = state === 'active' ? 'finished' : 'active';
      dispatch(updteTodo({ id, state: newState }));
    }
    const handlerSubmitPosts = (todo_id) => (setState, inputState) => (text, upDateText) => (e) => {
      e.preventDefault();
      const comment = {
        text,
        todo_id
      };
      dispatch(createComment(comment));
      setState(inputState);
      upDateText('');
    }
    if (tasks.length === 0) {
      return null;
    }
    return (
    <div className="mt-3">
      <ul className="list-group">
        {newTasks.map(({ id, text, state }) => (
          <Fragment key={id}>
          <li key={id} className="list-group-item d-flex justify-content-between">
            <span className="mr-auto">
              <button type="button" className="btn btn-link" onClick={handlerChangeState(id)}>
              {state === 'active' ? text : <s>{text}</s>}
              </button>
            </span>
            <button type="button" className="btn btn-outline-info" onClick={handlerRemoveTask(id)}>
            <span>&times;</span>
            </button>
          </li>
          <ul>
          {comment.filter((c) => c.todo_id === id).map(({ id, text }) => (<li key={id}>{text}</li>))}
          </ul>
          <FormAddComent handler={handlerSubmitPosts(id)}/>
          </Fragment>
        ))}
      </ul>
    </div>
    );
};

export default Items;