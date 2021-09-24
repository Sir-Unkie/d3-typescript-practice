import * as d3 from 'd3';
import { WeatherData } from '../Hooks/useFetchData';
import { ChartDimensions } from './interfaces';

export const createScales = (
  data: WeatherData,
  chartDimensions: ChartDimensions,
  domainStart: Date,
  domainEnd: Date
) => {
  const xScale = d3
    .scaleTime()
    .domain([domainStart, domainEnd])
    .range([0, chartDimensions.width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.temperature)])
    .range([0, chartDimensions.height / 2]);
  return { xScale, yScale };
};
