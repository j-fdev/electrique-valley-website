// Module
import React from 'react';

// Interfaces
import { i_collapsing_dropdown_props } from '../../interfaces/interfaces';

const CollapsingDropdown: React.FC<i_collapsing_dropdown_props> = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className={`ev-acc${isOpen ? ' is-open' : ''}`}>
            <button className="ev-acc__head" onClick={onToggle} aria-expanded={isOpen}>
                <h3>{title}</h3>
                <span className="ev-acc__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg>
                </span>
            </button>
            <div className="ev-acc__body">
                <div className="ev-acc__inner">
                    <ul>
                        {React.Children.map(children, (child, index) => <li key={index}>{child}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CollapsingDropdown;
