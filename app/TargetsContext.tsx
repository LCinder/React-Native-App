import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {Target} from "@/types/types";
import {fetchTempDataTargetsByZone} from "@/utils/Helper";
import {SelectedItemContext} from "@/app/SelectedItemProvider";

type TargetsContextType = {
    targets: Target[];
    loading: boolean;
    error: string | null;
    currentZone: string;
    setZone: (zone: string) => void;
};

const TargetsContext = createContext<TargetsContextType>({
    targets: [],
    loading: false,
    error: null,
    currentZone: "",
    setZone: () => {
    },
});

export const useTargets = () => useContext(TargetsContext);
export const TargetsProvider = ({children}: { children: ReactNode }) => {
    const [targets, setTargets] = useState<Target[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentZone, setCurrentZone] = useState<string>("");
    const { setSelectedItem } = useContext(SelectedItemContext);

    const loadTargets = useCallback((zone: string) => {
        setLoading(true);
        setError(null);
        setSelectedItem(null);
        try {
            const data = fetchTempDataTargetsByZone(zone);
            setTargets(data);
        } catch (err) {
            setError("Error loading Targets");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [setSelectedItem]);

    useEffect(() => {
        if (currentZone) {
            loadTargets(currentZone);
        }
    }, [currentZone, loadTargets]);

    function apiMarkComplete(id: number) {

    }

    const completeTarget = (id: number) => {
        setTargets(prev =>
            prev.map(o => (o.id === id ? {...o, completed: true} : o))
        );

        try {
            apiMarkComplete(id);
        } catch (err) {
            setTargets(prev =>
                prev.map(o => (o.id === id ? {...o, completed: false} : o))
            );
            console.error(err);
        }
    };

    const refreshTargets = () => {
        if (currentZone) loadTargets(currentZone);
    };

    const value = React.useMemo(
        () => ({
            targets,
            loading,
            error,
            currentZone,
            setZone: setCurrentZone,
            completeTarget,
            refreshTargets,
        }),
        [targets, loading, error, currentZone, completeTarget, refreshTargets]
    );

    return (
        <TargetsContext.Provider value={value}>
            {children}
        </TargetsContext.Provider>
    );
};
