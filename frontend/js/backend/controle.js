var flag = true;

function salvar() {
    if (validarCampos) {
        if (flag == true) {
            inserir();
        } else {
            console.log("Alterar")
            alterar();
        }
    }
}

function inserir() {
    // recupera os valores da tela para enviar no post
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
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                limpaDados();
                window.location.href = "listar.html"
            })

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

function redirecionaCadastro(id) {
    window.location.href = "cadastro.html?id=" + id;
}

function buscarFiltro() {
    let id = window.location.href.split("=")[1];
    $.get("http://localhost:3000/restaurants/" + id, (data) => {
        console.log(data)
        flag = false;
        $("#id").val(data.id);
        $("#name").val(data.name);
        $("#category").val(data.category);
        $("#deliveryEstimate").val(data.deliveryEstimate);
        $("#rating").val(data.rating);
        $("#about").val(data.about);
        $("#hours").val(data.hours);
    });

}
function buscarNome() {
    let nome = $('#seach').val();
    $.get("http://localhost:3000/restaurants?name=" + search, (data) => {
        console.log(data)
        flag = false;
        $("#id").val(data.id);
        $("#name").val(data.name);
        $("#category").val(data.category);
        $("#deliveryEstimate").val(data.deliveryEstimate);
        $("#rating").val(data.rating);
        $("#about").val(data.about);
        $("#hours").val(data.hours);
    });

}

function buscar() {

    $.get("http://localhost:3000/restaurants", (data) => {
        console.log(data)
        let ul = $("#tabela");
        $.each(data, (i, item) => {
            ul.append(`<tr>
            <th scope="row" onclick="editar(${item.id})">${item.id}</th> 
            <td onclick="redirecionaCadastro(${item.id})">${item.name}</td>
            <td onclick="redirecionaCadastro(${item.id})">${item.category}</td>
            <td onclick="redirecionaCadastro(${item.id})">${item.deliveryEstimate}</td>
            <td onclick="redirecionaCadastro(${item.id})">${item.rating}</td>
            <td onclick="redirecionaCadastro(${item.id})">${item.about}</td>
            <td onclick="redirecionaCadastro(${item.id})">${item.hours}</td>
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
        confirmButtonText: 'Excluir!'
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
    console.log("entrou Alterar")
    let id = $('#id').val();
    let name = $('#name').val();
    let category = $('#category').val();
    let deliveryEstimate = $('#deliveryEstimate').val();
    let rating = $('#rating').val();
    let about = $('#about').val();
    let hours = $('#hours').val();

    $.ajax({
        url: 'http://localhost:3000/restaurants/' + id,
        type: 'put',
        success: function (response) {
            Swal.fire({
                title: 'Cadastro realizado com sucesso!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                window.location.href = "listar.html"
            })

        },
        data: {
            'name': name,
            'category': category,
            'deliveryEstimate': deliveryEstimate,
            'rating': rating,
            'about': about,
            'hours': hours
        }
    });
}

function validarCampos() {
    let flag = true;

    if ($('#name').val() == '') {
        flag = false;
        $('#name').css("background", "#ff6961");
    }
    if ($('#category').val() == '') {
        flag = false;
        $('#category').css("background", "#ff6961");
    }
    if ($('#deliveryEstimate').val() == '') {
        flag = false;
        $('#deliveryEstimate').css("background", "#ff6961");
    }
    if ($('#rating').val() == '') {
        flag = false;
        $('#rating').css("background", "#ff6961");
    }
    if ($('#about').val() == '') {
        flag = false;
        $('#about').css("background", "#ff6961");
    }
    if ($('#hours').val() == '') {
        flag = false;
        $('#hours').css("background", "#ff6961");
    }

    Swal.fire({
        icon: 'error',
        title: 'Opa... Algo deu errado!',
        text: 'Os campos marcados com * devem ser preenchidos'
    })

    return flag;
}
