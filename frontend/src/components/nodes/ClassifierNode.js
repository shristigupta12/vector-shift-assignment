import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ClassifierNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} data={data} handles={handles}>
      <span>Classifies input data.</span>
    </BaseNode>
  );
}; 