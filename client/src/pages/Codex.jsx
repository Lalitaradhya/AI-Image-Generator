import React from 'react'
import '../codex.css'


const Codex = () => {
  return (
    <body>
    <div id='appss'>
        <div id='chat_container'></div>
        <div className='forms'>
            <textarea name="prompt" placeholder='Ask Codex...' cols="1" rows="1"></textarea>
            <button type='submit'></button>
        </div>
    </div>
    <script type="module" src='../script.js'></script>
    </body>
  )
}

export default Codex