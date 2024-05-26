chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started");
});

// コンソールにメッセージを表示
console.log("Content script loaded");

// ページのビデオ要素を非表示にする
document.querySelectorAll("video").forEach((video) => {
  video.style.display = "none";
});

// ストレージからモードを取得して適用する
chrome.storage.local.get("mode", (items) => {
  if (items.mode === "radio") {
    document.querySelectorAll("video").forEach((video) => {
      video.style.display = "none";
    });
  } else if (items.mode === "video") {
    document.querySelectorAll("video").forEach((video) => {
      video.style.display = "block";
    });
  }
});

// リサイズイベントリスナーを追加して、ビデオ要素を再度非表示にする
window.addEventListener("resize", () => {
  chrome.storage.local.get("mode", (items) => {
    if (items.mode === "radio") {
      document.querySelectorAll("video").forEach((video) => {
        video.style.display = "none";
      });
    }
  });
});