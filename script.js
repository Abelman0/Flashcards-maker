const createBox = document.getElementsByClassName("create-box")[0];
const flashcards = document.querySelector(".flashcards");

const question = document.getElementById("question")
const answer = document.querySelector("#answers");

// buttons 
const show_CreateBox = document.querySelector("#show_CreateBox");
const del_FlashCards = document.querySelector("#del_FlashCards");
const close_CreateBox = document.querySelector("#close_CreateBox");
const save_Flashcards = document.querySelector("#save_Flashcards");

let contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// making the button to work 1 NEw button, 2 del Cards button, 3 close button
/* ------------------------------------------------------------------------------------------------------ */

show_CreateBox.addEventListener('click', function(){
    createBox.classList.remove("hidden");
})

del_FlashCards.addEventListener('click', () => {
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];
})


close_CreateBox.addEventListener('click', () => {
    createBox.classList.toggle("hidden");
})

/* ------------------------------------------------------------------------------------------------------ */


  // making div element for the flashcards with className flashcard
/* ------------------------------------------------------------------------------------------------------ */

function  divMaker(cardObect, del_index) {          // this creating the full div of the flashcard 
    const div = document.createElement("div");
    const h2_question =  document.createElement("h2");
    const h2_answer =  document.createElement("h2");
    const i_del = document.createElement("i");

    div.className = 'flashcard';

    h2_question.setAttribute('style',"border-top: 1px solid orange; padding: 15px; margin-top: 30px");
  
    h2_question.innerHTML = cardObect.my_question;
    
    h2_answer.setAttribute('style', "text-align: center; color: red;");
    h2_answer.classList.add('hidden')
    h2_answer.textContent =  cardObect.my_answer;

    i_del.className = 'fa-solid fa-circle-xmark';
        //<i class="fa-solid fa-circle-xmark"></i>

    i_del.addEventListener('click', function(){
        contentArray.splice(del_index, 1);
        localStorage.setItem('items', JSON.stringify(contentArray)); 
        window.location.reload();
    })

    div.appendChild(h2_question);     // we are making our flashcard filing with question, answer, and the delet button
    div.appendChild(h2_answer);
    div.appendChild(i_del);

    div.addEventListener('click', function(){
        h2_answer.classList.toggle('hidden')
    });

    flashcards.appendChild(div);
}

// calling (or displaying) the flashcards to the screen when newly open the browser
contentArray.forEach(divMaker);

// making save button to work
/* ------------------------------------------------------------------------------------------------------ */
save_Flashcards.addEventListener('click', function(){
    var flashcard_info = {
        'my_question': question.value,
        'my_answer':   answer.value
    }

    contentArray.push(flashcard_info);    // we are adding the new flashcard_info object to the end of array or top of the stack 
   localStorage.setItem('items', JSON.stringify(contentArray));     // we are converting the array with value of object to string since localStorage takes(stores) a value of string
   divMaker(contentArray[contentArray.length - 1], contentArray.length - 1);     // we are sending the current created object and it index to the div_maker
   question.value = '';
   answer.value = '';
})


/*
contentArray = [
     {
        'my_question': question.value,
        'my_answers': answer.value
    }
]

 */