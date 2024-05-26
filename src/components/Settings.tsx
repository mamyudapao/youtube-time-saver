import { Button, Modal, NumberInput } from "@mantine/core";
import { useEffect, useState } from "react";

type Props = {
  opened: boolean;
  close: () => void;
};

export const Settings = (props: Props) => {
  const { opened, close } = props;
  const [watchTimeLimit, setWatchTimeLimit] = useState<number | string>(0);
  const saveSettings = (watchTimeLimit: number) => {
    chrome.storage.local.set({ watchTimeLimit: watchTimeLimit });
  };

  const getSettings = async () => {
    const settings = (await chrome.storage.local.get("watchTimeLimit")) as {
      watchTimeLimit: number;
    };
    return settings.watchTimeLimit;
  };

  useEffect(() => {
    getSettings().then((watchTimeLimit) => setWatchTimeLimit(watchTimeLimit));
  }, []);
  return (
    <Modal opened={opened} onClose={close} title="Settings">
      <NumberInput
        label="Daily watch time limit"
        description="Set daily watch time limit in minutes"
        value={watchTimeLimit}
        onChange={setWatchTimeLimit}
      />
      <Button
        variant="filled"
        onClick={() => saveSettings(Number(watchTimeLimit))}
      >
        Save
      </Button>
    </Modal>
  );
};
