import React, { useCallback, useMemo } from "react";
import { Line } from "react-chartjs-2";

import { ThemeType } from "../../types/types";

type PropsType = {
  theme: ThemeType;
  chartData: {
    labels: Array<string>;
    datasets: Array<number>;
  };
};

const ChartLine: React.FC<PropsType> = ({ theme, chartData }) => {
  // Generate date for chart
  const data = useCallback((canvas: HTMLCanvasElement ) => {
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    const gradient: CanvasGradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(91, 156, 169, 0.8)");
    gradient.addColorStop(1, "rgba(91, 156, 169, 0)");

    return {
      labels: chartData.labels,
      datasets: [
        {
          backgroundColor: gradient,
          borderColor: "#5b9ca9",
          borderWidth: 1,
          pointColor: "#fff",
          pointStrokeColor: "#5b9ca9",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#5b9ca9",
          data: chartData.datasets,
          label: "High",
        },
      ],
    };
  }, [chartData]);

  // Options for chart
  const options = useMemo(() => ({
    legend: {
      display: false,
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: theme === "dark" ? "#fff" : "#333",
          },
          gridLines: {
            color: "rgba(140, 140, 140, 0.1)",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: theme === "dark" ? "#fff" : "#333",
          },
          gridLines: {
            color: "rgba(140, 140, 140, 0.1)",
          },
        },
      ],
    },
  }), [theme]);

  return <Line data={data} options={options} height={100} />;
};

export default ChartLine;
