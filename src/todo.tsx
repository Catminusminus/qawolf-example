// based on https://redux.js.org/basics/example/

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import shortid from 'shortid'

enum VisibilityFilters {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
}

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface State {
  todos: Todo[]
  filter: VisibilityFilters
}

const initialState: State = {
  todos: [],
  filter: VisibilityFilters.SHOW_ALL,
}

const addTodo = (text: string) =>
  ({
    type: 'ADD_TODO',
    id: shortid.generate(),
    text,
  } as const)

const setVisibilityFilter = (filter: VisibilityFilters) =>
  ({
    type: 'SET_VISIBILITY_FILTER',
    filter,
  } as const)

const toggleTodo = (id: string) =>
  ({
    type: 'TOGGLE_TODO',
    id,
  } as const)

type Action =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof setVisibilityFilter>
  | ReturnType<typeof toggleTodo>

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            completed: false,
          },
        ],
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo,
        ),
      }
    case 'SET_VISIBILITY_FILTER':
      return {
        ...state,
        filter: action.filter,
      }
    default:
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _: never = action
      }

      return state
  }
}

const AppContext = React.createContext<{
  state: State
  dispatch: (action: Action) => void
}>({
  state: initialState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
})

const AddTodo = () => {
  const { dispatch } = React.useContext(AppContext)
  const [input, setInput] = React.useState('')

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        if (!input.trim()) {
          return
        }
        dispatch(addTodo(input))
        setInput('')
      }}
    >
      <input
        type="text"
        name="todo"
        value={input}
        onChange={e => {
          setInput(e.target.value || '')
        }}
      />
      <button type="submit">Add Todo</button>
    </form>
  )
}

const getVisibleTodos = (todos: Todo[], filter: VisibilityFilters) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const VisibleTodoList = () => {
  const { state, dispatch } = React.useContext(AppContext)

  return (
    <ul>
      {getVisibleTodos(state.todos, state.filter).map(todo => (
        <li
          key={todo.id}
          onClick={() => dispatch(toggleTodo(todo.id))}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  )
}

interface FilterLinkProps {
  filter: VisibilityFilters
}

const FilterLink: React.FC<FilterLinkProps> = ({ filter, children }) => {
  const { state, dispatch } = React.useContext(AppContext)

  return (
    <button
      onClick={() => dispatch(setVisibilityFilter(filter))}
      disabled={filter === state.filter}
      style={{
        marginLeft: '4px',
      }}
    >
      {children}
    </button>
  )
}

const Footer = () => (
  <>
    <span>Show: </span>
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </>
)

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </AppContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))