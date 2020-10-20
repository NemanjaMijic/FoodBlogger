$(document).ready(function() {

    $(window).scroll(function() {
        var hT = $('#logo-footer').offset().top,
            hH = $('#logo-footer').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT+hH-wH)){
            document.getElementById('newsletter').style.display = 'block';
        }
        else {
            document.getElementById('newsletter').style.display = 'none';

        }
     });


    // klik na dugme za prikaz recepta
    document.getElementById('popular-recipe-button').addEventListener('click', function() {
        document.querySelector('.bg-modal').style.display = 'flex';
    });

    // klik na dugme za zatvaranje popup-a
    document.querySelector('.close').addEventListener('click', function() {
         document.querySelector('.bg-modal').style.display = 'none';
    })
})