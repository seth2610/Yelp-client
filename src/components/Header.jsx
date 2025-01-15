import React from 'react'

const Header = () => {
  return (
    <div>
       <h1
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 300,
          fontSize: 'calc(2rem + 3vw)',
          textAlign: 'center',
        }}
      >
        Restaurant Finder
      </h1>
    </div>
  )
}

export default Header