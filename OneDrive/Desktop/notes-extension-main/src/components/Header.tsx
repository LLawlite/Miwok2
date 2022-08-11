import React from 'react'
import PropTypes from 'prop-types'


function Header({text,bgColor, textColor}) {
    const HeaderStyles = {
        backgroundColor: bgColor,
        color: textColor,
    }
    return (
        <div className= "top-navbar">
            <div>
                <h2>Notes</h2>
            </div>
                
        </div>
    )
}

Header.defaultProps = {
    text: 'Notes',
    bgColor: '#FFD700',
    textColor: "#0E1318"

}

export default Header