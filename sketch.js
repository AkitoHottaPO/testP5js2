let dragCoordinates = []; // ドラッグ中の座標を記録する配列
let bgImage; // 背景画像を格納する変数
const MIN_DISTANCE = 10; // プッシュするための最小距離

function preload() {
  bgImage = loadImage('back.jpg', 
    () => console.log('Image loaded successfully'), // 成功時
    () => console.error('Failed to load image')      // エラー時
  );
}

function setup() {
  createCanvas(1000, 709); // 描画エリアを作成
  background(bgImage);    // 背景に画像を設定
}

function draw() {

  // ドラッグ中の線を描画
  if (mouseIsPressed) {
    stroke(0); // 線の色を黒に設定
    strokeWeight(2); // 線の太さ
    line(pmouseX, pmouseY, mouseX, mouseY); // 前フレームと現在のマウス位置をつなぐ線
    // 座標間の距離を計算し、条件に応じてログ
    //if (dragCoordinates.length === 0 || distance(mouseX, mouseY, dragCoordinates[dragCoordinates.length - 1][0], dragCoordinates[dragCoordinates.length - 1][1]) >= MIN_DISTANCE) {
      dragCoordinates.push([mouseX, mouseY]); // 距離が条件を満たした場合のみプッシュ
    //}
  }
}

// マウスを離したときの処理
function mouseReleased() {
  if (dragCoordinates.length > 0) {
    // 座標をCSV形式に変換
    let csvData = [];
    dragCoordinates.forEach(coord => {
      csvData.push(coord.join(",")); // "x,y"形式に変換して追加
    });
    saveStrings(csvData, 'dragCoordinates.csv'); // CSVファイルを保存
    dragCoordinates = []; // 配列をリセット
  }
}
