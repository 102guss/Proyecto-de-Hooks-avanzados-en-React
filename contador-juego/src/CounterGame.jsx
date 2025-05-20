import { useReducer, useRef, useCallback, useEffect } from 'react'

// Cargar estado inicial desde localStorage
const loadInitialState = () => {
  const saved = localStorage.getItem('counterApp')
  return saved
    ? JSON.parse(saved)
    : { count: 0, history: [] }
}

function reducer (state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
        history: [...state.history, `+1 (Nuevo numero: ${state.count + 1})`]
      }
    case 'decrement':
      return {
        count: state.count - 1,
        history: [...state.history, `-1 (Nuevo numero: ${state.count - 1})`]
      }
    case 'reset':
      return { count: 0, history: [] }
    case 'undo': {
      if (state.history.length === 0) return state

      const last = state.history[state.history.length - 1]
      const newCount = last.includes('+1') ? state.count - 1 : state.count + 1

      return {
        count: newCount,
        history: state.history.slice(0, -1)
      }
    }
    default:
      return state
  }
}

export default function CounterGame () {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)
  const incrementBtnRef = useRef(null)

  // Enfocar el botón "+" al cargar
  useEffect(() => {
    incrementBtnRef.current?.focus()
  }, [])

  // Guardar estado en localStorage
  useEffect(() => {
    localStorage.setItem('counterApp', JSON.stringify(state))
  }, [state])

  // Funciones con useCallback
  const handleIncrement = useCallback(() => {
    dispatch({ type: 'increment' })
  }, [])

  const handleDecrement = useCallback(() => {
    dispatch({ type: 'decrement' })
  }, [])

  const handleReset = useCallback(() => {
    dispatch({ type: 'reset' })
  }, [])

  const handleUndo = useCallback(() => {
    dispatch({ type: 'undo' })
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h2>Contador: {state.count}</h2>
      <div style={{ marginBottom: '10px' }}>
        <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleUndo} disabled={state.history.length === 0}>Deshacer</button>
      </div>

      <h3>Historial:</h3>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  )
}
