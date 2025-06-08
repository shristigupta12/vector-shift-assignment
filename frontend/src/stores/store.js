import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => {
    const past = [];
    const future = [];

    const takeSnapshot = () => {
        past.push({
            nodes: get().nodes,
            edges: get().edges
        });
        future.length = 0;

        if (past.length > 50) {
            past.shift();
        }
    };

    return {
        nodes: [],
        edges: [],
        nodeIDs: {},

        getNodeID: (type) => {
            const newIDs = { ...get().nodeIDs
            };
            if (newIDs[type] === undefined) {
                newIDs[type] = 0;
            }
            newIDs[type] += 1;
            set({
                nodeIDs: newIDs
            });
            return `${type}-${newIDs[type]}`;
        },

        addNode: (node) => {
            takeSnapshot();
            set({
                nodes: [...get().nodes, node]
            });
        },

        onNodesChange: (changes) => {
          
            const shouldTakeSnapshot = changes.some(
                (change) => change.type === 'position' || change.type === 'remove'
            );
            if (shouldTakeSnapshot) {
                takeSnapshot();
            }
            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },

        onEdgesChange: (changes) => {
          
            if (changes.some((change) => change.type === 'remove')) {
                takeSnapshot();
            }
            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },

        onConnect: (connection) => {
            takeSnapshot();
            set({
                edges: addEdge({
                    ...connection,
                    type: 'smoothstep',
                    animated: true,
                    markerEnd: {
                        type: MarkerType.Arrow,
                        height: '20px',
                        width: '20px'
                    }
                }, get().edges),
            });
        },

        deleteElements: (elementsToDelete) => {
            takeSnapshot();
            set((state) => {
                const nodes = state.nodes.filter((node) => 
                    !elementsToDelete.some(el => el.id === node.id && el.type === 'node')
                );
                const edges = state.edges.filter((edge) => 
                    !elementsToDelete.some(el => el.id === edge.id && el.type === 'edge') &&
                    !elementsToDelete.some(el => el.type === 'node' && (el.id === edge.source || el.id === edge.target))
                );
                return { nodes, edges };
            });
        },

       
        duplicateNode: (nodeId) => {
            const nodes = get().nodes;
            const nodeToDuplicate = nodes.find((node) => node.id === nodeId);

            if (nodeToDuplicate) {
                takeSnapshot();
                const newNode = {
                    ...nodeToDuplicate,
                    id: get().getNodeID(nodeToDuplicate.type), 
                    position: {
                        x: nodeToDuplicate.position.x + 20,
                        y: nodeToDuplicate.position.y + 20,
                    },
                    selected: false, 
                };
                set({
                    nodes: [...nodes, newNode]
                });
            }
        },

        updateNodeField: (nodeId, fieldName, fieldValue) => {
            takeSnapshot();
            set({
                nodes: get().nodes.map((node) => {
                    if (node.id === nodeId) {
                        return { ...node, data: { ...node.data,
                                [fieldName]: fieldValue
                            }
                        };
                    }
                    return node;
                }),
            });
        },

        undo: () => {
            const lastState = past.pop();
            if (lastState) {
                future.push({
                    nodes: get().nodes,
                    edges: get().edges
                });
                set(lastState);
            }
        },

        redo: () => {
            const nextState = future.pop();
            if (nextState) {
                past.push({
                    nodes: get().nodes,
                    edges: get().edges
                });
                set(nextState);
            }
        },

        canUndo: () => past.length > 0,
        canRedo: () => future.length > 0,

        theme: 'light',
        toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    };
});