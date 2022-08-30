const loadPhone = async (value, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${value}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit)
}
const displayPhone = (phones, dataLimit) => {
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
                <!-- Button trigger modal -->
                <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#detailsModal"
                    id="details-btn"
                    onclick="loadDetails('${phone.slug}')"
                >Details</button>
                
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
    loadPhone(value, dataLimit);
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
// enter button work
document.getElementById('search-field').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        searchProcess(10)
    }
})

//not the best way to load show all
document.getElementById('show-btn').addEventListener('click', () => {
    searchProcess()
})

const loadDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const response = await fetch(url);
    const data = await response.json();
    displayDetails(data.data);
}
const displayDetails = (data) => {
    const title = document.getElementById('detailsModalLabel');
    title.innerHTML = `<h4>${data.name}</h4> 
    <p><strong>${data.brand}</strong></p>`
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = ``;
    modalBody.innerHTML = `
        <div class="card mb-3 border-0" style="max-width: 540px;">
            <div class="row g-0">
                 <div class="col-md-4 d-flex flex-column align-items-center">
                     <img src="${data.image}" class="img-fluid rounded-start" alt="...">
                 </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <p class="mb-1"><small>Release Date : ${data.releaseDate}</small></p>
                        <p class="mb-1"><small>Chip Set : ${data.mainFeatures.chipSet}</small></p> 
                        <p class="mb-1"><small>Display Size : ${data.mainFeatures.displaySize}</small></p>
                        <p class="mb-1"><small>Memory : ${data.mainFeatures.memory}</small></p>
                        <p class="mb-1"><small>Storage : ${data.mainFeatures.storage}</small></p>
                        <p class="mb-1"><small>Sensors : ${data.mainFeatures.sensors}</small></p>
                    </div>
                </div>
            </div>
        </div>
    `
}
