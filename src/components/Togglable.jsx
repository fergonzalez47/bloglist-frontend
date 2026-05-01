import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }))

  return (
    <div className='togglable'>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible} className='togglable-content'>
        {props.children}

        <div className='togglable-actions'>
          <button onClick={toggleVisibility} className='btn-secondary'>
            cancel
          </button>
        </div>
      </div>
    </div>
  )
})

export default Togglable
