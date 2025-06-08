import { NODE_TYPES } from '../constants/node-types';
import { motion } from 'framer-motion';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
    const { title, icon: Icon } = NODE_TYPES[type] || {};
  
    return (
      <motion.div
        whileHover="hover"
        className="bg-white border-[1px] w-[100px] rounded-lg p-4 cursor-grab shadow-sm hover:shadow-primary-400 flex flex-col items-center justify-center hover:border-primary-400 text-neutral-600 hover:text-primary-600 dark:bg-darkPrimary-300 dark:border-darkPrimary-400 dark:text-neutral-300 dark:hover:border-darkPrimary-500 dark:hover:text-darkPrimary-500 dark:hover:shadow-darkPrimary-500"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        <motion.div variants={{ hover: { rotate: 40 } }} transition={{ duration: 1 }}>
            {Icon && Icon}
        </motion.div>
        <span className="text-sm">{title}</span>
      </motion.div>
    );
  };
  