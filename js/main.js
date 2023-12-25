
var siteInput = document.querySelector(".siteInput");
var urlInput = document.querySelector(".urlInput");
var subBtn = document.querySelector(".sub-btn");
var clearBtn = document.querySelector(".clearBtn");
var deleteAll = document.getElementById("deleteAll");
var urlErrorDiv = document.querySelector('.urlErrorDiv');
var siteNameErrorDiv = document.querySelector('.siteNameErrorDiv');

var bookMarkList = []

if (localStorage.getItem('productData') != null) {
    bookMarkList = JSON.parse(localStorage.getItem('productData'));
    displayData();
}
subBtn.addEventListener('click', function () {
    urlInput.classList.remove('is-invalid');
    siteInput.classList.remove('is-invalid');
if(siteInput.value === "" ){
    siteInput.classList.add('is-invalid');
    siteNameErrorDiv.classList.remove('d-none');
    return;
}
if(urlInput.value === ""){
    urlInput.classList.add('is-invalid');
    urlErrorDiv.classList.remove('d-none');
    return;
}
    product = {
        site: siteInput.value,
        url: urlInput.value
    }
    bookMarkList.push(product);
    localStorage.setItem("productData", JSON.stringify(bookMarkList));
    displayData();
    clearInputValue();

})
function onValidateUrl() {
 if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(urlInput.value)) {
        urlInput.classList.remove('is-invalid');
        urlInput.classList.add('is-valid');
        urlErrorDiv.classList.add('d-none');
        
    }
    else {
        urlInput.classList.add('is-invalid');
        urlErrorDiv.classList.remove('d-none');
       
    }
}
function onvalidateName() {
    if (/^[a-zA-Z ]*$/g.test(siteInput.value)) {
        siteInput.classList.remove('is-invalid');
        siteInput.classList.add('is-valid');
        siteNameErrorDiv.classList.add('d-none');
    }
    else {
        siteInput.classList.add('is-invalid');
        siteNameErrorDiv.classList.remove('d-none');
    
    }
}
function displayData() {
    var container = "";
    for (var i = 0; i < bookMarkList.length; i++) {
        container += `<tr>
        <td scope="row">${i + 1}</td>
        <td>${bookMarkList[i].site}</td>
        <td> <button onclick="visitUrl('${bookMarkList[i].url}')" class="btnVisit"><i class="fa-solid fa-eye"></i> Visit</button></td>
        <td> <button onclick="deleteProduct(${i})" class="btnDelete"><i class="fa-solid fa-trash"></i> Delete</button></td></tr>`

    }
    document.querySelector('#tbody').innerHTML = container;
}
function clearInputValue() {
    siteInput.value = "";
    urlInput.value = "";
    urlErrorDiv.classList.add("d-none");
    urlInput.classList.remove('is-valid');
    urlInput.classList.remove('is-invalid');
    siteInput.classList.remove('is-invalid');
    siteInput.classList.remove('is-valid');
}
function deleteProduct(index) {
    bookMarkList.splice(index, 1);
    localStorage.setItem("productData", JSON.stringify(bookMarkList));
    displayData();
}
function visitUrl(url) {
    window.open(url)
}
deleteAll.addEventListener("click", function () {
    bookMarkList.splice(0);
    localStorage.clear()
    // bookMarkList = []
    // localStorage.setItem('productData', JSON.stringify(bookMarkList))
    displayData()
})
clearBtn.addEventListener("click", clearInputValue);
