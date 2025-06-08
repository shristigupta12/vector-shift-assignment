// toolbar.js

import { DraggableNode } from './DraggableNode';
import { NODE_TYPES } from '../constants/node-types';

export const PipelineToolbar = () => {
    return (
        <div className="p-4 bg-primary-100 border-b border-t ">
            <div className="flex flex-wrap gap-4">
                {Object.values(NODE_TYPES).map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.title} />
                ))}
            </div>
        </div>
    );
};

