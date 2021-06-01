$.ajax({
    type: 'GET',
    url: 'http://localhost:51242/api/input',
    success: res => {
        for(let input of res) {
            let content = `
                <li class="splide__slide">
                    <div class="splide__slide__container">
                        <div class="card text-white ${input.isBaseInput?'bg-success':'bg-primary'} m-2">
                            <div class="card-body">
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

function initSliders() {
    new Splide( '#genInput', {
        type      : 'loop',
        perPage   : 2,
        height    : '10rem',
        cover     : true,
        breakpoins: {
            640: {
                height: '6rem',
            }
        }
    } ).mount();

    new Splide( '#baseInput', {
        type      : 'loop',
        perPage   : 2,
        height    : '10rem',
        cover     : true,
        breakpoins: {
            640: {
                height: '6rem',
            }
        }
    } ).mount();
}