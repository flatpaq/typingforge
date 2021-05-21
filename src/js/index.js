
// Sassファイルをインポートする
import "../scss/style.scss"

// エスケープ用関数
function escapeHtml(str) {
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#39;');
  return str;
}

// 変数宣言
let typeText = '';
let textLength = 0;
let currentTypeNumber = 0;
let currentChar = '';

// タイマー用変数
let oldTime;
let currentTime;

// HTMLから要素を取得
let uploadedFile = document.querySelector('#uploaded-file');
let output = document.querySelector('#output');
let incorrectSound = document.querySelector('#incorrect-sound');
let repeat = document.querySelector('#repeat');

const loadingWrapper = document.getElementById('loading-wrapper');

// ダークテーマのための要素を取得
const darkThemeButton = document.querySelector('#dark-theme-button');
const noticeToUpload = document.querySelector('.notice-wrapper.upload');
let isDark = false;

// 繰り返しボタンを押す場合はカーソルなどをリセット
repeat.addEventListener('click', function() {
  typeText = output.textContent;
  textLength = typeText.length - 1;
  currentTypeNumber = 0;
  currentChar = typeText.charAt(currentTypeNumber);
  output.innerHTML = `<span class="text-cursor">${escapeHtml(typeText.slice(0, currentTypeNumber + 1))}</span>${escapeHtml(typeText.slice(currentTypeNumber + 1, typeText.length))}`;
});

// ダークテーマ切り替え
darkThemeButton.addEventListener('click', function() {

  isDark = !isDark;
  const bodyEl = document.querySelector('body');
  bodyEl.classList.toggle('dark');
  const imgEls = document.querySelectorAll('img');
  imgEls.forEach(function(el) {
    if(el.classList.contains('dark') || el.classList.contains('light')) {
      el.classList.toggle('display');
    }
  });

});

// アップロードボタンを押してファイルが挿入あるいは更新された場合
uploadedFile.addEventListener('input', function(e) {

  noticeToUpload.remove();
  let target = e.target;
	let files = target.files;
  let file = files[0];

	let reader = new FileReader();
	reader.addEventListener('load', function() {

      // ファイル内のテキストを変数に格納
      // タブをスペースに変換する
      let resultString = reader.result.replace(/\t/g, ' ');
      // マルチバイト文字を除外する 
      let replacedText = resultString.replace(/[^0-9a-zA-Z!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~\n\s]/g, '');

      // テキストをoutput要素に挿入する
      output.textContent = replacedText.trim();

      // アップロードしたファイルの中身を削除する
      uploadedFile.value = '';
      
      // Assign Value of each Variables
      typeText = output.textContent;
      textLength = typeText.length - 1;
      currentTypeNumber = 0;
      currentChar = typeText.charAt(currentTypeNumber);   

      // Set a Cursor for current char
      output.innerHTML = `<span class="text-cursor">${escapeHtml(typeText.slice(0, currentTypeNumber + 1))}</span>${escapeHtml(typeText.slice(currentTypeNumber + 1, typeText.length))}`;

      incorrectSound.load();
	});
  reader.readAsText(file);

});

// タイピング関数を実行
typeStart();

// タイピング関数
function typeStart() {
  
  // キーダウン時に動作
  output.addEventListener('keydown', typing);
  function typing(el) {

    if( el.key === 'Shift' || el.key === 'Alt' || el.key === 'Ctrl' || el.key === 'Control' || el.key === 'Meta' || el.key === 'Backspace' || el.key === 'Escape' || el.key === 'ArrowUp' || el.key === 'ArrowDown' || el.key === 'ArrowLeft' || el.key === 'ArrowRight' ) {
      // 修飾キーの場合
      el.preventDefault();    

    } else if( el.key === currentChar ) {
      // タイプが正解の場合
      el.preventDefault();    

      // 次の文字をセットする
      currentTypeNumber++;
      currentChar = typeText.charAt(currentTypeNumber);

      // 次の文字へカーソルを動かす
      output.innerHTML = escapeHtml(typeText.slice(0, currentTypeNumber)) + '<span class="text-cursor">' + escapeHtml(typeText.slice(currentTypeNumber, currentTypeNumber + 1)) + '</span>' + escapeHtml(typeText.slice(currentTypeNumber + 1, typeText.length));

      if(currentChar.match(/\r?\n/g)) {
        // エンターキーを押した場合
        currentChar = 'Enter';
        let enterCursor = document.querySelector('.text-cursor');
        enterCursor.classList.add('enter-cursor');
      }

      if(currentTypeNumber === 1) {
        // タイム計測開始
        oldTime = performance.now();
        console.log(oldTime);
      }

      // 最後の文字をタイプした時
      if(currentTypeNumber === typeText.length) {
  
        // 終了時のタイム計測
        currentTime = performance.now();
        console.log(currentTime);
        displayModalWindow();  
      }

    } else if( el.key != currentChar ) {
      // 不正解のタイプの場合
      el.preventDefault();

      incorrectSound.pause();
      incorrectSound.currentTime = 0;

      // setTimeout(function(){
        incorrectSound.play();
      // },0);

    }

  };
};

function displayModalWindow() {

  // タイプ開始時と終了時の時間の差分を計算して秒換算する
  let diffTime = currentTime - oldTime;

  // diffTimeを分秒ミリ秒に変換
  let m = Math.floor(diffTime / (1000 * 60));
  let s = Math.floor((diffTime % (1000 * 60)) / 1000);
  let ms = diffTime % 1000;
  m = `0${m}`.slice(-2);
  s = `0${s}`.slice(-2);
  ms = `00${ms}`.slice(-3);

  // モーダル要素の生成
  const modalEl = document.createElement('div');
  modalEl.classList.add('end-modal', 'row-nocol', 'just-center', 'align-middle');

  // モーダルウィンドウを生成
  const innerEl = document.createElement('section');
  innerEl.classList.add('notice-to-end');
  innerEl.innerHTML = `
    <p><img src="img/finish.svg" class="finish" alt="Finish!"><p>
    <p class="time">Time: <span>${m}:${s}.${ms}</span></p>
    <p class="count">Word: <span>${typeText.length}</span></p>
    <div class="clearfix">
      <button class="close btn btn-radius">Close</button>
    </div>
  `;

  modalEl.appendChild(innerEl);
  document.body.appendChild(modalEl);

  const closeButton = document.querySelector('button.close');

  closeButton.addEventListener('click', () => {
    closeModalWindow(modalEl);
  });

}

function closeModalWindow(modalEl) {
  document.body.removeChild(modalEl);
}

// ローディングアニメーション
import * as Vivus from 'vivus';
window.onload = function() {
  // logo anime
  new Vivus('svg-animation', {
    duration: 80,
    start: 'autostart',
    type: 'delayed',
    },
    function(){
    // obj.el.classList.add('loaded');
        
      setTimeout(() => {
        loadingWrapper.classList.add('loaded');
      }, 800);

  });

}

