import { useEffect, useState } from 'react';

export interface WeatherData {
  temperature: number[];
  date: string[];
}

export const useWeatherData = (URL: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  useEffect(() => {
    const fetchData = async (URL: string) => {
      try {
        const response = await fetch(URL);
        const respdata = await response.json();
        setData(respdata);
      } catch (error) {
        alert(error);
      }
    };
    fetchData(URL);
    console.log();
  }, [URL]);
  return { data: data, setData: setData };
};
