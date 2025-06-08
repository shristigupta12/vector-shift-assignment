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

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <div className="flex flex-col gap-3">
        <label className="flex flex-col text-sm gap-2">
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange} 
            className="custom-input"
          />
        </label>
        <label className="flex flex-col text-sm gap-2">
          Type:
          <Select value={outputType} onValueChange={setOutputType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="File">Image</SelectItem>
            </SelectContent>
          </Select>
        </label>
      </div>
    </BaseNode>
  );
} 