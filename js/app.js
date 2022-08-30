const loadPhone = async (value) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${value}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data)
}
const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
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


document.getElementById('search-btn').addEventListener('click', () => {
    const searchField = document.getElementById('search-field');
    const value = searchField.value;
    searchField.value = '';
    loadPhone(value);
    
})
loadPhone();