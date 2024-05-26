import { Button, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import "./App.css";
import { useEffect, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { PlayMode } from "./types";
import { Settings } from "./components/Settings";

const App: React.FC = () => {
  const [mode, setMode] = useState<PlayMode>("radio");
  const [watchTime, setWatchTime] = useState<number>(0);
  const [opened, { open, close }] = useDisclosure();
  const handleClickRadioMode = () => {
    chrome.storage.local.set({ mode: "radio" });
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
    chrome.storage.local.set({ mode: "video" });
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

  const getCurrentWatchTime = async () => {
    const watchTime = (await chrome.storage.local.get("watchTime")) as {
      watchTime: number;
    };
    return watchTime.watchTime;
  };

  const formatWatchTime = (watchTime: number) => {
    const hours = Math.floor(watchTime / 3600);
    const minutes = Math.floor((watchTime % 3600) / 60);
    const seconds = watchTime % 60;
    return `${hours}h:${minutes}m:${seconds}s`;
  };

  useEffect(() => {
    chrome.storage.local.get("mode").then((items) => {
      setMode(items.mode);
      if (items.mode === "radio") {
        handleClickRadioMode;
      } else if (items.mode === "video") {
        handleClickVideoMode;
      }
    });
    setInterval(() => {
      getCurrentWatchTime().then((watchTime) => {
        setWatchTime(watchTime);
      });
    }, 1000);
  }, [mode]);

  return (
    <div className="App">
      <header className="App-header">
        <Flex direction="column" style={{ height: "100%" }}>
          <Flex direction="row" justify="flex-end" style={{ height: "50px" }}>
            <Button variant="light" onClick={open}>
              <AiTwotoneSetting />
            </Button>
          </Flex>
          <Flex direction="column" align="center">
            <Text>{"Viewing time is " + formatWatchTime(watchTime)}</Text>
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
        </Flex>
        <Settings opened={opened} close={close} />
      </header>
    </div>
  );
};

export default App;
