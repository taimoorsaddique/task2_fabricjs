// fetching and displaying images in leftPanel

const fetchImages = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const displayImages = async (parentId) => {
    const parent = document.getElementById(parentId);
    const data = await fetchImages("https://picsum.photos/v2/list");
    data.forEach((photo)=>{
        const img = document.createElement("img");
        img.classList.add("content-img");
        img.src = photo.url;
        parent.appendChild(img);
    });
}
// displayImages("images");


// Control for active menu states

let menuItems = document.getElementById("menuItems").children;

let panelContent = document.getElementById("panelContent").children;
menuItems = Array.from(menuItems);
panelContent = Array.from(panelContent);
menuItems.forEach((item)=>{
    item.addEventListener("click", ()=>{
       menuItems.forEach(tempItem => {
           tempItem.classList.remove("menu-item-active");
       });
       item.classList.add("menu-item-active");
       panelContent.forEach((tempContent)=>{
        tempContent.classList.remove("content-active");
       });
       panelContent[menuItems.indexOf(item)].classList.add("content-active");
    });
});


// global canvas variable
const canvas = new fabric.Canvas("canvas");
canvas.setHeight(400);
canvas.setWidth(700);
canvas.setBackgroundColor("white");

// change canvas background

let colors = document.getElementsByClassName("color");
colors = Array.from(colors);
colors.forEach((elem)=>{
    elem.addEventListener("click", ()=>{
        let backgroundColor = window.getComputedStyle(elem);
        canvas.setBackgroundColor(backgroundColor.getPropertyValue("background-color"));
        canvas.renderAll();
    });
});


// generating Text

let textList = document.getElementsByClassName("text");
textList = Array.from(textList);
textList.forEach((elem)=>{
    elem.addEventListener("click", ()=>{
        let textProperties = window.getComputedStyle(elem);
        let fontSize = textProperties.getPropertyValue("font-size").split("px");
        fontSize = fontSize[0];
        let height = textProperties.getPropertyValue("height").split("px");
        height = height[0];
        let width = textProperties.getPropertyValue("width").split("px");
        width = width[0];
        // console.log(height);
        let textEditable = new fabric.Textbox(
            'Default Text', {
            width:250,
            fontSize: fontSize,
            fontFamily:textProperties.getPropertyValue("font-family"),
            top:canvas.getHeight()/2 - height/2,
            left:canvas.getWidth()/2 - width/2,
            editable: true
        });
        
        canvas.add(textEditable);
        canvas.renderAll();
        
    });
});

// add Images to canvas


let images = document.getElementsByClassName("image");
images = Array.from(images);
images.forEach((elem)=>{
    elem.addEventListener("click", ()=>{
        let textProperties = window.getComputedStyle(elem);
        let height = textProperties.getPropertyValue("height").split("px");
        height = height[0];
        let width = textProperties.getPropertyValue("width").split("px");
        width = width[0];

        let img = new fabric.Image(elem, {
        top:canvas.getHeight()/2 - height/2,
        left:canvas.getWidth()/2 - width/2,
          opacity: 0.85
        });
        canvas.add(img);
    });
});

// download image

const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", ()=>{
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let link = document.createElement('a');
    link.download = "canvas.png";
    link.href = image;
    link.click();


});

// delete an object 

const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener('click', () => {
    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj);
    });
    canvas.discardActiveObject().renderAll();
})

// changing font size of text



