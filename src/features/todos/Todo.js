import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { todosSelector, fetchTodos, reset } from './todoSlice'

const Todo = () => {
    const { todos, isLoading, isError, errorMessage } = useSelector(todosSelector)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(reset())
        dispatch(fetchTodos())
    }
  return (
    <div>
        <h3>TODOS</h3>
        <button
        onClick={handleClick}
        >
            {isLoading ? 'Loading...' : 'Load Todos'}
        </button>
        <button onClick={() => dispatch(reset())}>Reset</button>
        {isError && <div>{errorMessage}</div>}
        <ul>
            {todos.map((todo, idx) => (
                <li key={idx}>{todo.todo}</li>
            ))}
        </ul>
    </div>
  )
}

export default Todo