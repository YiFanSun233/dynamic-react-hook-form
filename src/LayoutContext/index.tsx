import { createContext, useContext } from "react";

export type ILayout = {
	column: number;
	gap: number;
	layout?: "horizontal" | "vertical";
	labelSize?: number | string;
	labelWidth?: number | string;
	wrapperWidth?: number | string;
};

const LayoutContext = createContext<
	| {
			layout: ILayout;
	  }
	| undefined
>(undefined);

export const LayoutProvider = ({
	layout,
	children,
}: {
	layout: ILayout;
	children: React.ReactNode;
}) => {
	return (
		<LayoutContext.Provider value={{ layout }}>
			{children}
		</LayoutContext.Provider>
	);
};

export default function useLayoutContext() {
	const context = useContext(LayoutContext);
	if (!context) {
		throw new Error("useLayoutContext必须在LayoutProvider中使用");
	}
	return context;
}
