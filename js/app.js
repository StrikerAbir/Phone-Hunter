const loadPhone = async (value,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${value}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data,dataLimit)
}
const displayPhone = (phones,dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    //display 10 phones only and show all button
    const showAll = document.getElementById('showAll');
    if (phones.length > 10 && dataLimit) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    } else {
        showAll.classList.add('d-none')
    }
    

    // display no phones found
    const noPhone = document.getElementById('found-none');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
        toggleSpinner(false)
    } else {
        noPhone.classList.add('d-none');
        // display all phones
        phones.forEach((phone) => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card p-3">
              <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  <strong>${phone.brand}</strong>
                </p>
                <p class="card-text">
                  ${phone.slug}
                </p>
              </div>
            </div>
        `
            phoneContainer.appendChild(div)
        })
    }
    //for loading spinner stop
    toggleSpinner(false)
    
}

const searchProcess = (dataLimit) => {
    //for loading spinner start
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const value = searchField.value;
    loadPhone(value,dataLimit);
}
//handle search button click
document.getElementById('search-btn').addEventListener('click', () => {
    
    searchProcess(10)

})

const toggleSpinner = (isLoading) => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none')
    } else {
        loader.classList.add('d-none')
    }
}

//not the best way to load show all
document.getElementById('show-btn').addEventListener('click', () => {
    searchProcess()
})