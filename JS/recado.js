const openModal = () => document.getElementById('transaction-modal').classList.add('active')

let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session")

document.getElementById("button-logout").addEventListener("click", logout);

const getLocalStorage = ()=> JSON.parse(localStorage.getItem('db_recado'))?? []
const setLocalStorage = (dbRecado)=> localStorage.setItem('db_recado', JSON.stringify(dbRecado))

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "login.html"
}

checkLogged();

function checkLogged () {
    if(session) {
        sessionStorage.setItem("logged", session)
        logged = session;
    }
   
    if(!logged) {
        window.location.href = "Login.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }     
}

//CRUD - READ
const readRecado = ()=> getLocalStorage()

//CRUD-CREAT
const createRecado =(recado)=> {
    const dbRecado = getLocalStorage()
    dbRecado.push(recado)
    setLocalStorage(dbRecado)
}

//CRUD - UPDATE
const updateRecado = (i, recado)=> {
    const dbRecado = readRecado()
    dbRecado[i] = recado
    setLocalStorage(dbRecado)
}

//CRUD - DELETE
const deleteRecado =(i)=>{
    const dbRecado = readRecado()
    dbRecado.splice(i,1)
    setLocalStorage(dbRecado)
}

const isValidFields =()=>{
    return document.getElementById("create-form").reportValidity()
}
//Interação com o layout
const saveRecado =()=>{
    if(isValidFields()){
        const recado = {
            id: getLocalStorage.length+1,
            descricao: document.getElementById('description-creat-input').value,
            detalhamento: document.getElementById('detail-creat-input').value,
        }
        createRecado(recado)
        updateTable()     
    }
}

const creatRow =  (recado, index)=>{
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${recado.id}</td>
    <td>${recado.descricao}</td>
    <td>${recado.detalhamento}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}">Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
    `
    document.querySelector('#tableRecados>tbody').appendChild(newRow)
}

const clearTable = ()=>{
    const rows = document.querySelectorAll('#tableRecados>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable =  () =>{
    const dbRecado = readRecado()
    clearTable()
    dbRecado.forEach(creatRow)
}

const fillFields = (recado) => {
    document.getElementById('description-creat-input').value = recado.descricao
    document.getElementById('detail-creat-input').value = recado.detalhamento
}
const editRecado = (index) =>{
    const recado = readRecado()[index]
    fillFields(recado)
    openModal()
}

const editDelete =(event) =>{
    if(event.target.type =='button'){
        const [action, index]  = event.target.id.split('-')

        if(action == 'edit'){
            editRecado(index)
        }else{
            console.log('editando o cliente');
        }

    }

}

updateTable()

//Eventos
document.getElementById('cadastrarRecados').addEventListener('click', openModal)

document.getElementById("salvar").addEventListener('click',saveRecado)

document.querySelector('#tableRecados>tbody').addEventListener('click',editDelete)
