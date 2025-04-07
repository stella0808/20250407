let circles = [];
let menu; // 將選單變數提升到全域範圍

function setup() {
  // 產生一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);
  background("#caf0f8");

  // 建立選單
  createMenu();

  // 產生40個圓的初始位置、大小與顏色
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(30, 50),
      color: color(random(255), random(255), random(255)),
    });
  }
}

function draw() {
  background("#caf0f8");

  // 計算滑鼠影響的大小變化
  let sizeOffset = map(mouseX, 0, width, 20, 80);

  // 繪製每個圓
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size + sizeOffset);
  }

  // 控制選單顯示與隱藏
  if (menu) { // 確保 menu 已經初始化
    if (mouseY >= 0 && mouseY <= 200) {
      menu.style('display', 'flex'); // 顯示選單
    } else {
      menu.style('display', 'none'); // 隱藏選單
    }
  }
}

function createMenu() {
  // 建立一個HTML的ul元素
  menu = createElement('ul');
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('left', '10px');
  menu.style('list-style', 'none');
  menu.style('padding', '0');
  menu.style('margin', '0');
  menu.style('background', '#ffffff');
  menu.style('border', '1px solid #ccc');
  menu.style('border-radius', '5px');
  menu.style('overflow', 'hidden');
  menu.style('display', 'none'); // 預設隱藏
  menu.style('z-index', '1000'); // 確保選單在畫布之上

  // 選單項目
  let items = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片'];
  for (let item of items) {
    let li = createElement('li', item);
    li.style('padding', '10px 20px');
    li.style('cursor', 'pointer');
    li.style('border-right', '1px solid #ccc');
    li.style('background', '#f9f9f9');
    li.style('text-align', 'center');
    li.style('position', 'relative'); // 為子選單定位
    li.mouseOver(() => li.style('background', '#e0e0e0'));
    li.mouseOut(() => li.style('background', '#f9f9f9'));
    menu.child(li);

    // 如果是「作品集」，新增子選單
    if (item === '作品集') {
      let subMenu = createElement('ul');
      subMenu.style('position', 'absolute');
      subMenu.style('top', '100%');
      subMenu.style('left', '0');
      subMenu.style('list-style', 'none');
      subMenu.style('padding', '0');
      subMenu.style('margin', '0');
      subMenu.style('background', '#ffffff');
      subMenu.style('border', '1px solid #ccc');
      subMenu.style('border-radius', '5px');
      subMenu.style('display', 'none'); // 預設隱藏
      subMenu.style('z-index', '1000'); // 確保子選單在畫布之上

      // 子選單項目
      let subItems = [
        { name: '第一周作業', link: 'https://stella0808.github.io/20250324/' },
        { name: '第二周作業', link: 'https://stella0808.github.io/20250317/' },
        { name: '第三周作業', link: '#' },
      ];

      for (let subItem of subItems) {
        let subLi = createElement('li', subItem.name);
        subLi.style('padding', '10px 20px');
        subLi.style('cursor', 'pointer');
        subLi.style('border-bottom', '1px solid #ccc');
        subLi.style('background', '#f9f9f9');
        subLi.style('text-align', 'left');
        subLi.mouseOver(() => subLi.style('background', '#e0e0e0'));
        subLi.mouseOut(() => subLi.style('background', '#f9f9f9'));
        subLi.mousePressed(() => loadIframe(subItem.link)); // 點擊載入 iframe
        subMenu.child(subLi);
      }

      // 顯示/隱藏子選單
      li.mousePressed(() => {
        if (subMenu.style('display') === 'none') {
          subMenu.style('display', 'block');
        } else {
          subMenu.style('display', 'none');
        }
      });

      li.child(subMenu);
    }
  }

  // 移除最後一個項目的右邊框
  menu.child().last().style('border-right', 'none');
}

// 建立 iframe 並載入選擇的網頁
function loadIframe(url) {
  let iframe = select('#contentIframe');
  if (!iframe) {
    iframe = createElement('iframe');
    iframe.id('contentIframe');
    iframe.style('position', 'absolute');
    iframe.style('top', '50px');
    iframe.style('left', '10px');
    iframe.style('width', '95%');
    iframe.style('height', '90%');
    iframe.style('border', '1px solid #ccc');
    iframe.style('border-radius', '5px');
    iframe.parent(document.body); // 將 iframe 加入到 body
  }
  iframe.attribute('src', url); // 設定 iframe 的來源
}