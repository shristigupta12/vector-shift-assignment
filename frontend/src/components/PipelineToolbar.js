// toolbar.js

import { DraggableNode } from './DraggableNode';
import { NODE_TYPES } from '../constants/node-types';
import { motion } from 'framer-motion';

export const PipelineToolbar = () => {
    return (
        <div className="p-4 bg-primary-100 border-b border-t dark:bg-black dark:border-darkPrimary-400">
            <div className="flex flex-wrap gap-4">
                {Object.values(NODE_TYPES).map((node, index) => (
                    <motion.div
                        key={node.type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.15 }}
                    >
                        <DraggableNode type={node.type} label={node.title} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

