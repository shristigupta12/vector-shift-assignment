import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from '../stores/store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TranslatorNode } from './nodes/TranslatorNode';
import { ClassifierNode } from './nodes/ClassifierNode';
import { SummarizerNode } from './nodes/SummarizerNode';
import { RegexNode } from './nodes/RegexNode';
import { SentimentNode } from './nodes/SentimentNode';
import { Undo, Redo } from 'lucide-react';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  translator: TranslatorNode,
  classifier: ClassifierNode,
  summarizer: SummarizerNode,
  regex: RegexNode,
  sentiment: SentimentNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  undo: state.undo,
  redo: state.redo,
  canUndo: state.canUndo,
  canRedo: state.canRedo,
  theme: state.theme,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      undo,
      redo,
      canUndo,
      canRedo,
      theme,
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode] 
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div className="absolute lg:top-[22vh] sm:top-[27vh] top-[43vh] sm:right-[50vw] right-[42vw] z-10 bg-white p-2 rounded-md shadow-md flex gap-2 border border-neutral-300 dark:bg-darkPrimary-50 dark:border-darkPrimary-400">
            <button 
                onClick={undo} 
                disabled={!canUndo()} 
                className='text-neutral-500 hover:text-primary-600 disabled:text-neutral-400 disabled:cursor-not-allowed hover:cursor-pointer dark:text-neutral-400 dark:hover:text-primary-500'
            >
                <Undo size={16} />
            </button>
            <button 
                onClick={redo} 
                disabled={!canRedo()} 
                className='text-neutral-500 hover:text-primary-600 disabled:text-neutral-400 disabled:cursor-not-allowed hover:cursor-pointer dark:text-neutral-400 dark:hover:text-primary-500'
            >
                <Redo size={16} />
            </button>
        </div>

        <div ref={reactFlowWrapper} style={{width: '100wv', height: '100%', flexGrow: 1}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                className='dark:bg-dark-background'
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap
                    style={{
                        backgroundColor: theme === 'dark' ? '#04020B' : '#fff',
                        border: theme === 'dark' ? '1px solid #420C89' : '1px solid #e2e8f0',
                    }}
                    nodeColor={theme === 'dark' ? '#4F45E4' :  '#f8f8f8'}
                    maskColor={theme === 'dark' ? 'rgba(4, 2, 11, 0.6)' : 'rgba(240, 240, 240, 0.6)'}
                 />
            </ReactFlow>
        </div>
        </>
    )
}