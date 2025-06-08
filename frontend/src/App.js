import { PipelineToolbar } from './components/PipelineToolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/SubmitButton';

function App() {
  return (
    <div className='bg-neutral-50 p-[0.75rem]'>
      <div className="flex flex-col bg-white border rounded-md h-[calc(100vh-1.5rem)]">
        <h1 className="text-neutral-800 py-2 px-4 font-semibold">VectorShift</h1>
        <PipelineToolbar />
        <div className="h-full">
        <PipelineUI />
        </div>
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
