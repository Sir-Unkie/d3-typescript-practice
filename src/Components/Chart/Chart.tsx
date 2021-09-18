import React, { useRef, useEffect, useState } from 'react';
import styles from './Chart.module.scss';
import * as d3 from 'd3';
import { Selection } from 'd3';

const Chart: React.FC = () => {
  const dimensions = {
    width: 600,
    height: 400,
    chartWidth: 500,
    chartHeight: 300,
    marginLeft: 50,
    marginTop: 50,
  };
  const initialData = [
    { name: 'foo', number: 4000 },
    { name: 'Goo', number: 6000 },
    { name: 'sdsdoo', number: 2000 },
    { name: 'qweoo', number: 4000 },
    { name: 'wqeo', number: 1000 },
  ];

  const [data, setData] = useState(initialData);
  const [selection, setSelection] = useState<null | Selection<
    null,
    unknown,
    null,
    undefined
  >>(null);
  const svgRef = useRef(null);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.number)!])
    .range([dimensions.chartHeight, 0]);
  const x = d3
    .scaleBand()
    .domain(data.map(el => el.name))
    .range([0, dimensions.chartWidth])
    .paddingInner(0.2);

  const yAxis = d3
    .axisLeft(y)
    .ticks(5)
    .tickFormat(d => `${d}$`);
  const xAxis = d3.axisBottom(x);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
    } else {
      selection.selectAll('*').remove();
      console.log(y(10000));
      // axis
      const xAxisGroup = selection
        .append('g')
        .call(xAxis)
        .attr(
          'transform',
          `translate(${dimensions.marginLeft},${
            dimensions.chartHeight + dimensions.marginTop
          })`
        );
      const yAxisGroup = selection
        .append('g')
        .call(yAxis)
        .attr(
          'transform',
          `translate(${dimensions.marginLeft},${dimensions.marginTop})`
        );

      // chart rects
      selection
        .append('g')
        .attr(
          'transform',
          `translate(${dimensions.marginLeft},${dimensions.marginTop})`
        )
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('x', data => {
          const xValue = x(data.name);
          if (xValue) {
            return xValue;
          } else {
            return null;
          }
        })
        .attr('y', d => y(d.number))
        .attr('fill', 'orange')
        .attr('height', d => dimensions.chartHeight - y(d.number));

      selection.exit().remove();
    }
  }, [
    selection,
    data,
    x,
    y,
    dimensions.height,
    dimensions.width,
    dimensions.chartHeight,
    dimensions.marginLeft,
    dimensions.marginTop,
    xAxis,
    yAxis,
  ]);

  const addRandom = () => {
    const randomName = `New ${Math.floor(Math.random() * 40 + 1)}`;
    const randomData = {
      name: randomName,
      number: Math.floor(Math.random() * 10000 + 1),
    };
    setData(prevState => {
      return [...prevState, randomData];
    });
  };
  const removeLast = () => {
    if (data.length === 0) {
      return;
    } else {
      setData(prevState => {
        return prevState.slice(0, prevState.length - 1);
      });
    }
  };

  return (
    <div>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        // className={styles.container}
        ref={svgRef}
      ></svg>
      <button onClick={addRandom}>Add</button>
      <button onClick={removeLast}>Remove</button>
    </div>
  );
};

export default Chart;
