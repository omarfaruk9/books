const searchData = () => {
    /* clear data  */
    document.getElementById('details-display').innerHTML = '';
    document.getElementById('invalid-data').innerHTML = '';
    const inputField = document.getElementById('input-field');

    /* search total info */

    if (inputField.value.length > 0) {
        displayData(inputField.value);
    }
    else {
        document.getElementById('searh-result').innerHTML = `
            <span class=" bg-info text-light fs-3 py-2 px-5 rounded-3"> no input</span>
        `;
    }
    inputField.value = '';
}

/*    fetch data   */
 
const fetchData = async (url) => {
    const res = await fetch(url);
        const data = await res.json();
    return data;
}

/* display show data  */

const displayData = (inputValue) => {

    /* search total result  */

    fetchData(`https://openlibrary.org/search.json?q=${inputValue}`).then(data => {
    const dispalydata = document.getElementById('details-display');
    dispalydata.textContent = '';
        document.getElementById('searh-result').innerHTML = `
        <h2 class="text-light"> ${data.numFound}</h2>
    `;
        
    /*  error msg  */
        
    if (data.numFound === 0) {
        document.getElementById('invalid-data').innerHTML = `
        <span class="bg-danger fs-3 p-2 text-warning"> Plase enter your valid book name</span>
        `;
        }
    data.docs.forEach(details => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card border-0 shadow-lg h-100">
            <img src="https://covers.openlibrary.org/b/id/${details.cover_i}-L.jpg" class="card-img-top img-fluid" alt="images not found">
            <div class="card-body mt-3">
                <h3 class="card-title">${details.title}</h3>
                <h5 class="card-text">Author: ${details.author_name}</h5>
                <strong>published by: ${details.publisher}</strong>
                <p>${details.first_publish_year}</p>
            </div>
        </div>
        
        `;
        dispalydata.appendChild(div);
    });
    })
    

}