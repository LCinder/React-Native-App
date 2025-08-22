import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
    useMemo,
} from "react";
import { City, Monument, Route } from "@/types/types";
import { SelectedItemContext } from "@/app/contexts/SelectedItemContext";
import { fetchMonuments, fetchMonumentsByCity, fetchRoutes } from "@/utils/Helper";

type LocationContextType = {
    monuments: Monument[];
    loading: boolean;
    error: string | null;
    currentCity: City | null;
    currentRoute: Route | null;
    routes: Route[];
    monumentsByRouteMap: Record<string, Monument[]>;
    monumentsByCurrentRoute: Monument[] | null;
    setCity: (city: City | null) => void;
    setRoute: (route: Route | null) => void;
    completeMonument: (id: string) => void;
    refreshMonument: () => void;
    refreshRoutes: (cityId: string) => Promise<void>;
};

const LocationContext = createContext<LocationContextType>({
    monuments: [],
    loading: false,
    error: null,
    currentCity: null,
    currentRoute: null,
    routes: [],
    monumentsByRouteMap: {},
    monumentsByCurrentRoute: null,
    setCity: () => {},
    setRoute: () => {},
    completeMonument: () => {},
    refreshMonument: () => {},
    refreshRoutes: async () => {},
});

export const useLocation = () => useContext(LocationContext);

export const MonumentProvider = ({ children }: { children: ReactNode }) => {
    const [monuments, setMonuments] = useState<Monument[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [currentCity, setCurrentCity] = useState<City | null>(null);
    const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
    const [monumentsByRouteMap, setMonumentsByRouteMap] = useState<Record<string, Monument[]>>({});
    const [monumentsByCurrentRoute, setMonumentsByCurrentRoute] = useState<Monument[] | null>(null);

    const { setSelectedItem } = useContext(SelectedItemContext);

    const loadMonuments = useCallback(
        async (cityId: string) => {
            setLoading(true);
            setError(null);
            setSelectedItem(null);
            try {
                const data = await fetchMonumentsByCity(cityId);
                setMonuments(data);
            } catch (err) {
                setError("Error loading monuments");
                console.error(err);
                setMonuments([]);
            } finally {
                setLoading(false);
            }
        },
        [setSelectedItem]
    );

    const refreshRoutes = useCallback(async (cityId: string) => {
        try {
            const fetchedRoutes = await fetchRoutes(cityId);
            setRoutes(fetchedRoutes);

            const newMap: Record<string, Monument[]> = {};
            fetchedRoutes.forEach((r) => {
                const mons = fetchMonuments(r.routeId);
                newMap[r.routeId] = mons;
            });
            setMonumentsByRouteMap(newMap);
/*
            if (currentRoute?.routeId) {
                setMonumentsByCurrentRoute(newMap[currentRoute.routeId] || null);
            }*/

        } catch (error) {
            console.error("Error fetching routes:", error);
            setRoutes([]);
            setMonumentsByRouteMap({});
        }
    }, [currentRoute]);

    useEffect(() => {
        if (!currentRoute) {
            setMonumentsByCurrentRoute(null);
            return;
        }
        setMonumentsByCurrentRoute(monumentsByRouteMap[currentRoute.routeId] || null);
    }, [currentRoute, monumentsByRouteMap]);

    useEffect(() => {
        if (currentCity?.cityId) {
            loadMonuments(currentCity.cityId);
            refreshRoutes(currentCity.cityId);
        } else {
            setMonuments([]);
            setRoutes([]);
            setCurrentRoute(null);
            setMonumentsByRouteMap({});
            setMonumentsByCurrentRoute(null);
        }
    }, [currentCity, loadMonuments, refreshRoutes]);

    const apiMarkComplete = async (id: string) => {
    };

    const completeMonument = (id: string) => {
        setMonuments((prev) =>
            prev.map((o) => (o.monumentId === id ? { ...o, completed: true } : o))
        );

        apiMarkComplete(id).catch((err) => {
            setMonuments((prev) =>
                prev.map((o) => (o.monumentId === id ? { ...o, completed: false } : o))
            );
            console.error(err);
        });
    };

    const refreshMonument = () => {
        if (currentCity?.cityId) {
            loadMonuments(currentCity.cityId);
        }
    };

    const value = useMemo(
        () => ({
            monuments,
            loading,
            error,
            routes,
            currentCity,
            currentRoute,
            monumentsByRouteMap,
            monumentsByCurrentRoute,
            setCity: setCurrentCity,
            setRoute: setCurrentRoute,
            completeMonument,
            refreshMonument,
            refreshRoutes,
        }),
        [
            monuments,
            loading,
            error,
            routes,
            currentCity,
            currentRoute,
            monumentsByRouteMap,
            monumentsByCurrentRoute,
            refreshRoutes,
        ]
    );

    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
