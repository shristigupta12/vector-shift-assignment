import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col text-sm">
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-black"
          />
        </label>
        <label className="flex flex-col text-sm">
          Type:
          <select value={inputType} onChange={handleTypeChange} className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
} 