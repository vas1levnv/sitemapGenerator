$(document).ready(function () {
    $("#origin").keyup(function () {
        if ($("#origin").val()) {
            $("#post").prop('disabled', false);
        }
        if ($("#origin").val() === '') {
            $("#post").prop('disabled', true);
        }
    });

    function checkStatusId(id) {
        $.ajax({
            url: 'https://api.sitemap-generator.ru/task/stats/' + id,
            type: "GET",
            success: function (data) {
                if (data.finished) {
                    alert('Статус задачи положительный')
                    getInfoFile(id)
                } else {
                    setTimeout(()=>{
                        alert('Файл еще не загрузился, подождите')
                        checkStatusId(id)
                    },3000)
                }
            }
        });
    }

    function getInfoFile(id) {
        $.ajax({
            url: 'https://api.sitemap-generator.ru/task/' + id,
            type: "GET",
            success: function (data) {
                let link = 'https://api.sitemap-generator.ru/sitemap/' + data.sitemap
                $("#link").empty();
                $("#link").append("<a href=" + link + ">скачать файл</a>")

            }
        });
    }

    $('#post').on('click', function () {
        let ajaxData = {}
        ajaxData.origin = $("#origin").val();
        ajaxData.email = $("#email").val();
        if (!ajaxData.origin) {
            $("#post").prop('disabled', true);
        }

        function isEmail(email) {
            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(String(email).toLowerCase());
        }

        if (!isEmail(ajaxData.email)) {
            alert('Введите валидный Email')
            return false
        }
                $.ajax({
                    url: 'https://api.sitemap-generator.ru/task',
                    type: "post",
                    data: ajaxData,
                    success: function (data) {
                        alert('данные приняты, задача №' + data.id)
                        alert('подождите пока файл для скачивания загрузится')
                        checkStatusId(data.id)
                        //getInfoFile(data.id)
$("#origin").val('')
$("#email").val('')
                    },
                    error: function () {
                        alert('Введите валидный сайт')

                    }
                });

    })
})


