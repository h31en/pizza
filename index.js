
const arrBases = [
    {
        name: 'Тонкое тесто',
        price: 10,
        kind: `Основа`
    },
    {
        name: 'Пышное тесто',
        price: 15,
        kind: `Основа`
    },
    {
        name: 'Хот-дог борт',
        price: 18,
        kind: `Основа`
    },
    {
        name: 'Сырный борт',
        price: 18,
        kind: `Основа`
    }
];
const arrIngredients1 = [
    {
        name: 'Грибы',
        price: 8,
        kind: `Ингредиент.1`
    },
    {
        name: 'Перец',
        price: 5,
        kind: `Ингредиент.1`
    },
    {
        name: 'Ветчина',
        price: 9,
        kind: `Ингредиент.1`
    },
    {
        name: 'Лук',
        price: 7,
        kind: `Ингредиент.1`
    }
];
const arrIngredients2 = [
    {
        name: 'Ананас',
        price: 5,
        kind: `Ингредиент.2`
    },
    {
        name: 'Креветки',
        price: 9,
        kind: `Ингредиент.2`
    },
    {
        name: 'Томаты',
        price: 3,
        kind: `Ингредиент.2`
    },
    {
        name: 'Маслины',
        price: 4,
        kind: `Ингредиент.2`
    }
];
const arrSauces = [
    {
        name: 'Чесночный',
        price: 2,
        kind: `Соус`
    },
    {
        name: 'Кетчуп',
        price: 2,
        kind: `Соус`
    },
    {
        name: 'Соус-ранч',
        price: 2,
        kind: `Соус`
    },
    {
        name: 'Барбекю',
        price: 2,
        kind: `Соус`
    }
];



const base = createIngredients(arrBases, document.getElementsByClassName('base')[0]);
const ingredients1 = createIngredients(arrIngredients1, document.getElementsByClassName('ingredients_wr')[0]);
const ingredients2 = createIngredients(arrIngredients2, document.getElementsByClassName('ingredients_wr')[1]);
const sauce = createIngredients(arrSauces, document.getElementsByClassName('sauce')[0]);
const selectedLi = document.getElementsByClassName('selected_ingredients')[0].querySelector('ul');
const priceDiv = document.getElementsByClassName('price')[0];
const wrapper2Li = document.getElementsByClassName('wrapper2')[0].querySelectorAll('li');

const btn = document.getElementById('order-btn');


function createIngredients (arr, ul) {
    arr.forEach(({name, price, kind}) => {
        ul.insertAdjacentHTML('beforeend', `
        <li data-price=${price} data-kind=${kind}>${name}</li>
        `);
    });
    return ul;
}

function addSelectedIngredients (el) {
    const li = document.createElement('li');
    li.textContent = el.textContent;
    li.dataset.price = el.dataset.price;
    li.dataset.kind = el.dataset.kind;
    selectedLi.append(li);
}

 
function showPrice() {
    const totalPrice = [...selectedLi.children].reduce((sum, li) => sum + Number(li.dataset.price), 0);
    const priceHTML = `<p>Цена: ${totalPrice}$</p>`;
    if (priceDiv.querySelector('p')) {
      priceDiv.querySelector('p').remove();
    }
    priceDiv.insertAdjacentHTML('beforeend', priceHTML);
  }

function getSelIng(event) {
    if (event.target.tagName !== 'UL') {
      if (event.target.classList.contains('selected_li')) {
        delSelectedIngredients(event.target.textContent);
        event.target.classList.remove('selected_li');
      } else {
        const selLiCount = event.target.parentElement.getElementsByClassName('selected_li').length;
        const isKindV = event.target.dataset.kind === 'Основа' || event.target.dataset.kind === 'Соус';
        if (selLiCount === (isKindV ? 1 : 2)) {
          const firstSelectedLi = event.target.parentElement.getElementsByClassName('selected_li')[0];
          delSelectedIngredients(firstSelectedLi.textContent);
          firstSelectedLi.classList.remove('selected_li');
        }
        event.target.classList.add('selected_li');
        addSelectedIngredients(event.target);
      }
      showPrice();
      chekKindLis();

    }
  };


function delSelectedIngredients (text) {
    selectedLi.querySelectorAll('li').forEach(li => li.textContent === text ? li.remove() : true);
}

function delSelLi (e) {
    delSelectedIngredients(e.target.textContent);
    [...wrapper2Li].forEach(li => li.textContent === e.target.textContent ? li.classList.remove('selected_li') : true);
    showPrice();
    chekKindLis();
}




base.addEventListener('click', getSelIng);

ingredients1.addEventListener('click', getSelIng);

ingredients2.addEventListener('click', getSelIng);

sauce.addEventListener('click', getSelIng);

selectedLi.addEventListener('click', delSelLi);
