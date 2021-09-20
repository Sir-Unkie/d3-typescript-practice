import { CanvasDimensions } from './interfaces';
import { ScaleLinear, ScaleBand } from 'd3';

const createYmainAxis = (
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D
) => {
  ctx.moveTo(
    canvasDimensions.marginLeft,
    canvasDimensions.height - canvasDimensions.marginBot
  );
  ctx.lineTo(canvasDimensions.marginLeft, canvasDimensions.marginBot);
  ctx.strokeStyle = 'black';
  ctx.stroke();
};
const createXAxisTicks = (
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D,
  xScale: ScaleBand<string>,
  fontSize: number
) => {
  xScale.domain().forEach((date, index) => {
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'black';

    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(
      `${date}`,
      -canvasDimensions.height / 2 - canvasDimensions.marginBot,
      xScale(date)! +
        canvasDimensions.marginLeft +
        xScale.bandwidth() / 2 +
        fontSize / 4
    );
    ctx.restore();
  });
};

const createHorizontalLinesWithYaxisTicks = (
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D,
  yScale: ScaleLinear<number, number, never>,
  xScale: ScaleBand<string>,
  fontSize: number
) => {
  //vertical ticks and horizontal additional axis
  yScale.ticks(5).forEach((tick, i) => {
    ctx.fillStyle = 'black';
    ctx.textAlign = 'right';
    ctx.font = `${fontSize}px Arial`;
    if (i === 0) {
      // main horizontal axis
      ctx.fillText(
        `${tick}`,
        canvasDimensions.marginLeft - 15,
        canvasDimensions.height / 2
      );
      // main horizontal axis
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.moveTo(canvasDimensions.marginLeft, canvasDimensions.height / 2);
      ctx.lineTo(
        canvasDimensions.width - canvasDimensions.marginLeft,
        canvasDimensions.height / 2
      );
      ctx.stroke();
    } else {
      ctx.fillText(
        `${tick}`,
        canvasDimensions.marginLeft - 15,
        canvasDimensions.height / 2 - yScale(tick) + fontSize / 4
      );
      // additional axis on top
      ctx.beginPath();
      ctx.moveTo(
        canvasDimensions.marginLeft - 2,
        canvasDimensions.height / 2 - yScale(tick)
      );
      ctx.strokeStyle = 'blue';
      ctx.lineTo(
        canvasDimensions.width - canvasDimensions.marginLeft,
        canvasDimensions.height / 2 - yScale(tick)
      );
      ctx.stroke();
      // additional axis on bottom
      ctx.beginPath();
      ctx.moveTo(
        canvasDimensions.marginLeft - 2,
        canvasDimensions.height / 2 + yScale(tick)
      );
      ctx.strokeStyle = 'blue';
      ctx.lineTo(
        canvasDimensions.width - canvasDimensions.marginLeft,
        canvasDimensions.height / 2 + yScale(tick)
      );
      ctx.stroke();
      // bottom text ticks
      ctx.fillText(
        `-${tick}`,
        canvasDimensions.marginLeft - 15,
        canvasDimensions.height / 2 + yScale(tick) + fontSize / 4
      );
    }
  });
};

export const createAxis = (
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D,
  yScale: ScaleLinear<number, number, never>,
  xScale: ScaleBand<string>
) => {
  const fontSize = 17;
  createYmainAxis(canvasDimensions, ctx);

  createXAxisTicks(canvasDimensions, ctx, xScale, fontSize);

  createHorizontalLinesWithYaxisTicks(
    canvasDimensions,
    ctx,
    yScale,
    xScale,
    fontSize
  );
};
