const gridContainer = document.querySelector(".grid-container");
const inputButton = document.querySelector("#input-button");
const resetButton = document.querySelector("#reset-button");
const rgbButton = document.querySelector("#rgb-button");
const effectButton = document.querySelector("#effect-button");
const defaultButton = document.querySelector("#default-button");
let colorMode = "black";
let gridItems;
function createGrid(input = null) {
  let gridNumber;
  if (input) {
    gridNumber = input;
  } else {
    gridNumber = 16;
  }
  gridContainer.replaceChildren();
  gridContainer.setAttribute(
    "style",
    `grid-template-columns: repeat(${gridNumber}, 2fr);
  grid-template-rows: repeat(${gridNumber}, 2fr);`
  );
  for (let i = 0; i < gridNumber * gridNumber; i++) {
    let item = document.createElement("div");
    item.classList.add("grid-item");
    gridContainer.appendChild(item);
  }
  changeColorMode("black");
  gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((item) => {
    item.addEventListener("mouseover", () => {
      if (!item.classList.contains("colored") && colorMode !== "effect") {
        item.classList.add("colored", "dark-0");
        item.setAttribute(
          "style",
          `background-color:${chooseColor(colorMode)}`
        );
      } else if (colorMode === "effect") {
        item.setAttribute(
          "style",
          `background-color:${chooseColor(colorMode, item)}`
        );
      }
    });
  });
}

function chooseColor(mode = null, item = null) {
  let color = "#";
  if (mode === "RGB") {
    const letters = "0123456789ABCDEF";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  } else if (mode === "black") {
    color += "000000";
  } else if (mode === "effect") {
    let effectLevelText = "";
    let effectLevel;
    let colorCurrent = getComputedStyle(item).backgroundColor;
    if (!item.classList.contains("dark-10")) {
      for (let level of item.classList.values()) {
        if (level.includes("dark")) {
          effectLevelText += level;
          effectLevelText = effectLevelText.split("-");
          effectLevel = +effectLevelText[1] + 1;
          color = pSBC(-+effectLevel / 10, colorCurrent);
          item.classList.replace(level, `dark-${effectLevel}`);
        }
      }
    } else {
      color = colorCurrent;
    }
  }
  return color;
}

function changeColorMode(newMode) {
  colorMode = newMode;
}
inputButton.addEventListener("click", () => {
  let input = +prompt("Please enter the number of square per size:");
  createGrid(input);
});

resetButton.addEventListener("click", () => {
  gridContainer.replaceChildren();
  createGrid();
  changeColorMode("black");
});

rgbButton.addEventListener("click", () => {
  changeColorMode("RGB");
});

effectButton.addEventListener("click", () => {
  changeColorMode("effect");
});
defaultButton.addEventListener("click", () => {
  changeColorMode("black");
});
const pSBC=(p,c0,c1,l)=>{
	let r,g,b,P,f,t,h,m=Math.round,a=typeof(c1)=="string";
	if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
	h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=pSBC.pSBCr(c0),P=p<0,t=c1&&c1!="c"?pSBC.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
	if(!f||!t)return null;
	if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
	else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
	a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
	if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
	else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

pSBC.pSBCr=(d)=>{
	const i=parseInt;
	let n=d.length,x={};
	if(n>9){
		const [r, g, b, a] = (d = d.split(','));
	        n = d.length;
		if(n<3||n>4)return null;
		x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
	}else{
		if(n==8||n==6||n<4)return null;
		if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
		d=i(d.slice(1),16);
		if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=Math.round((d&255)/0.255)/1000;
		else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
	}return x
};

createGrid();
