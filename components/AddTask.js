import { useState } from "react"
const AddTask = ({ onAdd }) => {
  return (
    <form className='add-text'>
      <div className='form-control'>
        <label>Task</label>
        <input type="text" placeholder="write here..." />
      </div>
    </form>
  );
};
ex
