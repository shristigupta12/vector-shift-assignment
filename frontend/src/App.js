import { PipelineToolbar } from './components/PipelineToolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/SubmitButton';
import { useStore } from './stores/store';
import { shallow } from 'zustand/shallow';
import { ThemeToggle } from './components/ThemeToggle';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const selector = (state) => ({
  theme: state.theme,
});

function App() {
  const { theme } = useStore(selector, shallow);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className='bg-neutral-50 dark:bg-dark-background p-[0.75rem]'>
      <div className="flex flex-col bg-white  border dark:border-dark-border rounded-md h-[calc(100vh-1.5rem)] dark:border-darkPrimary-400 dark:bg-black">
        <div className="flex justify-between items-center py-2 px-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-neutral-800 dark:text-dark-text font-semibold hover:text-primary-600 dark:hover:text-primary-500 transition-colors duration-200">VectorShift</motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            <ThemeToggle />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
          <PipelineToolbar />
        </motion.div>
        <div className="h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-full"
          >
            <PipelineUI />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}>
          <SubmitButton />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
