import * as d3 from 'd3';
import { WeatherData } from '../Hooks/useFetchData';

interface ChartDimensions {
  width: number;
  height: number;
}
export const createScales = (
  data: WeatherData,
  chartDimensions: ChartDimensions
) => {
  const timeArray = data.date.map(dateString => new Date(dateString));
  const xScale = d3
    .scaleTime()
    .domain([timeArray[1], timeArray[timeArray.length - 1]])
    .range([0, chartDimensions.width]);

  console.log(xScale.domain());
  console.log(timeArray);
  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.temperature)])
    .range([0, chartDimensions.height / 2]);
  return { xScale, yScale };
};
