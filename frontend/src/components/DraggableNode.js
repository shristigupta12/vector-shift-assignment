import { NODE_TYPES } from '../constants/node-types';

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
    const { title, icon: Icon } = NODE_TYPES[type] || {};
  
    return (
      <div
        className="bg-white border-[1px] w-[100px] rounded-lg p-4 cursor-grab shadow-sm hover:shadow-primary-400 flex flex-col items-center justify-center hover:border-primary-400 text-neutral-600 hover:text-primary-600"
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        draggable
      >
        {Icon && Icon}
        <span className="text-sm">{title}</span>
      </div>
    );
  };
  