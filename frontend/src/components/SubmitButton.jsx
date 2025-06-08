// submit.js

import { useStore } from '../stores/store';
import { shallow } from 'zustand/shallow';
import { toast } from "sonner"

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
                toast("Pipeline submitted successfully!", {
                    description: (
                        <div className="space-y-2 ">
                            <p className="font-semibold">Statistics:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li><span className="font-medium">Number of nodes:</span> {data.num_nodes}</li>
                                <li><span className="font-medium">Number of edges:</span> {data.num_edges}</li>
                                <li><span className="font-medium">Is it a DAG?</span> {data.is_dag ? 'Yes' : 'No'}</li>
                            </ul>
                        </div>
                    ),
                });
            } else {
                const errorData = await response.json().catch(() => ({ detail: 'Could not parse pipeline.' }));
                toast.error(`Error: ${errorData.detail}`);
            }
        } catch (error) {
            console.error('Failed to submit pipeline:', error);
            toast.error('Error: Failed to connect to the backend.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <button
                type="button"
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 dark:bg-darkPrimary-400 dark:hover:bg-gradient-to-r dark:from-darkPrimary-300 dark:to-darkPrimary-400"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
}
