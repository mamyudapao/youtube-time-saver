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

const manageWatchTimeState = async () => {
  const currentMode = await getCurrentModeFromLocalStorage();
  if (currentMode === "video") {
    incrementWatchTime();
  }
};

const forceChangeModeToRadioIfWatchTimeLimitExceeded = async () => {
  const watchTimeLimit = (await chrome.storage.local.get("watchTimeLimit")) as {
    watchTimeLimit: number;
  };
  const watchTime = (await chrome.storage.local.get("watchTime")) as {
    watchTime: number;
  };
  if (
    watchTimeLimit.watchTimeLimit &&
    watchTime.watchTime >= watchTimeLimit.watchTimeLimit * 60
  ) {
    chrome.storage.local.set({ mode: "radio" });
    document.querySelectorAll("video").forEach((video) => {
      video.style.display = "none";
    });
  }
};

const main = async () => {
  const currentMode = await getCurrentModeFromLocalStorage();
  console.log("Hello", currentMode);
  if (currentMode === "radio") {
    document.querySelectorAll("video").forEach((video) => {
      video.style.display = "none";
    });
  }
  setInterval(manageWatchTimeState, 1000);
  setInterval(forceChangeModeToRadioIfWatchTimeLimitExceeded, 1500);
};

main();
