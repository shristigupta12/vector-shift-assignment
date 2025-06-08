"use client"
import { Toaster as Sonner } from "sonner"
import { useStore } from "../../stores/store"
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  theme: state.theme,
});

const Toaster = ({
  ...props
}) => {
  const { theme } = useStore(selector, shallow)

  return (
    <Sonner
      position="top-center"
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-primary-100 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-darkPrimary-400 dark:group-[.toaster]:text-dark-text dark:group-[.toaster]:border-darkPrimary-300 ",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} />
  );
}

export { Toaster }
