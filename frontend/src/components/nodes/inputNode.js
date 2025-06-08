import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <div className="flex flex-col gap-3">
        <label className="flex flex-col text-sm gap-2">
          <p className='font-semibold'>Name:</p>
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            className="custom-input"
          />
        </label>
        <label className="flex flex-col text-sm gap-2">
        <p className='font-semibold'>Type:</p>
          <Select value={inputType} onValueChange={setInputType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="File">File</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </div>
    </BaseNode>
  );
} 