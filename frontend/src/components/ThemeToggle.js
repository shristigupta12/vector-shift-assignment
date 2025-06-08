import { useStore } from '../stores/store';
import { shallow } from 'zustand/shallow';
import { Sun, Moon } from 'lucide-react';

const selector = (state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
});

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useStore(selector, shallow);

    return (
        <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full text-neutral-800 dark:text-dark-text hover:cursor-pointer"
        >
            {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}; 