// コンソールにメッセージを表示
console.log("Content script loaded");

// ページのビデオ要素を非表示にする
document.querySelectorAll("video").forEach((video) => {
  video.style.display = "none";
});
