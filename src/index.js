import {
  drawRadarVisualization,
  removeRadarVisualization,
} from "./radar_visualization.js";

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", async () => {
    const config = await fetchConfig();
    removeRadarVisualization(config);
    renderRadar(config);
  });

window.addEventListener("load", async () => {
  const config = await fetchConfig();
  renderRadar(config);
});

const fetchConfig = async () => {
  try {
    const config = await fetch("./config.json");
    return config.json();
  } catch (error) {
    console.error("Error fetching config.json", error);
    return {};
  }
};

const renderRadar = async (config) => {
  drawRadarVisualization({
    repo_url: "https://github.com/zalando/tech-radar",
    title: "Zalando Tech Radar",
    date: config.date,
    quadrants: [
      { name: "Languages" },
      { name: "Infrastructure" },
      { name: "Datastores" },
      { name: "Data Management" },
    ],
    rings: [
      { name: "ADOPT", color: "#5ba300" },
      { name: "TRIAL", color: "#009eb0" },
      { name: "ASSESS", color: "#c7ba00" },
      { name: "HOLD", color: "#e09b96" },
    ],
    entries: config.entries,
    colors: config.colors,
    print_ring_descriptions_table: true,
  });
};
