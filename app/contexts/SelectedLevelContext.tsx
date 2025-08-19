import React, { createContext, useState, ReactNode, useMemo } from "react";
import {Level} from "@/types/types";

type SelectedLevelContextType = {
    selectedLevel: Level | null;
    setSelectedLevel: (name: Level | null) => void;
};

export const SelectedLevelContext = createContext<SelectedLevelContextType>({
    selectedLevel: null,
    setSelectedLevel: () => {},
});

export const SelectedLevelProvider = ({ children }: { children: ReactNode }) => {
    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

    const value = useMemo(
        () => ({ selectedLevel, setSelectedLevel }),
        [selectedLevel]
    );

    return (
        <SelectedLevelContext.Provider value={value}>
            {children}
        </SelectedLevelContext.Provider>
    );
};
