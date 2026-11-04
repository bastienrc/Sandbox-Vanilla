// import "../assets/css/pie-charts.css";
import { initPieCharts } from "../assets/js/pie-charts.js";

export function statistique() {
  return {
    html: `
      <h1>Statistique</h1>
      <svg data-pie data-color="accent"
        data-percent="66"
        data-delay="1050"
        data-speed="1800"
        width="300"
        height="300"
        viewBox="-150 -150 300 300"
      >
        <circle
          pathlength="100"
          r="125"
          fill="transparent"
          stroke-dasharray="100"
          stroke-dashoffset="100"
          stroke-width="50"
        />
        <text aria-hidden="true"></text>
      </svg>
    `,
    init: initPieCharts
  };
}
