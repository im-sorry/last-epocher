const fileInputId = 'epocherFile';
const inputTag = document.getElementById(fileInputId);

inputTag.onchange = () => {
  const file = inputTag.files[0];
  const reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = (e) => {
    console.log(e.target.result, 'e')
  }
}