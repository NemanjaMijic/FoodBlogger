$(document).ready(function() {
    var recipeCount = 0;

    $('#cards').on('click', function() {
        alert('Not implemented for this demo version.');
    })
    
    $.ajax({
        url: '/json/cards.json',
        dataType: 'json',
        type: 'get',
        cashe: 'false',
        success: function(data) {
           // console.log("ulazi ovde ");
            var counter = 0;
            recipeCount = data.recipes.length;
            $(data.recipes).each(function(index, value) {
                //console.log("brojac: " + counter);
                if (counter < 5){  // jer 6 stane u jedan red
                    var divOpen = "<arcticle class='card'>";
                    var divImg = "<div class='card-image'><img src='" + value.imgCard + "' alt='food.jpg'></div>";
                    var divTitle = "<div class='card-title'><h3>" + value.name + "</h3></div>";
                    var divDesc = "<div class='card-description'><p>Some desc I dunno</p>";
                    var divClose = "</div></article>";
                    var card = divOpen + divImg + divTitle + divClose;
                    //console.log("moja kartica: " + card);
                    $('#cards').append(card);
                    counter +=1;
                    
                    //FOOTER RECIPES
                    var link = "<li><a href='/index.html#recipe-header'>" + value.name + "</a></li>";
                    $('.recipe-links').append(link);
                }
                else{
                   // console.log('moj brojac: ' + counter);
                    var divOpen = "<arcticle class='card-hidden'>";
                    var divImg = "<div class='card-image'><img src='" + value.imgCard + "' alt='food.jpg'></div>";
                    var divTitle = "<div class='card-title'><h3>" + value.name + "</h3></div>";
                    var divDesc = "<div class='card-description'><p>Some desc I dunno</p>";
                    var divClose = "</div></article>";
                    var card = divOpen + divImg + divTitle + divClose;
                 //   console.log("moja kartica: " + card);
                    $('#cards').append(card);
                }
                $('.card-hidden').hide();
                
            });

            //POPULAR RECIPE -  It's random, no special algorithm :/
            var randomNumber = Math.floor(Math.random() * recipeCount); //return index of random recipe stored in json
            $('#popular-recipe-name').text(data.recipes[randomNumber].name);
            $('#popular-recipe').css("background-image",'url(' + data.recipes[randomNumber].imgBack + ')');
            //$('#dummy-image').css("src",data.recipes[randomNumber].imgCard);
            $(data.recipes[randomNumber].ingridients).each(function(index, value) {
                $('#popular-recipe-ingridients').append("<li>" + value + "</li>")
            });
            //$('#popular-recipe-text').append("<button id='popular-recipe-button'>Read full recipe</button>")
            
            




            // deo koji ide u popup window
            var name = $('#popular-recipe-name').text();
            console.log(name);
            $('#modal-h1').text(name);
            $('#modal-p').text(data.recipes[randomNumber].preparation);
            //////

            // footer section for sponsors
            $(data.sponsors).each(function(index, value) {
                //console.log('oj: '+value);
                $('#sponsors').append("<img src='" + value.img + "' alt='sponsor.logo'>");
                
            })
        }
    });

    // SHOW/HIDE ALL RECIPES 
    var flag = true;
    $('#linkic').on('click', function() {
        if(flag){
           $('.card-hidden').each(function(index, value) {
                $(value).css('display', 'inline-block');
            })
            $('#linkic').text('Click to hide recipes.');
            flag= false;
        }
        else if(!flag){
            $('.card-hidden').each(function(index, value) {
                $(value).css('display', 'none');
            })
            $('#linkic').text('Click to show all recipes.');
            flag = true;
        }
        
    })
})