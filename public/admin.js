async function main() {    
    let response = await fetch('http://localhost:3001/listBooks');
    let books = await response.json();
    books.forEach(renderBook);
}

function renderBook(book) {
    let item = document.createElement('li');
    item.textContent = book.title;

    let quantity = document.createElement('input');
    quantity.value = book.quantity;
    quantity.setAttribute('id', 'qty' + book.id)

    let button = document.createElement('button');
    button.textContent = 'Save'
    button.setAttribute('id', book.id)
    button.addEventListener('click', updateBook);

    item.append(quantity, button);
    list.append(item);
}

async function updateBook(e) {
    let response = await fetch('http://localhost:3001/updateBook', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                "id": parseInt(e.target.id),
                "quantity": parseInt(document.getElementById('qty' + e.target.id).value)
        }),
    });
}

let root = document.querySelector('#root');
let list = document.createElement('ul');
root.append(list);

main();

