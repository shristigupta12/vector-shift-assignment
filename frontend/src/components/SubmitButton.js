// submit.js

import { useStore } from '../stores/store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (response.ok) {
                const data = await response.json();
                const { num_nodes, num_edges, is_dag } = data;
                alert(`Pipeline stats:\n- Number of nodes: ${num_nodes}\n- Number of edges: ${num_edges}\n- Is it a DAG? ${is_dag ? 'Yes' : 'No'}`);
            } else {
                alert('Error: Could not parse pipeline.');
            }
        } catch (error) {
            console.error('Failed to submit pipeline:', error);
            alert('Error: Failed to connect to the backend.');
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <button
                type="button"
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
}
