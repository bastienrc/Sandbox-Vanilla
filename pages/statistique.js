// import "../assets/css/pie-charts.css";
import { initPieCharts } from "../assets/js/pie-charts.js";
import { initGithubContributionGraph } from "../assets/js/github-contribution-graph.js";

function initStatistique() {
  initPieCharts();
  initGithubContributionGraph();
}

export function statistique() {
  return {
    html: `
      <h1>Statistique</h1>
      <svg data-pie data-color="accent"
        data-percent="20"
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

      <svg data-pie data-color="accent2"
        data-percent="80"
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

      <svg data-pie data-color="accent3"
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

      <div class="graph">
        <ul class="months">
          <li>Jan</li>
          <li>Feb</li>
          <li>Mar</li>
          <li>Apr</li>
          <li>May</li>
          <li>Jun</li>
          <li>Jul</li>
          <li>Aug</li>
          <li>Sep</li>
          <li>Oct</li>
          <li>Nov</li>
          <li>Dec</li>
        </ul>
        <ul class="days">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul class="squares"></ul>
      </div>
    `,
    init: initStatistique
  };
}
