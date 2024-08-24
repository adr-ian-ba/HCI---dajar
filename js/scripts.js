$(function () {

    // init feather icons
    feather.replace();

    // init tooltip & popovers
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //page scroll
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 20
        }, 10);
        event.preventDefault();
    });

    // slick slider
    $('.slick-about').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false
    });

    //toggle scroll menu
    var scrollTop = 0;
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        //adjust menu background
        if (scroll > 80) {
            if (scroll > scrollTop) {
                $('.smart-scroll').addClass('scrolling').removeClass('up');
            } else {
                $('.smart-scroll').addClass('up');
            }
        } else {
            // remove if scroll = scrollTop
            $('.smart-scroll').removeClass('scrolling').removeClass('up');
        }

        scrollTop = scroll;

        // adjust scroll to top
        if (scroll >= 600) {
            $('.scroll-top').addClass('active');
        } else {
            $('.scroll-top').removeClass('active');
        }
        return false;
    });

    // scroll top top
    $('.scroll-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 10);
    });

    /**Theme switcher - DEMO PURPOSE ONLY */
    $('.switcher-trigger').click(function () {
        $('.switcher-wrap').toggleClass('active');
    });
    $('.color-switcher ul li').click(function () {
        var color = $(this).attr('data-color');
        $('#theme-color').attr("href", "css/" + color + ".css");
        $('.color-switcher ul li').removeClass('active');
        $(this).addClass('active');
    });
});

function gIT(i) {
    return document.getElementById(i).value;
}

class GoogleFormSubmitter{
    constructor(formUrl){
        this.formUrl = formUrl;
        this.details = {};
    }

    setDetail(key, value){
        this.details["entry." + key] = value;
    } 

    getDetail(key) {
        return this.details["entry." + key];
    }

    prepareFormBody(){
        let formBody = [];
        for(const each in this.details){
            const encodeKey = encodeURIComponent(each);
            const encodeValue = encodeURIComponent(this.details[each])
            formBody.push(encodeKey + "=" + encodeValue);
        }
        return formBody.join("&");
    }

    submit() {
        fetch(this.formUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'insomnia/8.6.1'
            },
            body: this.prepareFormBody()
        }).then(response => console.log("Form submitted successfully", response))
          .catch(error => console.error("Failed to submit form", error));
    }
}

const googleForm = new GoogleFormSubmitter("https://docs.google.com/forms/u/0/d/e/1FAIpQLScx_iML5pIKkgy2HVcF43YUPj3lGW5a_0Lgf0pT9C-cKdDtog/formResponse");

function submitGoogleForm() {
   if(!gIT("name") && !gIT("email")){
    
   }else{
        googleForm.setDetail("62044878", gIT("name"));
        googleForm.setDetail("1351592364", gIT("email"));
        googleForm.submit();
        console.log("modal signup")

        $('#signupModal').modal('hide');
        $('#confirmationModal').modal('show');
   }

}