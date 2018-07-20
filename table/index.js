(function($) {
    $.fn.magicTable = function(option) {
        $.fn.magicTable.option = {
            /* 浮动头部 */
            'magicTop': $('#J_MagicTableTop'),
            'magicLeft': $('#J_MagicTableLeft'),
            /* 可能有隐藏的，所以设定浮动头部的开始索引 */
            'leftIndex': 0,
            'leftFlg': false,
            /* 高度调整 */
            "thfix": 0,
            "thWidth": 0, //左边显示的宽度
            "thHeight": 0,
            "thTop": 0,
            "thLeft":0,
            "thLine": 0,
            "removeTotal": false,
        };
        var option = $.extend({}, $.fn.magicTable.option, option);
        
        return this.each(function() {
            $(this).css({'z-index': '9', 'display': '', 'position': 'relative'});

            /*复制活动的表格内容*/
            var leftHtml = '';
            var leftHtml2 = '';
            var leftFlg = option.leftFlg;
            var thWidth = option.thWidth;
            var thHeight = 0; //th的高度
            var thTop = option.thTop; //th距离浏览器顶部的top高度
            var thLeft = option.thLeft; //左侧未滚动时的left
            var removeTotal = option.removeTotal;//除去最后一行的汇总
            var flagLeftLength = 0; //左侧显示浮动层时的临界点
            
            //处理浮动的头部
            option.magicTop.html($(this).find('thead').clone()).css({
                'width': $(this).width()
            });

            var trLenght = $(this).find('>tbody>tr').length;
            if(removeTotal)
            {
                trLenght -= 1;
            }
            $(this).find('tr').each(function(i, item) {
                if (i == option.thLine){
                    thTop = thTop > 0 ? thTop : $(this).find('th:first').offset().top;
                    thHeight = $(this).height();  //包围th的tr的高度
                    thLeft = $(this).offset().left; //表格左侧是的left
                    flagLeftLength = $(this).find('th:eq(' + option.leftIndex + ')').offset().left; 
                    thWidth = flagLeftLength + $(this).find('th:eq(' + option.leftIndex + ')').outerWidth() - thLeft;
                } else if (i > option.thLine) {
                    if (leftFlg && (i <= trLenght)){
                        var tmpHtml = '';
                        for (var j = 0; j <= option.leftIndex; j++) {
                            tmpHtml += '<td style="height:' + $(this).find('td:eq(' + j + ')').height() + 'px;width:' + 
                                    $(this).find('td:eq(' + j + ')').innerWidth() + 'px">' + $(this).find('td:eq(' + j + ')').html() + '</td>';
                        }
                        leftHtml2 += '<tr>' + tmpHtml + '</tr>';
                    }
                    leftHtml = leftHtml + '<tr><td style="height:' + $(this).find('td:eq(' + option.leftIndex + ')').height() + 'px">' + 
                            $(this).find('td:eq(' + option.leftIndex + ')').html() + '</td><tr>';     
                }
            });

            if (leftFlg) {
                leftHtml = leftHtml2;
                option.magicLeft.html(leftHtml);
            }

            /*活动模块*/
            function moveSquare(){
                if ($(this).scrollTop() >= thTop){
                    option.magicTop.show().css({'z-index': '999', 'position': 'absolute', 'top': $(this).scrollTop() + option.thfix + 'px'});
                } else {
                    option.magicTop.css({'display': 'none'});
                }
                
                if ($(this).scrollLeft() >= thLeft + 1) {
                    option.magicLeft.show().css({
                        'z-index': '99', 
                        'position': 'absolute', 
                        'top': thTop + thHeight + 'px',
                        'left': $(this).scrollLeft() + 'px',
                        'width': thWidth + 'px',
                    });
                    if ($(this).scrollTop() >= thTop){
                        option.magicLeft.show().css({
                            'top': thTop + thHeight - option.thfix + 'px',
                        });
                    }
                } else {
                    option.magicLeft.css({'display': 'none'});
                }
            }
            
            if (document.all) {
                window.attachEvent("onscroll", moveSquare);
            } else {
                window.addEventListener('scroll', moveSquare, false);
            }

        });
    };

    $.fn.magicTable.setDefaults = function(settings) {
        $.extend($.fn.magicTable.option, settings);
    };
})(jQuery);