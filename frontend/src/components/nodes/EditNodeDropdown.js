import React, { useState, useRef, useEffect } from 'react';
import { Ellipsis } from 'lucide-react';
import { useStore } from '../../stores/store';

export const EditNodeDropdown = ({ nodeId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { deleteElements, duplicateNode } = useStore(); 

    const handleDelete = () => {
        deleteElements([{ id: nodeId, type: 'node' }]);
        setIsOpen(false);
    };

    const handleDuplicate = () => {
        duplicateNode(nodeId);
        setIsOpen(false);
    };

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-1 rounded-full hover:bg-primary-300 transition-colors hover:dark:bg-darkPrimary-300"
                title="Node actions"
            >
                <Ellipsis size={16} />
            </button>
            {isOpen && (
                <div className="absolute -right-30 font-medium  bg-white border border-primary-300 border-rounded rounded-md shadow-md z-20 dark:bg-darkPrimary-300 dark:border-darkPrimary-400">
                    <button 
                        onClick={handleDuplicate} 
                        className="block w-full text-left px-4 py-2  text-sm text-gray-700 hover:bg-primary-100 rounded-t-md dark:text-dark-text dark:hover:bg-darkPrimary-400"
                    >
                        Duplicate
                    </button>
                    <button 
                        onClick={handleDelete} 
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-50 rounded-b-md dark:text-red-500 dark:hover:bg-darkPrimary-400"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};