import { useEffect, useState } from "react";

export default function useFetch(url: string) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            try {
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return { data, isLoading, error };
}
