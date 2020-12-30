let key = '';
let newText = '';
let regExp = null;
let keyLength = 0;

const spanBefore = "<span class='highlight'>";
const spanAfter = "</span>";

const seacrhInput = document.getElementById('field');
const searchButton = document.getElementById('find');
const searchResultList = document.getElementById('search-list');

searchButton.addEventListener('click', function() {
    let userKeyword = seacrhInput.value;
    sessionStorage.setItem('keyword', userKeyword);

    if(searchResultList) {
      const titles = document.querySelectorAll('.title');
      titles.forEach(function(title) {
          key = sessionStorage.getItem('keyword');
          keyLength = key.length;
          regExp = new RegExp(key, 'i');  
          
          let titleText = title.textContent;   
         //  textLength = titleText.length; 
        
          const newTotalText = syntaxHandler(titleText);
          title.innerHTML = newTotalText;
          newText = '';
      })
  }
});
let count = 0;


function syntaxHandler(text) {
   if(count > 10) return;
   count++;

  if(text.match(regExp) === null) {
  	return newText + text;
  } 

  let originalKey = text.match(regExp)[0];
  let firstIdx = text.match(regExp).index;
  let lastIdx = firstIdx + keyLength;

  let pieceOfText = text.substring(0, lastIdx);
  //console.log(pieceOfText);
  let highlightedPieceOfText = pieceOfText.substring(0, firstIdx) + spanBefore + originalKey + spanAfter;

  
  newText += highlightedPieceOfText;
  console.log(text);
  let remainingText = text.substring(lastIdx, text.length);
  console.log(remainingText);

  return syntaxHandler(remainingText);
}
