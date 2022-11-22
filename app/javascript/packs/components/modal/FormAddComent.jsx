import React, { useState } from 'react';

const Form = (props) => {
  const { handler } = props;
  const [text, upDateText] = useState('');
  const handlerChange = (e) => {
    const { value } = e.target;
    upDateText(value);
  };
  return (
    <form onSubmit={handler(text, upDateText)}>
      <div className="d-flex align-items-end">
        <div className="form-group">
          <input type="text"
          className="form-control"
          id="input"
          required={true}
          placeholder="Enter Comments"
          value={text}
          onChange={handlerChange}
          />
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Добавить</button>
          </div>
        </div>
      </form>
  )
}

const FormAddComent = (props) => {
  const { handler } = props;
  const [inputShow, setState] = useState(false);
  const handlerInputShow = (e) => {
    e.preventDefault();
    setState(!inputShow);
  }
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={handlerInputShow}>
          Добавить коментарий
        </button>
        {inputShow && <Form handler={handler(setState, !inputShow)}/>}
      </div>
    );
};

export default FormAddComent;