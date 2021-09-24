import { CanvasDimensions } from './interfaces';
import { ScaleLinear, ScaleTime } from 'd3';

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

const createXmainAxis = (
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D
) => {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.moveTo(canvasDimensions.marginLeft, canvasDimensions.height / 2);
  ctx.lineTo(
    canvasDimensions.width - canvasDimensions.marginLeft,
    canvasDimensions.height / 2
  );
  ctx.stroke();
};

const createYaxisTicks = (
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D,
  yScale: ScaleLinear<number, number, never>,
  fontSize: number
) => {
  //vertical ticks and horizontal additional axis
  yScale.ticks(5).forEach((tick, i) => {
    ctx.fillStyle = 'black';
    ctx.textAlign = 'right';
    ctx.font = `${fontSize}px Arial`;
    if (i === 0) {
      ctx.fillText(
        `${tick}`,
        canvasDimensions.marginLeft - 15,
        canvasDimensions.height / 2
      );
    } else {
      // top axis ticks
      ctx.fillText(
        `${tick}`,
        canvasDimensions.marginLeft - 15,
        canvasDimensions.height / 2 - yScale(tick) + fontSize / 4
      );
      // bottom axis ticks
      ctx.fillText(
        `-${tick}`,
        canvasDimensions.marginLeft - 15,
        canvasDimensions.height / 2 + yScale(tick) + fontSize / 4
      );
    }
  });
};

const createXAxisTicks = (
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D,
  xScale: ScaleTime<number, number, never>,
  fontSize: number,
  domainStart: Date = new Date('01.01.2021'),
  domainEnd: Date = new Date('12.01.2021')
) => {
  const ticksAmount = domainEnd.getMonth() - domainStart.getMonth() + 1;
  console.log(ticksAmount);
  xScale.ticks(ticksAmount).forEach(timeTick => {
    ctx.font = `${fontSize / 1}px Arial`;
    ctx.fillStyle = 'black';

    ctx.textAlign = 'left';
    ctx.fillText(
      `${timeTick.getMonth() + 1}`,
      xScale(timeTick) + canvasDimensions.marginLeft,
      canvasDimensions.height / 2 + fontSize
    );
  });
};

const createHorizontalLines = (
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D,
  yScale: ScaleLinear<number, number, never>
) => {
  yScale.ticks(5).forEach((tick, i) => {
    if (i === 0) {
    } else {
      // additional lines on top
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
      // additional bottom lines
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
    }
  });
};

export const createAxis = (
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D,
  yScale: ScaleLinear<number, number, never>,
  xScale: ScaleTime<number, number, never>,
  domainStart: Date,
  domainEnd: Date
) => {
  const fontSize = 17;
  createYmainAxis(canvasDimensions, ctx);
  createYaxisTicks(canvasDimensions, ctx, yScale, fontSize);
  createXmainAxis(canvasDimensions, ctx);
  createXAxisTicks(
    canvasDimensions,
    ctx,
    xScale,
    fontSize,
    domainStart,
    domainEnd
  );

  createHorizontalLines(canvasDimensions, ctx, yScale);
};
