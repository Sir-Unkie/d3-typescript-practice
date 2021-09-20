import { CanvasDimensions } from './interfaces';
import { ScaleLinear } from 'd3';

export const createAxis = (
  canvasDimensions: CanvasDimensions,
  ctx: CanvasRenderingContext2D,
  yScale: ScaleLinear<number, number, never>
) => {
  // vertical main axis
  ctx.moveTo(
    canvasDimensions.marginLeft,
    canvasDimensions.height - canvasDimensions.marginBot
  );
  ctx.lineTo(canvasDimensions.marginLeft, canvasDimensions.marginBot);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  // ticks and horizontal additional axis
  yScale.ticks(5).forEach((tick, i) => {
    ctx.fillStyle = 'black';
    ctx.font = '17px Arial';
    if (i === 0) {
      ctx.fillText(
        `${tick}`,
        canvasDimensions.marginLeft - 30,
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
        canvasDimensions.marginLeft - 30,
        canvasDimensions.height / 2 - yScale(tick)
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

      ctx.fillText(
        `-${tick}`,
        canvasDimensions.marginLeft - 30,
        canvasDimensions.height / 2 + yScale(tick)
      );
    }
  });
};
