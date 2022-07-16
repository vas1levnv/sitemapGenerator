$(document).ready(function () {
    function checkStatusId(id) {
        $.ajax({
            url: 'https://api.sitemap-generator.ru/task/stats/' + id,
            type: "GET",
            success: function (data) {
                if (data.finished) {
                    alert('Статус задачи положительный')
                } else {
                    alert('Fail')
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
                $("#link").append("<a href=" + link + ">скачать файл</a>")
            }
        });
    }

    $('#post').on('click', function () {
        let ajaxData = {}
        ajaxData.origin = $("#origin").val();
        ajaxData.email = $("#email").val();
        $.ajax({
            url: 'https://api.sitemap-generator.ru/task',
            type: "post",
            data: ajaxData,
            success: function (data) {
                alert('данные приняты, задача №' + data.id)
                checkStatusId(data.id)
                getInfoFile(data.id)
            }
        });

    })
})



