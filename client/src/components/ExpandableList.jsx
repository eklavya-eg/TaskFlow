import React, { useState } from 'react';

const ExpandableList = ({ title = "Default Title", items: initialItems }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const [items, setItems] = useState(initialItems || [
        { id: '1', text: 'Complete project proposal', isChecked: false },
        { id: '2', text: 'Review team meeting notes', isChecked: true },
        { id: '3', text: 'Prepare presentation slides', isChecked: false },
        { id: '4', text: 'Send follow-up emails', isChecked: true },
        { id: '5', text: 'Update client documentation', isChecked: false },
        { id: '6', text: 'Schedule next sprint planning', isChecked: false },
        { id: '7', text: 'Research new technologies', isChecked: false },
        { id: '8', text: 'Refactor legacy code', isChecked: true },
    ]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleItemCheck = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, isChecked: !item.isChecked } : item
        ));
    };

    return (
        <div className="relative w-full max-w-sm mx-auto">
            <button
                className="w-36 px-2 py-1 text-sm font-medium text-left bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center rounded-lg"
                onClick={toggleExpand}
                aria-expanded={isExpanded}
                aria-controls="expandable-list"
                style={{ borderRadius: '15px' }}
            >
                <span>{title}</span>
                <span className="text-xs">{isExpanded ? '▲' : '▼'}</span>
            </button>
            {isExpanded && (
                <ul
                    id="expandable-list"
                    className="absolute left-0 top-full z-10 bg-white divide-y divide-gray-200 shadow-lg w-80 rounded-lg p-4"
                    style={{ borderRadius: '12px' }}
                >
                    {items.map(item => (
                        <li key={item.id} className="px-3 py-2 flex items-center">
                            <input
                                type="checkbox"
                                id={`item-${item.id}`}
                                checked={item.isChecked}
                                onChange={() => toggleItemCheck(item.id)}
                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`item-${item.id}`} className="text-sm text-gray-700">{item.text}</label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExpandableList;
