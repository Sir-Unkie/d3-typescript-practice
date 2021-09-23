import { ScaleBand, ScaleLinear } from 'd3-scale';
import { WeatherData } from '../Hooks/useFetchData';
import { CanvasDimensions } from './interfaces';
import { ScaleTime } from 'd3';

export const drawData = (
  xScale: ScaleTime<number, number, never>,
  yScale: ScaleLinear<number, number, never>,
  data: WeatherData,
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D,
  domainEnd: Date
) => {
  for (let i = 0; i < data.date.length; i++) {
    ctx.fillStyle = '#f3b43e';
    const dateInPeriod =
      xScale(new Date(data.date[i]))! >= 0 &&
      xScale(new Date(data.date[i]))! < xScale(domainEnd);
    if (dateInPeriod) {
      ctx.fillRect(
        xScale(new Date(data.date[i]))! + canvasDimensions.marginLeft,
        canvasDimensions.height / 2,
        15,
        yScale(-data.temperature[i])
      );
    }
  }
};
