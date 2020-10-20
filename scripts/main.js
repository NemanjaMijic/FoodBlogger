$(document).ready(function() {
    
    var listOfIds = [];
    var index = 1;

    const loadJson = () => {

    
        $.ajax({
            url : '/json/data.json',
            dataType: 'json',
            type: 'get',
            cashe: 'false',
            success: function(data){
            console.log(data);
    
                $(data.users).each(function(index, value){
                    //console.log('broj elemenata: ' + data.users.length)
                    
                    
                    /// generisanje div elemenata na osnovu broja objekata u json fajlu
                    // ovo predstavlja testimonial carousel
                    
                    var id = value.id;
                    if(!listOfIds.includes(id)){
                        listOfIds.push(id);
                        var divOpen  = "<div class='item'>";
                        var divImg = "<img src='" + value.avatar_icon + "' >";
                        //console.log('divImg: ' + value.avatar_icon);
                        var divName = "<p class='user-info'>" + value.name + "</p>";
                        //console.log('divName: ' + value.name);
                        var divAddress = "<p class='user-info'>" + value.address + "</p>";
                        //console.log('divAddress: ' + value.address);
                        var divClose= "</div>";
                        var divText = "<blockquote class='user-text'><q>" + value.text + "</q></blockquote>";
    
                        var complete = divOpen + divImg + divName + divAddress + divClose + divText;
                        $('.testemonial-carousel').append(complete);
                        showDiv(index);
                    }
                    
                })
    
            }
        })
    }

    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
    
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
        });
    }

    
    $('.recipe-button').on('click', function() {
        $('html, body').animate({ scrollTop:  $('#recipe-header').offset().top - 50 }, 'slow');
    })

    
    const restartTabs = () => {
        $('#breakfast-underline').css('background', 'grey');
        $('#lunch-underline').css('background', 'grey');
        $('#dinner-underline').css('background', 'grey');
        $('#breakfast').css('color', 'grey');
        $('#lunch').css('color', 'grey');
        $('#dinner').css('color', 'grey');
    }

    function showDiv(n){
        //alert('ulazi');
        var i;
        
        var a = document.getElementsByClassName('item');
        var b = document.getElementsByClassName('user-text');
        //console.log('moj index: '+index+'duzina: '+a.length);
        if(n > a.length){
            index = 1;
        }
        if(n < 1){
            index = a.length;
        }
        for (i=0; i<a.length; i++){
            $(a[i]).css("display","none");
            $(b[i]).css("display","none"); 
        }
        $(a[index-1]).css("display","block");
        $(b[index-1]).css("display","block");
    }

    /// za boldovanje linije ispod kliknutog taba
    

    $('.testimonial-button').on('click', function() {

        var trigger = $(this).attr('id');
            if(trigger === 'left-arrow'){
                index -=1;
                showDiv(index)
            }
            if(trigger === 'right-arrow'){
                index +=1;
                showDiv(index)
            }
        
    });
    $('.tab-button').on('click', function() {
        restartTabs();
        var trigger = $(this).attr('id');
        $('#'+trigger+'-underline').css('background', 'rgb(62, 121, 80)');
        $('#'+trigger).css('color', 'black');
        $.ajax({
            url : '/json/data.json',
            dataType: 'json',
            type: 'get',
            cashe: 'false',
            success: function(data){

                // popuni tabove
                $(data.meals).each(function(index, value) {
                    if(trigger === value.id){
                        $('#json-h1').text(value.h2);
                        $('#json-desc-intro').text(value.descIntro);
                        $('#json-desc-main').text(value.descMain);
                    }
                })

            }
        })
        
    })
    navSlide();
    loadJson();
    setTimeout(function(){

        $("#breakfast").click();
    
    },1);
});











