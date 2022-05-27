import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTodo, todosSelector } from "./todoSlice";

const TodoId = () => {
  const dispatch = useDispatch();
  const { todo, isLoading, isError, errorMessage } = useSelector(todosSelector);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchTodo(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      {todo.userId ? (
        <>
          <h4>TODO</h4>
          <div>{todo.todo}</div>
          <h5>Completed: {todo.completed.toString()}</h5>
          <small>{todo.userId}</small>
        </>
      ): (
          <div>{todo.message}</div>
      )}
    </div>
  );
};

export default TodoId;
