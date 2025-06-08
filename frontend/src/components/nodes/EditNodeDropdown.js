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
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                title="Node actions"
            >
                <Ellipsis size={16} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                    <button 
                        onClick={handleDuplicate} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Duplicate
                    </button>
                    <button 
                        onClick={handleDelete} 
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};