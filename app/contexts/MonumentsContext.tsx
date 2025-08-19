import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo,
} from "react";
import { City, Monument } from "@/types/types";
import { SelectedItemContext } from "@/app/contexts/SelectedItemContext";
import { fetchMonumentsByCity } from "@/utils/Helper";

type MonumentsContextType = {
    monuments: Monument[];
    loading: boolean;
    error: string | null;
    currentCity: City | null;
    setCity: (city: City) => void;
    completeMonument: (id: number) => void;
    refreshMonument: () => void;
};

const MonumentsContext = createContext<MonumentsContextType>({
    monuments: [],
    loading: false,
    error: null,
    currentCity: null,
    setCity: () => {},
    completeMonument: () => {},
    refreshMonument: () => {},
});

export const useMonuments = () => useContext(MonumentsContext);

export const MonumentProvider = ({ children }: { children: ReactNode }) => {
    const [monuments, setMonuments] = useState<Monument[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentCity, setCurrentCity] = useState<City | null>(null);
    const { setSelectedItem } = useContext(SelectedItemContext);

    const loadMonuments = useCallback(
        (zoneId: number) => {
            setLoading(true);
            setError(null);
            setSelectedItem(null);
            try {
                const data = fetchMonumentsByCity(zoneId);
                setMonuments(data);
            } catch (err) {
                setError("Error loading monuments");
                console.error(err);
            } finally {
                setLoading(false);
            }
        },
        [setSelectedItem]
    );

    useEffect(() => {
        if (currentCity?.cityId) {
            loadMonuments(currentCity.cityId);
        }
    }, [currentCity, loadMonuments]);

    const apiMarkComplete = (id: number) => {
    };

    const completeMonument = (id: number) => {
        setMonuments((prev) =>
            prev.map((o) => (o.monumentId === id ? { ...o, completed: true } : o))
        );

        try {
            apiMarkComplete(id);
        } catch (err) {
            setMonuments((prev) =>
                prev.map((o) => (o.monumentId === id ? { ...o, completed: false } : o))
            );
            console.error(err);
        }
    };

    const refreshMonument = () => {
        if (currentCity?.cityId) loadMonuments(currentCity.cityId);
    };

    const value = useMemo(
        () => ({
            monuments,
            loading,
            error,
            currentCity,
            setCity: setCurrentCity,
            completeMonument,
            refreshMonument,
        }),
        [monuments, loading, error, currentCity]
    );

    return (
        <MonumentsContext.Provider value={value}>
            {children}
        </MonumentsContext.Provider>
    );
};
