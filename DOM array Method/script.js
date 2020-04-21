const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const ShowMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data=[];

getRandomUser();
getRandomUser();
getRandomUser();



//fetch api using async/await

async function getRandomUser() {
const res = await fetch('https://randomuser.me/api');
const data = await res.json();
const user = data.results[0];

const newUser ={
    name:`${user.name.first}${user.name.last}`,
    money: Math.floor(Math.random()*1000000)
};
  addData(newUser);

}
//double money
function doubleMoney(){
    data = data.map(user => {
     
        return {...user,money:user.money*2};
    }); 
    updateDOM();
}
//sort richest function

function sortRichest(){
    data.sort((a,b) => b.money -a.money);
    updateDOM();
}

//filter method show millionaire

function showMillionaire(){
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}


//calculate wealth by using reduce

function calculateWealth(){
    const wealth = data.reduce((acc,user) => (acc+=user.money),0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth:<strong>${formateMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl);
}


function addData(obj){
    data.push(obj);
    updateDOM();
}
//updateDOM

function updateDOM(providedData=data){
    //clear main div

    main.innerHTML = '<h2><strong>Person</strong></h2>';


    providedData.forEach(item =>{

    const el = document.createElement('div');
    el.classList.add('person');
    el.innerHTML = `<strong>${item.name}</strong>${formateMoney(item.money)}`;
    main.appendChild(el);

    });
}

//format number as money

function formateMoney(number){
 return  '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event listeners
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortRichest);
ShowMillionairesBtn.addEventListener('click',showMillionaire);
calculateWealthBtn.addEventListener('click',calculateWealth);


