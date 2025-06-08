// frontend/src/components/nodes/BaseNode.jsx
import { Handle } from 'reactflow';
import { useStore } from '../../stores/store';
import { NODE_TYPES } from '../../constants/node-types';
import { EditNodeDropdown } from './EditNodeDropdown';

export const BaseNode = ({ id, data, children, handles }) => {
  const { nodeType } = data;
  const { title, icon: Icon } = NODE_TYPES[nodeType] || {};
  const theme = useStore((state) => state.theme);

  const handleStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const lightModeHandleStyle = {
    ...handleStyle,
    backgroundColor: 'white',
    border: '1px solid #6b7280',
  };
  
  const darkModeHandleStyle = {
    ...handleStyle,
    backgroundColor: '#8A3FFC',
    border: '1px solid #420C89',
  };

  return (
    <div className="bg-white text-sm border border-primary-400 hover:shadow-primary-400 rounded-lg shadow-sm w-52 border-primary-400 dark:bg-darkPrimary-300 dark:border-darkPrimary-400 dark:hover:shadow-darkPrimary-400">
      <div className={`p-2 rounded-t-lg text-neutral-800 border-b bg-primary-100 text-center font-bold flex items-center justify-between gap-2 dark:bg-darkPrimary-400 dark:border-darkPrimary-400 dark:text-neutral-300`}> 
        <div className="flex items-center gap-2"> 
          {Icon && Icon}
          <span>{title}</span>
        </div>
        <EditNodeDropdown nodeId={id} /> 
      </div>
      <div className="p-2">
        {children}
      </div>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={theme === 'dark' ? darkModeHandleStyle : lightModeHandleStyle} 
        />
      ))}
    </div>
  );
};