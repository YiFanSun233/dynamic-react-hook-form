import { createContext, useContext } from "react";

type ILayout = { column: number; gap: number; }

const LayoutContext = createContext<{
  layout: ILayout
} | undefined>(undefined)

export const LayoutProvider = ({ layout, children }: { layout: ILayout; children: React.ReactNode }) => {
  return (
    <LayoutContext.Provider value={{ layout }}>
      {children}
    </LayoutContext.Provider>
  )
}

export default function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayoutContext必须在LayoutProvider中使用");
  }
  return context;
}