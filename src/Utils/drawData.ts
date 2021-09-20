import { ScaleBand, ScaleLinear } from 'd3-scale';
import { WeatherData } from '../Hooks/useFetchData';
import { CanvasDimensions } from './interfaces';

export const drawData = (
  xScale: ScaleBand<string>,
  yScale: ScaleLinear<number, number, never>,
  data: WeatherData,
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D
) => {
  for (let i = 0; i < data.date.length; i++) {
    ctx.fillStyle = '#f3b43e';
    ctx.fillRect(
      xScale(data.date[i])! + canvasDimensions.marginLeft,
      canvasDimensions.height / 2,
      xScale.bandwidth(),
      yScale(-data.temperature[i])
    );
  }
};
