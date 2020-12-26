//导入公共部分
$(document).ready(() => { 
    $('header').load('component/header.html');
    $('.ywjj-colunm2').load('component/ywjj-colunm2.html');
    $('footer').load('component/footer.html');
});

//选项卡
$('.yw_list li').click(function () {
    let index = $(this).index();
    $(this).addClass('current').siblings().removeClass('current');
    $('.newslist').eq(index).addClass('current').siblings().removeClass('current');
});

$('.newslist').each((index, item) => {
    getData(index, $(item));
});
function getData(index, ele) {
    let url = null;
    switch (index) {
        case 0:
            url = 'json/allnews.json';
            break;
        case 1:
            url = 'json/sxkd.json';
            break;
        case 2:
            url = 'json/xsky.json';
            break;
        case 3:
            url = 'json/jyjx.json';
            break;
        case 4:
            url = 'json/zsjy.json';
            break;
        case 5:
            url = 'json/jlhz.json';
            break;
        case 6:
            url = 'json/gdbd.json';
            break;
        case 7:
            url = 'json/shfw.json';
            break;

        default:
            break;
    }
    $.ajax({
        url: url,
        success: function (res) {
            ele.append(renderHtml(res));
        }
    });
}

//继续加载
$('#load').click(function(){
    let item=$('.newslist.current');
    let index=$('.newslist').index($('.newslist.current'));

    getData(index, $(item));
    // getData(index, item);

});

function renderHtml(data) {
    let str = ``;
    data.forEach(item => {
        str += `<li>
        <div class="date">
            <span>${item.day}</span>
            <span>${item.date}</span>
        </div>
        <div class="newscontent">
                <a href="${item.url}">
                    <h5>${item.title}</h5>
                </a>
                <p>${item.content}</p>
                <div class="view">
                    <i class="iconfont icon-yanjing"></i>
                    <span>${item.view}</span>
                </div>
        </div>
    </li>`;
    });
    return str;
}

//锚点跳转
window.onload = function () {
    $('.ywjjmenu li a').click(function () {

        var index = $(".ywjjmenu li a").index($(this)) + 1;

        $('.yw_list li').eq(index).addClass('current').siblings().removeClass('current');

        $('.newslist').eq(index).addClass('current').siblings().removeClass('current');
    });
}
