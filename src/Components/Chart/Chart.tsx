import React, { useRef, useEffect } from 'react';
import { useWeatherData } from '../../Hooks/useFetchData';
import { createScales } from '../../Utils/createScales';
import { drawData } from '../../Utils/drawData';
import { createAxis } from '../../Utils/createAxis';

// import styles from './Chart.module.scss';
import * as d3 from 'd3';
// import { Selection, easeElastic } from 'd3';

const Chart: React.FC = () => {
  const URL =
    'https://gist.githubusercontent.com/Sir-Unkie/f04d65ed2c54fcd35f77ae669cf66882/raw/1a7d9fb0c1adf6eaf1c1e5deeffc7123c6bd9eaa/Weather.JSON';
  const { data, setData } = useWeatherData(URL);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasDimensions = {
    width: 500,
    height: 500,
    marginBot: 50,
    marginLeft: 50,
  };
  const chartDimensions = {
    width: canvasDimensions.width - canvasDimensions.marginLeft * 2,
    height: canvasDimensions.height - canvasDimensions.marginBot * 2,
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#d4d4d4';
    ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    if (!data) {
      return;
    }
    // create scales
    const { xScale, yScale } = createScales(data, chartDimensions);
    // axis
    createAxis(canvasDimensions, ctx, yScale);
    // visualize data
    drawData(xScale, yScale, data, canvasDimensions, ctx);
  }, [data]);

  const clickHandler = (): void => {
    setData(prevState => {
      return {
        temperature: [
          ...prevState!.temperature,
          Math.floor(Math.random() * 35 + 1),
        ],
        date: [
          ...prevState!.date,
          `${Math.floor(Math.random() * 30 + 1)}.${Math.floor(
            Math.random() * 11 + 1
          )}.2021`,
        ],
      };
    });
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      {!data ? null : <div>{data.temperature.join(' ')}</div>}
      <button onClick={clickHandler}>add 1</button>
    </div>
  );
};

export default Chart;
