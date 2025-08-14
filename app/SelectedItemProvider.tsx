import React, { createContext, useState, ReactNode, useMemo } from "react";
import {Monument} from "@/types/types";

type SelectedItemContextType = {
    selectedItem: Monument | null;
    setSelectedItem: (name: Monument | null) => void;
};

export const SelectedItemContext = createContext<SelectedItemContextType>({
    selectedItem: null,
    setSelectedItem: () => {},
});

export const SelectedItemProvider = ({ children }: { children: ReactNode }) => {
    const [selectedItem, setSelectedItem] = useState<Monument | null>(null);

    const value = useMemo(
        () => ({ selectedItem, setSelectedItem }),
        [selectedItem]
    );

    return (
        <SelectedItemContext.Provider value={value}>
            {children}
        </SelectedItemContext.Provider>
    );
};
