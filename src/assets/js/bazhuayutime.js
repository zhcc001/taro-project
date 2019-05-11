
$(function(){
    var myDateChu = new Date();
    var myMonthChu=myDateChu.getMonth()+1
    var myDayChu=myDateChu.getDate()
    var myWeekChu=myDateChu.getDay()
$.extend({
    dateToolInit: function (opt) {
        this.monthMun = 12;
        $.getIdate();
    },
    getIdate: function () {
        var idate = $('<div id="component"><div>');
        idate.append($.getDatesStr());
        $('body').append(idate);
    },
    getHeaderStr: function () {
        return str = '<div data-reactroot="">' +
            '<div class="animate-init">' +
            '<div class="calendar-page ">' +
            '<div class="m-calendar ">' +
            '<header class="page-header ">' +
            '<div class="left-action ">' +
            '<div class="left-btn" onclick="$.backpage()">×</div>' +
            '</div>' +
            '<div class="page-title">选择日期</div>' +
            '</header>' +
            '<div class="calendar-content" id="calendar-content">';
    },
    getDatesStr: function () {
        var str = $.getHeaderStr();
        for (var i = 0; i < this.monthMun; i++) {
            str += '<div class="calender-month"><div class="calendar-month-title" id="month-' + $.getNewmonth(i).split('-')[0] + '-' + $.getNewmonth(i).split('-')[1] + '">' +
                $.getNewmonth(i).split('-')[0] + '年' + parseInt($.getNewmonth(i).split('-')[1]) + '月' + '</div>';
            str += $.getWeekStr();
            str += $.getCalendarday($.getNewmonth(i));
        }
        return str + $.getFooterStr();
    },
    getWeekStr: function () {
        return str = '<ul class="calendar-date-bar">' +
            '<li class="dates-item">日</li>' +
            '<li class="dates-item">一</li>' +
            '<li class="dates-item">二</li>' +
            '<li class="dates-item">三</li>' +
            '<li class="dates-item">四</li>' +
            '<li class="dates-item">五</li>' +
            '<li class="dates-item">六</li>' +
            '</ul>';
    },
    getFooterStr: function () {
        return str = '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    },
    getNewmonth: function (num) {
        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = num + myDate.getMonth() + 1;
        var monthStr = myDate.getMonth() + 1;
        if (month > 12) {
            year++;
        }
        if (month === 12) {
            monthStr = 12;
        } else {
            monthStr = month % 12;
        }
        monthStr = (monthStr < 10 ? "0" + monthStr : monthStr);
        return year + '-' + monthStr;
    },
    getWeek: function (opt) {
        var week = new Date(opt.replace("-", "/")).getDay();
        return week;
    },
    getDaysInOneMonth: function (opt) {
        var d = new Date(parseInt(opt.split('-')[0]), parseInt(opt.split('-')[1]), 0);
        return d.getDate();
    },
    getCalendarday: function (opt) {
        var str = '';
        var week = $.getWeek(opt + '-' + 1);
        var daynum = $.getDaysInOneMonth(opt);
        var count = 0;
        var day = 0;
        for (var i = 0; i < daynum + week; i++) {
            if (i % 7 === 0) {
                str += '<div class="calendar-week">';
            }
            if (i < week) {
                str += '<div class="calendar-day" data-date=""></div>';
                count++;
            } else {
                day = i - week + 1;
                day = (day < 10 ? "0" + day : day);
                if ($.isDay(opt + '-' + day) === 1) {
                    str += '<div class="calendar-day trust-day" data-date="' + opt + '-' + day + '" data-type="day" onclick="$.selectday(this)"><span class="day">' + parseInt(day) + '</span></div>'
                } else if ($.isDay(opt + '-' + day) === 0) {
                    str += '<div class="calendar-day disable-day trust-day" data-date="' + opt + '-' + day + '" data-type="disableDay"><span class="day">' + parseInt(day) + '</span></div>';
                } else {
                    str += '<div class="calendar-day trust-day" data-date="' + opt + '-' + day + '" data-type="day" onclick="$.selectday(this)"><span class="day">今天</span></div>'
                }
                count++;
                if (i === (daynum + week - 1) && count < 7) {
                    for (var j = 0; j < (7 - count); j++) {
                        str += '<div class="calendar-day" data-date=""></div>';
                    }
                    str += '</div>';
                }
            }
            if (count % 7 === 0) {
                str += '</div>';
                count = 0;
            }
        }
        str += '</div>';
        return str;
    },
    getNewday: function () {
        var myDate = new Date();
        var month = 1;
        var day = 1;
        month = myDate.getMonth() + 1;
        month = (month < 10 ? "0" + month : month);
        day = myDate.getDate();
        day = (day < 10 ? "0" + day : day);
        return myDate.getFullYear() + '-' + month + '-' + day;
    },
    isDay: function (opt) {
        var stdt = new Date(opt.replace("-", "/"));
        var etdt = new Date($.getNewday().replace("-", "/"));
        if ($.getNewday() === opt) {
            return 2;
        } else {
            if (stdt > etdt) {
                return 1;
            } else {
                return 0;
            }
        }
    },
    
    selectday: function (_this) {
        var riQi=$(_this)[0].dataset.date
        var dataDateText=`${parseInt(riQi[1])}月${parseInt(riQi[2])}日`
        if(riQi.length>2){
            riQi=$(_this)[0].dataset.date.split('-')
            dataDateText=`${parseInt(riQi[1])}月${parseInt(riQi[2])}日`
            console.log(234)
            console.log(riQi.length)
        }
        if(riQi.length==1){
            dataDateText=riQi[0]
            console.log(123)
        }
        if (iDateTriptype === '1') {
            $(".trust-day").removeClass('select-single-day');
            $(_this).addClass('select-single-day');
            $('.animate-init').removeClass('animate-start');
            console.log($(_this).attr('data-date',dataDateText))
            startDate.val($(_this).attr('data-date'));
        } else {
            if (startDate.val() === '') {
                $(".trust-day").removeClass('select-single-day');
                $(_this).addClass('select-go-day');
                startDate.val($(_this).attr('data-date'));
            } else {
                if ($.backselectday($(_this).attr('data-date'))) {
                    $(".trust-day").removeClass('select-back-day');
                    $(_this).addClass('select-back-day');
                    endtDate.val($(_this).attr('data-date'));
                    $('.animate-init').removeClass('animate-start');
                } else {
                    $(".trust-day").removeClass('select-go-day');
                    $(_this).addClass('select-go-day');
                    startDate.val($(_this).attr('data-date'));
                    $.compareDate();
                }
            }
        }
        var myWeekDay=new Date(parseInt(riQi[0]),parseInt(riQi[1])-1,parseInt(riQi[2])).getDay()
        if(myWeekDay==1){
            $('#dayNum').html('周一')
          }else if(myWeekDay==2){
            $('#dayNum').html('周二')
          }else if(myWeekDay==3){
            $('#dayNum').html('周三')
          }else if(myWeekDay==4){
            $('#dayNum').html('周四')
          }else if(myWeekDay==5){
            $('#dayNum').html('周五')
          }else if(myWeekDay==6){
            $('#dayNum').html('周六')
          }else if(myWeekDay==0){
            $('#dayNum').html('周日')
          }
        
    },
    backselectday: function (opt) {
        var stdt = new Date(startDate.val().replace("-", "/"));
        var middlet = new Date(opt.replace("-", "/"));
        if (stdt > middlet) {
            return false;
        } else {
            return true;
        }
    },
    compareDate: function () {
        $(".trust-day").removeClass('select-go-day');
        $(".trust-day").removeClass('during-day');
        $(".trust-day").removeClass('select-back-day');
        $(".trust-day").removeClass('select-single-day');
        var stdt = new Date(startDate.val().replace("-", "/"));
        var etdt = new Date(endtDate.val().replace("-", "/"))
        $(".trust-day").each(function () {
            var middlet = new Date($(this).attr('data-date').replace("-", "/"))
            if ($(this).attr('data-date') === startDate.val()) {
                if (iDateTriptype === '1') {
                    $(this).addClass('select-single-day');
                } else {
                    $(this).addClass('select-go-day');
                }
            } else if ($(this).attr('data-date') === endtDate.val()) {
                $(this).addClass('select-back-day');
            } else if (middlet > stdt && etdt > middlet) {
                $(this).addClass('during-day');
            }
        });
    },
    backpage: function () {
        $('.animate-init').removeClass('animate-start');
    }
});
var iDateTriptype = '1';//默认单程
var endtDate = $('#endtDate');
var startDate = $('#startDate');
if(myWeekChu==1){
    $('#dayNum').html('周一')
  }else if(myWeekChu==2){
    $('#dayNum').html('周二')
  }else if(myWeekChu==3){
    $('#dayNum').html('周三')
  }else if(myWeekChu==4){
    $('#dayNum').html('周四')
  }else if(myWeekChu==5){
    $('#dayNum').html('周五')
  }else if(myWeekChu==6){
    $('#dayNum').html('周六')
  }else if(myWeekChu==0){
    $('#dayNum').html('周日')
  }
$('.Trip_type').on('click', function () {
    iDateTriptype = $(this).attr('datatype');
    $('.Trip_type').css({
        'color': '#888'
    });
    $(this).css({
        'color': '#4373e8'
    });
    $('#endtDate').val('');
});
startDate.on('click', function () {
    console.log('startData')
    $('.animate-init').addClass('animate-start');
    $.compareDate();
});
endtDate.on('click', function () {
    if (iDateTriptype === '1') {
        return;
    }
    $.compareDate();
    $('.animate-init').addClass('animate-start');
});
$.dateToolInit()
})