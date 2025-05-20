import { useReducer, useRef, useCallback, useEffect } from 'react'

const initialState = { count: 0, history: [] }

function reducer (state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
        history: [...state.history, `+1 (Nuevo valor: ${state.count + 1})`]
      }
    case 'decrement':
      return {
        count: state.count - 1,
        history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`]
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export default function CounterGame () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const incrementBtnRef = useRef(null)

  // Fijar el foco al cargar
  useEffect(() => {
    incrementBtnRef.current?.focus()
  }, [])

  // Funciones optimizadas
  const handleIncrement = useCallback(() => {
    dispatch({ type: 'increment' })
  }, [])

  const handleDecrement = useCallback(() => {
    dispatch({ type: 'decrement' })
  }, [])

  const handleReset = useCallback(() => {
    dispatch({ type: 'reset' })
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Contador: {state.count}</h2>
      <div>
        <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <h3>Historial de cambios:</h3>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  )
}
