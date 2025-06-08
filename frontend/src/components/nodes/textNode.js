import { useState, useEffect, useMemo, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import TextareaAutosize from 'react-textarea-autosize';

const variableRegex = /{{\s*(\w+)\s*}}/g;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [width, setWidth] = useState(100);
  const spanRef = useRef(null);

  useEffect(() => {
    const newVariables = new Set();
    let match;
    while ((match = variableRegex.exec(currText)) !== null) {
      newVariables.add(match[1]);
    }
    setVariables(Array.from(newVariables));
  }, [currText]);

  useEffect(() => {
    if (spanRef.current) {
      setWidth(spanRef.current.offsetWidth);
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handles = useMemo(() => {
    const allHandles = [{ type: 'source', position: Position.Right, id: `${id}-output` }];
    variables.forEach((variable, index) => {
      allHandles.push({
        type: 'target',
        position: Position.Left,
        id: `${id}-${variable}`,
        style: { top: `${(index + 1) * 20}px` },
      });
    });
    return allHandles;
  }, [id, variables]);

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col text-sm">
          Text:
          <TextareaAutosize 
            minRows={1}
            value={currText} 
            onChange={handleTextChange} 
            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            style={{ width: `${width}px` }}
          />
        </label>
        <div 
          ref={spanRef} 
          className="text-sm"
          style={{ 
            position: 'absolute', 
            visibility: 'hidden', 
            whiteSpace: 'pre',
            padding: '6px 8px',
            border: '1px solid transparent' 
          }}
        >
          {currText.split('\n').reduce((longest, current) => current.length > longest.length ? current : longest, '')}
        </div>
      </div>
    </BaseNode>
  );
} 