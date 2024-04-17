// views
let allWishesView = document.querySelector('#all-wishes-view');
let allWishesTbody = document.querySelector('tbody');

crateWishTable();

function crateWishTable(){
    let text = '';
    let fullPrice;
    let importantMsg;
    wishes.forEach(wish => {
        (wish.important) ? importantMsg = "yes" : importantMsg = "no"
        fullPrice = wish.price + wish.valute;
        text +=`
            <tr>
                <td>${wish.item}</td>
                <td>${fullPrice}</td>
                <td><a href="${wish.link}" class="btn">Link</a></td>
                <td>${wish.shop}</td>
                <td>${importantMsg}</td>
                <td class="action-td">
                    <button class="btn">Edit</button>
                    <button class="btn">Delete</button>
                </td>
            </tr>
        `.trim();
    })
    allWishesTbody.innerHTML = text;
    console.log(text);
}