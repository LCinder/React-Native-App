import React, { createContext, useState, ReactNode } from "react";
import { Target } from "@/types/types";

type SelectedItemContextType = {
    selectedItemName: Target | null;
    setSelectedItemName: (name: Target | null) => void;
};

export const SelectedItemContext = createContext<SelectedItemContextType>({
    selectedItemName: null,
    setSelectedItemName: () => {},
});

export const SelectedItemProvider = ({ children }: { children: ReactNode }) => {
    const [selectedItemName, setSelectedItemName] = useState<Target | null>(null);

    return (
        <SelectedItemContext.Provider value={{ selectedItemName, setSelectedItemName }}>
            {children}
        </SelectedItemContext.Provider>
    );
};
