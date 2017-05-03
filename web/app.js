$(document).ready(() => {
    $("#generate").on("click", (event) => {
        event.preventDefault();

        $.ajax({
            url: "/speak",
            success: (result) => {
                const list = result.reduce((html, text) => {
                    return html+'<li>'+text+'</li>';
                }, '');
                $('#generated').html('<ul>'+list+'</ul>')
            }
        });
    });

});
