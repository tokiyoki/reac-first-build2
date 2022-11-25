import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './Panel.scss';

Panel.propTypes = {
    title: PropTypes.string,
    level: PropTypes.number,
    isopen: PropTypes.bool
};

export default function Panel({ children, title, level=1, isOpen=false }) {
    // Inititalise
    // State
    const [isExpanded, setIsExpanded] = useState(isOpen);

    // Context
    // Methods
    // View
    return (
        <div className={"Panel PanelLevel" + level + (isExpanded ? " PanelOpen" : " PanelClosed")}>
            <header onClick={() => setIsExpanded(!isExpanded)}>
                <span className="title">{title}</span>
            </header>
            {
                isExpanded && <main>{children}</main>
            }
        </div>
    );
}

Static.propTypes = {
    level: PropTypes.number
};

function Static({ children, level }) {
    // Inititalise
    // State
    // Context
    // Methods
    // View
    return (
        <div className={"StaticPanel PanelLevel" + level}>
            {children}
        </div>
    );
}

function Container({ children, className="" }) {
    return (
        <div className={"PanelContainer " + className}>
            {children}
        </div>
    );
}

// Compose card object

Panel.Container = Container;
Panel.Static = Static;