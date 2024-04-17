// views
let allWishesTbody = document.querySelector('tbody');
let allWishesViews = document.querySelectorAll('.wish-view');
let editView = document.querySelector('#edit-wishes-view')

// buttons
let allNavBtns = document.querySelectorAll('nav a');

crateWishTable();

let allEditBtns = document.querySelectorAll('td button');


// events
allNavBtns.forEach(btn => btn.addEventListener('click', function (e){
    if(e.preventDefault()){
        e.preventDefault();
    }
    toggleBtn(this);
    showView(`${this.innerHTML.toLowerCase()}-view`);
}))

allEditBtns.forEach(btn => btn.addEventListener('click', showEditView))

function toggleBtn(btn){
    allNavBtns.forEach(btn =>{
        btn.classList.remove('active');
    })
    btn.classList.add('active');
}

function showView(viewId) {
    allWishesViews.forEach(view => {
        view.style.display = 'none';
    });
    let currentPage = document.querySelector(`#${viewId}`);
    if (currentPage) {
        currentPage.style.display = 'block';
    }
}

function showEditView(e){
    allWishesViews.forEach(view => {
        view.style.display ='none'
    })
    editView.style.display = 'block'
}

function crateWishTable(){
    let text = '';
    let fullPrice;
    let importantMsg;
    wishes.forEach(wish => {
        (wish.important) ? importantMsg = "yes" : importantMsg = "no"
        fullPrice = wish.price + wish.currency;
        text +=`
            <tr class="${importantMsg.toLowerCase()}">
                <td>${wish.item}</td>
                <td>${fullPrice}</td>
                <td><a href="${wish.link}" class="btn">Link</a></td>
                <td>${wish.shop}</td>
                <td>${importantMsg}</td>
                <td class="action-td">
                    <button class="btn">Edit <i class="fa-solid fa-pen-to-square"></i> </button>
                    <button class="btn">Delete <i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `.trim();
    })
    allWishesTbody.innerHTML = text;
    console.log(text);
}