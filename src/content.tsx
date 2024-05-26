import { PlayMode } from "./types";

const getCurrentModeFromLocalStorage = async () => {
  const currentMode = (await chrome.storage.local.get("mode")) as {
    mode: PlayMode;
  };
  return currentMode.mode;
};

const incrementWatchTime = async () => {
  const watchTime = (await chrome.storage.local.get("watchTime")) as {
    watchTime: number;
  };
  if (!watchTime.watchTime) {
    watchTime.watchTime = 0;
  }
  watchTime.watchTime += 1;
  chrome.storage.local.set({ watchTime: watchTime.watchTime });
};

const main = async () => {
  const currentMode = await getCurrentModeFromLocalStorage();
  console.log("Hello", currentMode);
  if (currentMode === "radio") {
    document.querySelectorAll("video").forEach((video) => {
      video.style.display = "none";
    });
  }
  setInterval(incrementWatchTime, 1000);
};

main();
