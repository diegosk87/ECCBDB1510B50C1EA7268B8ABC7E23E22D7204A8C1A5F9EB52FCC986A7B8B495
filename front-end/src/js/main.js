$.ajax({
    type: 'GET',
    url: 'http://localhost:51242/api/input',
    success: res => {
        for(let input of res) {
            let content = `
                <li class="splide__slide">
                    <div class="splide__slide__container">
                        <div class="card text-white ${input.isBaseInput?'bg-success':'bg-primary'} m-2">
                            <div class="card-body" onclick="getComposition('${input.idInput}', '${input.name}', ${input.preparationTime})">
                                <strong>ID:</strong> ${input.idInput}<br>
                                <strong>Nombre:</strong> ${input.name}<br>
                                <strong>Stock:</strong> ${input.stock}<br>
                                <strong>Tiempo de preparacion:</strong> ${input.preparationTime} min.<br>
                            </div>
                        </div>
                    </div>
                </li>
            `;

            $(input.isBaseInput?'#baseInput .splide__list':'#genInput .splide__list').append(content);
        }

        initSliders();
    },
    error: err => {
        console.log(err);
    }
})

function getComposition(idInput, name, preparationTime) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:51242/api/input?idInput=' + idInput,
        success: res => {
            let table = `<table class="table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>`;

            for(let input of res) {
                table += `      <tr>
                                    <td>${input.name}</td>
                                    <td>${input.quantity}</td>
                                    <td>${input.stock}</td>
                                </tr>`;

                if(input.stock - input.quantity < 0) {
                    preparationTime += Math.abs(input.stock - input.quantity) * input.preparationTime;
                }
            }

            table += `      </tbody>
                        </table>`;

            let content = `
                <h4>${name}</h4>
                <h5>Tiempo total de preparacion: ${preparationTime} mins.</h5> 
                <h5>Composicion:</h5>
                ${table}
                <button class="btn btn-primary" onclick="generateInput('${idInput}', '${name}',  ${preparationTime})">Generar</button>
            `;
            $('#composition').html(content);
        },
        error: err => {

        }
    });
}

function generateInput(idInput, name, preparationTime) {
    $('#generator .container .row').append(`
        <div id="${idInput}" class="col-3">
            <div class="card bg-warning text-white">
                <div class="card-header">${name}</div>
                <div class="card-header">Faltan: <span id="${idInput}-span">${preparationTime}</span> mins.</div>
            </div>
        </div>
    `);

    let interval = setInterval(() => {
        preparationTime--;
        if(preparationTime > 0) $(`#${idInput}-span`).text(preparationTime);
        else {
            $(`#${idInput}`).remove();
            clearInterval(interval);
        } 
    }, 1000);
}

function initSliders() {
    new Splide( '#genInput', {
        type: 'loop',
        perPage: 2,
        height: '10rem',
        cover: true,
        breakpoins: {
            640: {
                height: '6rem',
            }
        }
    } ).mount();

    new Splide( '#baseInput', {
        type: 'loop',
        perPage: 2,
        height: '10rem',
        cover: true,
        breakpoins: {
            640: {
                height: '6rem',
            }
        }
    } ).mount();
}