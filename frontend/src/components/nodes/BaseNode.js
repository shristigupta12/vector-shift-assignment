// frontend/src/components/nodes/BaseNode.jsx
import { Handle } from 'reactflow';
import { NODE_TYPES } from '../../constants/node-types';
import { EditNodeDropdown } from './EditNodeDropdown'; 

export const BaseNode = ({ id, data, children, handles }) => {
  const { nodeType } = data;
  const { title, icon: Icon, color } = NODE_TYPES[nodeType] || {};

  return (
    <div className="bg-white border border-primary-400 hover:shadow-primary-400 rounded-lg shadow-sm w-52 border-primary-400">
      <div className={`p-2 rounded-t-lg text-neutral-800 border-b bg-primary-100 text-center font-bold flex items-center justify-between gap-2 `}> {/* Added justify-between for spacing */}
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
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: 'white',
            border: '1px solid #6b7280',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }} 
        />
      ))}
    </div>
  );
};