// Module
import React, { useEffect, useState } from 'react';

// Styles
import CartModelsStyles from '../../styles/cartModels.styles';

// Interfaces
import { i_collapsing_dropdown_props } from '../../interfaces/interfaces';

const CollapsingDropdown: React.FC<i_collapsing_dropdown_props> = ({ title, children, isOpen, onToggle }) => {
    const cms = CartModelsStyles();

    return (
      <div>
        <div style={cms.specContainer} onClick={onToggle}> 
                <h3 style={cms.specHeader}>{title}</h3>
                {/* arrows icons */}
                {isOpen ? 
                <svg style={cms.specIcons} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
                :
                <svg style={cms.specIcons} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                }
        </div>
        <div style={{ ...cms.specContent, maxHeight: isOpen ? '500px' : '0', transition: 'max-height 0.6s ease-in-out, opacity 0.6s ease-in-out', opacity: isOpen ? '1' : '0' }}>
            <ul>
                {React.Children.map(children, (child, index) => {
                    return <li key={index}>{child}</li>
                })}
            </ul>
        </div>
      </div>
    );
}

export default CollapsingDropdown;
