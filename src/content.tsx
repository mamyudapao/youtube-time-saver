import { PlayMode } from "./types";

const getCurrentModeFromLocalStorage = async () => {
  const currentMode = (await chrome.storage.local.get("mode")) as {
    mode: PlayMode;
  };
  return currentMode.mode;
};

const main = async () => {
  const currentMode = await getCurrentModeFromLocalStorage();
  if (currentMode === "radio") {
    document.querySelectorAll("video").forEach((video) => {
      video.style.display = "none";
    });
  }
};

main();
