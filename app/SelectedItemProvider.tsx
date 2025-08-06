import React, { createContext, useState, ReactNode } from "react";
import { Target } from "@/types/types";

type SelectedItemContextType = {
    selectedItem: Target | null;
    setSelectedItem: (name: Target | null) => void;
};

export const SelectedItemContext = createContext<SelectedItemContextType>({
    selectedItem: null,
    setSelectedItem: () => {},
});

export const SelectedItemProvider = ({ children }: { children: ReactNode }) => {
    const [selectedItem, setSelectedItem] = useState<Target | null>(null);

    return (
        <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
            {children}
        </SelectedItemContext.Provider>
    );
};
