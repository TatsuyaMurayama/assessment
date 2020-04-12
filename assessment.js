'use strict';//宣言後の記述ミスを表示してくれるコード
const userNameInput = document.getElementById('user-name');
const assessmentButton =document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
//const tweetButton =document.getElementById('tweet');

/**
 * 指定した要素の子供を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = (event) =>{
    if(event.key === 'Enter'){
        //TODO ボタンのonclick()処理を呼び出す
  assessmentButton.onclick();
    }
}

assessmentButton.onclick = () => {
    console.log('診断ボタンが押されました');
    const userName = userNameInput.value;
    if (userName.length == 0 ){
        return;
    }else{
        console.log(userName);
    }
    //TODO 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragragh = document.createElement('p');
    const result = assessment(userName);
    paragragh.innerText = result;
    resultDivided.appendChild(paragragh);


//   //TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefvalue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURI('あなたの良いところ')
    + 'ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefvalue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text' , result);
    anchor.innerText = 'Tweet #あなたの良いところ'
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script)
};
    
　　
//tweetButton.onclick = function(){
//   console.log('ツイートボタンが押されました');


//};

const answer = [ //constは一度入力すると変更できない定数、let　は　{}の中だけで使える変数。constも{}で使うと扱いは同様
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。'
,'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。'
,'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます'
,'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。'
,'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。'
,'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます'
,'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。'
,'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。'
,'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。'
,'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。'
,'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。'
,'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです'
,'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
,'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。'
,'{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

/**
 *名前の文字列を渡すと診断結果を返す関数
 *@param {string} userName　ユーザの名前
 *@return {string} 診断結果
 */
function assessment(userName){
    //TODO 診断結果を処理する
   //全文字のコード番号を取得してそれを足し合わせる
   let Sum0fCharCode = 0;
   for (let i =0; i < userName.length; i++) {
       Sum0fCharCode = Sum0fCharCode +userName.charCodeAt(i);
   } 

   //文字のコードの番号の合計を回答の数で割って添字の数値を求める
   const index = Sum0fCharCode % answer.length;
   let result = answer[index];

   //TODO {userName}をユーザの名前に置き換える
   result = result.replace(/\{userName\}/g, userName); // ここの「\」は関数と思われないため。「/」で変換の区切りをしている。
    return result;
}

//console.log　(assessment('二郎'));
console.assert(
    assessment('太郎') === '太郎のいいところは見た目です。内側から溢れ出る太郎の良さに皆が気を惹かれます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
    );
console.assert(
    assessment('太郎') === assessment('太郎'),
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
    );

