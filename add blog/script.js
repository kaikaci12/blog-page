const fileInput = document.getElementById("upload-input");
const dropZone = document.getElementById("dropZone");
const selectedImg = document.querySelector(".selected-img");
const imageName = document.getElementById("image-name");
const closeBtn = document.getElementById("close-btn");
let base64;
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

selectedImg.style.display = "none";
dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", (event) => {
  dropZone.classList.remove("drag-over");
});
dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("drag-over");
  const files = event.dataTransfer.files;
  fileInput.files = files;
  checkSelected();
});
function checkSelected() {
  if (fileInput.files[0].name) {
    selectedImg.style.display = "flex";
    dropZone.style.display = "none";
    imageName.innerHTML = fileInput.files[0].name;
  } else {
    selectedImg.style.display = "none";
    dropZone.style.display = "flex";
    imageName.innerHTML = fileInput.files[0].name;
  }
}
fileInput.addEventListener("change", checkSelected);
closeBtn.addEventListener("click", (e) => {
  fileInput.value = "";
  dropZone.style.display = "flex";
  selectedImg.style.display = "none";
  imageName.innerHTML = "";
});
fileInput.addEventListener("change", async () => {
  base64 = await convertToBase64(fileInput.files[0]);
});
