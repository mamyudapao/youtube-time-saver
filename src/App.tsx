import { Button, Flex } from "@mantine/core";
import "./App.css";
import { useEffect, useState } from "react";

type PlayMode = "radio" | "video";

const App: React.FC = () => {
  const [mode, setMode] = useState<PlayMode>("radio");
  const handleClickRadioMode = () => {
    localStorage.setItem("mode", "radio");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id ?? 0;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          document.querySelectorAll("video").forEach((video) => {
            video.style.display = "none";
          });
          console.log("radio mode");
        },
      });
      setMode("radio");
    });
  };

  const handleClickVideoMode = () => {
    localStorage.setItem("mode", "video");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id ?? 0;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          document.querySelectorAll("video").forEach((video) => {
            video.style.display = "block";
          });
        },
      });
      setMode("video");
    });
  };

  useEffect(() => {
    if (localStorage.getItem("mode") === "radio") {
      handleClickRadioMode();
    } else {
      handleClickVideoMode();
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <Flex
          direction="column"
          justify="center"
          align="center"
          style={{ height: "100vh" }}
        >
          <Flex direction="row" justify="center" align="center" gap="md">
            <Button
              color={mode === "radio" ? "blue" : "gray"}
              variant="filled"
              onClick={() => {
                handleClickRadioMode();
              }}
            >
              Radio Mode
            </Button>
            <Button
              color={mode === "video" ? "blue" : "gray"}
              variant="filled"
              onClick={() => {
                handleClickVideoMode();
              }}
            >
              Video Mode
            </Button>
          </Flex>
        </Flex>
      </header>
    </div>
  );
};

export default App;
