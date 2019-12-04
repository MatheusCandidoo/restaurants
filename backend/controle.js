let id;
let name;
let category;
let deliveryEstimate;
let rating;
let about;
let hours;

function salvar() {
    // recupera os valores da tela para enviar no post
    let id = $('#id').val();
    let name = $('#name').val();
    let category = $('#category').val();
    let deliveryEstimate = $('#deliveryEstimate').val();
    let rating = $('#rating').val();
    let about = $('#about').val();
    let hours = $('#hours').val();

    // envia a requisição post
    $.post("http://127.0.0.1/restaurants",
        // monta o json da requisição
        {
            "id": id,
            "name": name,
            "category": category,
            "deliveryEstimate": deliveryEstimate,
            "rating": rating,
            "about": about,
            "hours": hours
        }, (result) => {
            // função comeback da requisição
            
        });
}

function buscarFiltro() {
    // recupera o valor da tela para pesquisar
    let search = $("#search").val();

    s.get("http://127.0.0.1/restaurants?search=" + search, (data) => {
        $each(data, () => {

        });
    });
}

function buscar() {
    // recupera o valor da tela para pesquisar
    let search = $("#search").val();

    s.get("http://127.0.0.1/restaurants", (data) => {
        let ul = $("#tabela");
        $each(data, () => {
            UL.append(`<tr>
            <td onclick="editar(${this.id})">${this.id}</td> 
            <td onclick="editar(${this.name})">${this.name}</td>
            <td onclick="editar(${this.category})">${this.category}</td>
            <td onclick="editar(${this.deliveryEstimate})">${this.deliveryEstimate}</td>
            <td onclick="editar(${this.rating})">${this.rating}</td>
            <td onclick="editar(${this.about})">${this.about}</td>
            <td onclick="editar(${this.hours})">${this.hours}</td>
            <td> <a><i onclick="apagar(${this.id})"></i></a></td>
            </tr>`)
        });
    });
}

function limparTabela() {
    $("#tabela").html("");
}

function apagar(id) {
    $.ajax({
        url: 'http://127.0.0.1/restaurants' + id,
        type: 'DELETE',
        success: function (response) {
            limparTabela();
            buscar();
        }
    });
}

function alterar() {
    let id = $('#id').val();
    let name = $('#name').val();
    let category = $('#category').val();
    let deliveryEstimate = $('#deliveryEstimate').val();
    let rating = $('#rating').val();
    let about = $('#about').val();
    let hours = $('#hours').val();

    $.ajax({
        url: 'http://127.0.0.1/restaurants',
        type: 'put',
        success: function (response) {
            
        },
        data: {
            'id': id,
            'name': name,
            'category': category,
            'deliveryEstimate': deliveryEstimate,
            'rating': rating,
            'about': about,
            'hours': hours
        }
    });
}

function preencheDados(){
    $('#id').val(id);
    $('#name').val(name);
    $('#category').val(category);
    $('#deliveryEstimate').val(deliveryEstimate);
    $('#rating').val(rating);
    $('#about').val(about);
    $('#hours').val(hours);
}