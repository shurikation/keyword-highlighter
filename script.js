let key = '';
let newText = '';

const spanBefore = "<span class='highlight'>";
const spanAfter = "</span>";

const seacrhInput = document.getElementById('field');
const searchButton = document.getElementById('find');
const searchResultList = document.getElementById('search-list');

searchButton.addEventListener('click', function() {
    let userKeyword = seacrhInput.value;
    sessionStorage.setItem('keyword', userKeyword);
});

if(searchResultList) {
    const titles = document.querySelectorAll('.title');
    titles.forEach(function(title) {
        key = sessionStorage.getItem('keyword');
        const regExp = new RegExp(key, 'i');
        let titleText = title.textContent;    
        const newTotalText = syntaxHandler(titleText, regExp);
        title.innerHTML = newTotalText;
    })
}


function syntaxHandler(text, regExp) {
  if(text.match(regExp) === null) {
  	return newText + text;
  } 

  let originalKey = text.match(regExp)[0];
  let firstIdx = text.match(regExp).index;
  let lastIdx = firstIdx + text.length;

  let pieceOfText = text.substring(0, lastIdx);
  let highlightedPieceOfText = pieceOfText.substring(0, firstIdx) 
  + spanBefore + originalKey + spanAfter;
  
  newText += highlightedPieceOfText;
  let remainingText = text.substring(lastIdx, text.length);
  return syntaxHandler(remainingText);
}
