import * as d3 from 'd3';
import { WeatherData } from '../Hooks/useFetchData';

interface ChartDimensions { width: number, height: number };
export const createScales = (data: WeatherData, chartDimensions:ChartDimensions) => {
  const xScale = d3
    .scaleBand()
    .domain(data.date)
    .range([0, chartDimensions.width])
    .paddingInner(0.3);
  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.temperature)])
    .range([0, chartDimensions.height / 2]);
  return { xScale, yScale };
};
