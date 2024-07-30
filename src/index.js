import {
  drawRadarVisualization,
  removeRadarVisualization,
} from "./radar_visualization.js";

export const fetchConfig = async () => {
  try {
    const config = await fetch("./config.json");
    return config.json();
  } catch (error) {
    console.error("Error fetching config.json", error);
    return {};
  }
};

export const fetchTechnologies = async () => {
  try {
    const config = await fetch("./technologies.json");
    return config.json();
  } catch (error) {
    console.error("Error fetching technologies.json", error);
    return {};
  }
};

export const stopRenderingRadarInElement = (element) => {
  const identifier = element || "radar";
  removeRadarVisualization(identifier);
};

export const renderRadarInElement = (
  identifier,
  config,
  technologies,
  scale,
  theme,
) => {
  drawRadarVisualization({
    svg_id: identifier || config.svg_id || "radar",
    ...config,
    ...technologies,
    scale: scale || config.scale || 1,
    theme: theme || config.theme || "light",
  });
};
