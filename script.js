let key = '';
let newText = '';
let regExp = null;
let keyLength = 0;

const tagBefore = "<span class='highlight'>";
const tagAfter = "</span>";

const seacrhInput = document.getElementById('field');
const searchButton = document.getElementById('find');
const searchResultList = document.getElementById('search-list');

searchButton.addEventListener('click', function() {
    let userKeyword = seacrhInput.value;
    sessionStorage.setItem('keyword', userKeyword);

    if(searchResultList) {
      const titles = document.querySelectorAll('.title');
      const descriptions = document.querySelectorAll('.description');
      textHandler(titles);
      textHandler(descriptions);
  }
});

function textHandler(elems) {
  elems.forEach(function(elem) {
    key = sessionStorage.getItem('keyword');
    keyLength = key.length;
    regExp = new RegExp(key, 'i');           
    let elemText = elem.textContent;         
    const highlightedText = getHighlightedText(elemText);
    elem.innerHTML = highlightedText;
    newText = '';
  });
}

function getHighlightedText(text) {
  if(text.match(regExp) === null) {
  	return newText + text;
  } 

  let originalKey = text.match(regExp)[0];
  let firstIdx = text.match(regExp).index;
  let lastIdx = firstIdx + keyLength;
  let pieceOfText = text.substring(0, lastIdx);
  let highlightedPieceOfText = pieceOfText.substring(0, firstIdx) + tagBefore + originalKey + tagAfter;

  newText += highlightedPieceOfText;
  console.log(text);
  let remainingText = text.substring(lastIdx, text.length);
  console.log(remainingText);

  return getHighlightedText(remainingText);
}
