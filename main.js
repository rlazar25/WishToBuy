window.addEventListener('beforeunload', save)

function save(){
    localStorage.db = JSON.stringify(wishes)
}
// helpers
let index = null;
// views
let allWishesTbody = document.querySelector('tbody');
let allWishesViews = document.querySelectorAll('.wish-view');

// buttons
let allNavBtn = document.querySelectorAll('nav a');
let saveBtn = document.querySelector('#save-btn');
let updateBtn = document.querySelector('#update-btn');

// inputs
let itemInput = document.querySelector('input[name="item"]');
let priceInput = document.querySelector('input[name="price"]');
let linkInput = document.querySelector('input[name="link"]');
let shopInput = document.querySelector('input[name="shop"]');
let currencyInput = document.querySelector('select[name="currency"]');
let importantInput = document.querySelector('input[name="important"]');
let searchInput =document.querySelector('input[type="search"]')

let eitemInput = document.querySelector('input[name="eitem"]');
let epriceInput = document.querySelector('input[name="eprice"]');
let elinkInput = document.querySelector('input[name="elink"]');
let eshopInput = document.querySelector('input[name="eshop"]');
let ecurrencyInput = document.querySelector('select[name="ecurrency"]');
let eimportantInput = document.querySelector('input[name="eimportant"]');

crateWishTable();

// events
saveBtn.addEventListener('click', saveNewWish);
updateBtn.addEventListener('click', updateWish)
allNavBtn.forEach(btn => btn.addEventListener('click', function (e){
    if(e.preventDefault()){
        e.preventDefault();
    }
    toggleBtn(this);
    showView(`${this.innerHTML.toLowerCase()}-view`);
}))

searchInput.addEventListener('input', searchDB);

// functions
function searchDB(){
    let searchTerm = this.value.toLowerCase();
    let filtered = wishes.filter(function(el){
        return el.item.toLowerCase().includes(searchTerm) ||
            el.price.toLowerCase().includes(searchTerm) ||
            el.shop.toLowerCase().includes(searchTerm);
    })
    crateWishTable(filtered)
}

function saveNewWish(e){
    e.preventDefault()
    let newWish = {
        item: itemInput.value,
        price: priceInput.value,
        link: linkInput.value,
        shop: shopInput.value,
        currency: currencyInput.value,
        important: importantInput.checked
    }
    wishes.push(newWish);
    crateWishTable();
    showView(`all-wishes-view`);
    // toggleBtn();

    itemInput.value ='';
    priceInput.value ='';
    linkInput.value ='';
    shopInput.value ='';
    currencyInput.value ='rsd';
    importantInput.value ='';
}

function updateWish(e){
    e.preventDefault();
    let updatedWish = {
        item : eitemInput.value,
        price : epriceInput.value,
        link : elinkInput.value,
        shop : eshopInput.value,
        currency : ecurrencyInput.value,
        important : eimportantInput.checked
    }
    wishes[index] = updatedWish;
    crateWishTable();
}

function toggleBtn(btn){
    allNavBtn.forEach(btn =>{
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

function crateWishTable(filtered){
    showView('all-wishes-view')
    let data = filtered || wishes;
    let text = '';
    let fullPrice;
    let importantMsg;
    data.forEach((wish,index) => {
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
                    <button data-index="${index}" class="btn edit"> <span>Edit</span>  <i class="fa-solid fa-pen-to-square"></i> </button>
                    <button data-index="${index}" class="btn delete"> <span>Delete</span>  <i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `.trim();
    })
    allWishesTbody.innerHTML = text;
    let allEditBtn = document.querySelectorAll('td button.edit');
    let allDeletebtn = document.querySelectorAll('td button.delete');

    allDeletebtn.forEach((btn, index) => {
        btn.addEventListener('click', deleteWish);
        allEditBtn[index].addEventListener('click', showEditView)
    })

}

function showEditView(e){
    index = this.getAttribute('data-index');
    let currentWish = wishes[index]

    eitemInput.value = currentWish.item;
    epriceInput.value = currentWish.price;
    elinkInput.value = currentWish.link;
    eshopInput.value = currentWish.shop;
    ecurrencyInput.value = currentWish.currency;

    (currentWish.important) ? eimportantInput.setAttribute('checked', 'true') : false;

    showView('edit-wishes-view');
}

function deleteWish(){
    index = this.getAttribute('data-index');
    wishes.splice(index, 1);
    crateWishTable();
}
