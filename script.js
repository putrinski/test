<script>
	getRandomImage();

  function toggleFullScreen() {
    let img = document.getElementById("random-image");
    if (!document.fullscreenElement) {
      img.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
      }
    }
  }

  let img = document.getElementById("random-image");
  img.addEventListener("click", toggleFullScreen);

  let closeButton = document.createElement("button");
  closeButton.innerHTML = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.backgroundColor = "white";
  closeButton.style.color = "black";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "50%";
  closeButton.style.padding = "5px 10px";
  closeButton.style.cursor = "pointer";
  closeButton.style.display = "none";
  
  let fullScreenContainer = document.createElement("div");
  fullScreenContainer.style.display = "none";
  fullScreenContainer.style.position = "fixed";
  fullScreenContainer.style.top = "0";
  fullScreenContainer.style.left = "0";
  fullScreenContainer.style.width = "100%";
  fullScreenContainer.style.height = "100%";
  fullScreenContainer.style.backgroundColor = "black";
  fullScreenContainer.style.zIndex = "9999";
  fullScreenContainer.appendChild(closeButton);

  closeButton.addEventListener("click", function() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", function() {
    if (document.fullscreenElement) {
      fullScreenContainer.style.display = "block";
      closeButton.style.display = "block";
    } else {
      fullScreenContainer.style.display = "none";
      closeButton.style.display = "none";
    }
  });

  document.body.appendChild(fullScreenContainer);
</script>
