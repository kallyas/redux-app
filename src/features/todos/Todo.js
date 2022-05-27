import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { todosSelector, fetchTodos, reset } from "./todoSlice";
import { authSelector, logoutUser } from "../auth/authSlice";

const Todo = () => {
  const { todos, isLoading, isError, errorMessage } =
    useSelector(todosSelector);
  const { isAuthenticated } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(reset());
    dispatch(fetchTodos());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h3>TODOS</h3>
      <button onClick={handleClick}>
        {isLoading ? "Loading..." : "Load Todos"}
      </button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(logoutUser())}>Logout</button>
      {isError && <div>{errorMessage}</div>}
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>
            <Link to={`/todos/${todo.id}`}>{todo.todo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
