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
    $.post("http://localhost:3000/restaurants",
        // monta o json da requisição
        {
            "name": name,
            "category": category,
            "deliveryEstimate": deliveryEstimate,
            "rating": rating,
            "about": about,
            "hours": hours
        }, (result) => {
            Swal.fire({
                title: 'Cadastro realizado com sucesso!',
                showClass: {
                    popup: 'animated fadeInDown faster'
                },
                hideClass: {
                    popup: 'animated fadeOutUp faster'
                }
            })
            limpaDados();
            window.location.href = "listar.html";
        });
}

function validar() {
    let id = $('#id').val();
    let name = $('#name').val();
    let category = $('#category').val();
    let deliveryEstimate = $('#deliveryEstimate').val();
    let rating = $('#rating').val();
    let about = $('#about').val();
    let hours = $('#hours').val();
    let valida = true;

    if (!id) {
        valida = false;

    }

    return valida;
}

function limpaDados() {
    $('#id').val("");
    $('#name').val("");
    $('#category').val("");
    $('#deliveryEstimate').val("");
    $('#rating').val("");
    $('#about').val("");
    $('#hours').val("");
}

function buscarFiltro() {
    // recupera o valor da tela para pesquisar
    let search = $("#search").val();

    s.get("http://localhost:3000/restaurants?search=" + search, (data) => {
        $each(data, () => {

        });
    });
}

function buscar() {

    $.get("http://localhost:3000/restaurants", (data) => {
        console.log(data)
        let ul = $("#tabela");
        $.each(data, (i, item) => {
            ul.append(`<tr>
            <th scope="row" onclick="editar(${item.id})">${item.id}</th> 
            <td onclick="buscarFiltro(${item.id})">${item.name}</td>
            <td onclick="buscarFiltro(${item.id})">${item.category}</td>
            <td onclick="buscarFiltro(${item.id})">${item.deliveryEstimate}</td>
            <td onclick="buscarFiltro(${item.id})">${item.rating}</td>
            <td onclick="buscarFiltro(${item.id})">${item.about}</td>
            <td onclick="buscarFiltro(${item.id})">${item.hours}</td>
            <td> <a><i class="fas fa-trash" onclick="apagar(${item.id})"></i></a></td>
            </tr>`)
        });
    });
}

function limparTabela() {
    $("#tabela").html("");
}

function apagar(id) {

    Swal.fire({
        title: 'Você tem Certeza?',
        text: "Deseja realmente excluir o item? Não será possivel desfazer a ação.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: 'http://localhost:3000/restaurants/' + id,
                type: 'DELETE',
                success: function (response) {
                    limparTabela();
                    buscar();
                }
            });
            Swal.fire(
                'Excluido!',
                'O item foi excluido com sucesso.',
                'success'
            )

        }

    })
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
        url: 'http://localhost:3000/restaurants',
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

function preencheDados() {
    $('#id').val(id);
    $('#name').val(name);
    $('#category').val(category);
    $('#deliveryEstimate').val(deliveryEstimate);
    $('#rating').val(rating);
    $('#about').val(about);
    $('#hours').val(hours);
}