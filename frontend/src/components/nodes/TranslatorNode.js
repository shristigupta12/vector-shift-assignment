import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TranslatorNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <span>Translates text to another language.</span>
    </BaseNode>
  );
}; 