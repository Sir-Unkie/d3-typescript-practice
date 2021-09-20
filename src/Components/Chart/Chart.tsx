import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  ChangeEvent,
  SyntheticEvent,
} from 'react';
import { useWeatherData } from '../../Hooks/useFetchData';
import { createScales } from '../../Utils/createScales';
import { drawData } from '../../Utils/drawData';
import { createAxis } from '../../Utils/createAxis';
// import styles from './Chart.module.scss';
interface Period {
  start: Date;
  end: Date;
}

const Chart: React.FC = () => {
  const [period, setPeriod] = useState<null | Period>(null);
  const URL =
    'https://gist.githubusercontent.com/Sir-Unkie/f04d65ed2c54fcd35f77ae669cf66882/raw/1d330ab37acec52cdb34c6e08fc8a642c17d6aa4/Weather.JSON';
  const { data, setData } = useWeatherData(URL);
  const [dateStart, setDateStart] = useState<string | number>('');
  const [dateEnd, setDateEnd] = useState<string | number>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasDimensions = useMemo(() => {
    return {
      width: 700,
      height: 500,
      marginBot: 50,
      marginLeft: 50,
    };
  }, []);
  const chartDimensions = useMemo(() => {
    return {
      width: canvasDimensions.width - canvasDimensions.marginLeft * 2,
      height: canvasDimensions.height - canvasDimensions.marginBot * 2,
    };
  }, [canvasDimensions]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#d8dfff';
    ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    if (!data) {
      return;
    }

    if (!period) {
      const { xScale, yScale } = createScales(data, chartDimensions);
      createAxis(canvasDimensions, ctx, yScale, xScale);
      drawData(xScale, yScale, data, canvasDimensions, ctx);
    } else {
      const { xScale, yScale } = createScales(
        data,
        chartDimensions,
        period.start,
        period.end
      );
      createAxis(canvasDimensions, ctx, yScale, xScale);
      drawData(xScale, yScale, data, canvasDimensions, ctx);
    }
  }, [data, canvasDimensions, chartDimensions, period]);

  const dateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateStart(e.target.value);
  };
  const dateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateEnd(e.target.value);
  };
  const addDataHandler = () => {
    setPeriod({
      start: new Date(dateStart),
      end: new Date(dateEnd),
    });
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <br />
      <input
        type='date'
        id='date1'
        placeholder='start date'
        onChange={dateStartChange}
        value={dateStart}
      ></input>
      <input
        type='date'
        id='date2'
        placeholder='end date'
        value={dateEnd}
        onChange={dateEndChange}
      ></input>
      <button onClick={addDataHandler}>add 1</button>
    </div>
  );
};

export default Chart;
