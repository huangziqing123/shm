// 基于准备好的dom，初始化echarts实例
var sensordata = [];
var myChart = echarts.init(document.getElementById('sensorfigure'));
var selector_sensor = document.getElementById('selector_sensor');
var channelinfo = [];
let nowchannelandsensor = {'channel': -1, 'sensor': -1};
let hasclick_sdateonce = false;
let hasclick_edateonce = false;


var option = {
    title: {
        text: 'SI255'
    },
    tooltip: {
        trigger: 'axis',
        // formatter: function (params) {
        //      params = params[0];
        //      var date = new Date(params.name);
        //      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        //  },
        axisPointer: {
            animation: false
        }
    },
    // legend: {
    //     data: ['Sensor1']
    // },
    xAxis:
        {
            axisLabel: {
                //interval: 100, //此处关键， 设置文本标签全部显示
                showMaxLabel: true //强制显示最后一个
            },
            type: 'time',
            //boundaryGap: false,
            //data: xdata,

        },
    yAxis: {

        type: 'value',
        scale: true,
        //boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    dataZoom: {
        type: 'inside',
        start: 0,
        end: 100
    },
    visualMap: [{
        type: 'piecewise',

        pieces: [{
            gt: 1555.8,
            color: '#941600',
        }, {
            lte: 1555.2,
            color: '#42947a'
        }],
        outOfRange: {
            color: '#9fa4a9'
        },
        show: false
    }],
    series: [
        {
            name: 'Sensor1',
            visualMap: true,
            type: 'line',
            symbol: 'none',
            markLine: {
                silent: false,
                lineStyle: {
                    type: 'dashed',
                },
                symbol: 'circle',
                data: [
                    {
                        yAxis: 1555.2,
                        lineStyle: {
                            color: '#42947a'
                        }
                    }, {
                        yAxis: 1555.8,
                        lineStyle: {
                            color: '#941600'
                        }
                    }
                ]

            },

        }
    ],

    animation: false
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

myChart.showLoading();
$('#sensorfigure').hide();
let waittingData = true;

function addData(newdata) {
    return new Promise(function () {
        if (waittingData) {
            myChart.hideLoading();
            waittingData = false;
        }

        if(newdata.length === 0){
            myChart.setOption({
            series: [{
                data: []
            }]
        });
            console.log('空数组');
            return;
        }


        sensordata.splice(0, sensordata.length);
        //console.log(newdata);

        for (let i = 0; i < newdata.length; i++) {
            sensordata.push({
                name: newdata[i]['time']*1000 ,
                value: [
                    newdata[i]['time']*1000 ,
                    newdata[i]['data']
                ]
            });
        }

        channelinfo = newdata[0]['peak_counts'];
        myChart.setOption({
            series: [{
                data: sensordata
            }]
        })

    })
}


function onclick_channel(val) {
    $('#selector_channel_text').text('channel' +(parseInt(val)+1));
    $('#selector_channel_text').val(parseInt(val));
}

function showerror(str) {
    $('#btnexecute').attr("data-trigger", "focus");
    $('#btnexecute').attr("data-original-title", "Error");
    $('#btnexecute').attr('data-content', str);
    $('#btnexecute').popover('show');
}

function click_execute() {
    if (!hasclick_sdateonce || !hasclick_edateonce) {
        showerror('You forget to chosse datetime!');
        return;
    }
    let starttime = parseInt( moment($('#input_startdatetime').val(),'YYYY/MM/DD HH:mm:ss.SSS').valueOf());
        // $('#startdatetimepicker').datetimepicker('viewDate').valueOf();
    let endtime = parseInt( moment($('#input_enddatetime').val(),'YYYY/MM/DD HH:mm:ss.SSS').valueOf());

    let sensorid = $('#input_sensorid').val();
    if(sensorid<0 || parseInt(sensorid).toString() !== sensorid.toString()){
        showerror('sensorid must greater than zero or integer!');
        return;
    }
    sensorid -=1 ;

    let channelid = parseInt( $('#selector_channel_text').val());
    if(channelid < 0 || channelid >= 16){
        showerror('Please chooose a channel!');
        return;
    }
    $('#sensorfigure').show();
    sensordata.splice(0, sensordata.length);
    mypost(JSON.stringify({
        "device_id": "si255",
        "data_type": "peak_data",
        "channel": channelid,
        "sensor": sensorid,
        "datatime": [
            starttime ,
            endtime
        ]
    }));
    waittingData = true;
    myChart.showLoading();
}


$("#cb_autosatis").click(function () {
    if ($(this).prop("checked")) {
        $("#cb_autosatis").attr("checked", true);
        //$(".input-group").hide();

         $("#spanautosatismax").hide();
         $("#spanautosatismin").hide();
         $("#inputautosatismax").hide();
         $("#inputautosatismin").hide();
        myChart.setOption({
            yAxis: {

                type: 'value',
                scale: true,
                //boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                max: null,
                min: null,
            }
        });

    } else {
        $("#cb_autosatis").attr("checked", false);

        //$(".input-group").show();

        $("#spanautosatismax").show();
        $("#spanautosatismin").show();
        $("#inputautosatismax").show();
        $("#inputautosatismin").show();
        let min = 0;
        let max = 0;
        if (parseFloat($("#inputautosatismin").val()).toString() === "NaN") {
            //alert(“请输入数字……”);
            //console.log('no')
            return
        } else {
            //console.log($("#inputautosatismin").val());
            min = $("#inputautosatismin").val();
        }
        if (parseFloat($("#inputautosatismax").val()).toString() === "NaN") {
            //alert(“请输入数字……”);
            //console.log('no')
            return
        } else {
            //console.log($("#inputautosatismax").val());
            max = $("#inputautosatismax").val();
        }

        myChart.setOption({
            yAxis: {
                max: max,
                min: min,
                scale: false
            }
        });

    }
});

$('#inputautosatismax').keyup(function () {
    let min = 0;
    let max = 0;
    if (this.valueAsNumber.toString() === "NaN") {
        //alert(“请输入数字……”);
        // console.log('no')
        return
    } else {
        //console.log(this.valueAsNumber);
        max = this.valueAsNumber;
    }
    //console.log($("#inputautosatismin").val());
    if (parseFloat($("#inputautosatismin").val()).toString() === "NaN") {
        //alert(“请输入数字……”);
        //console.log('no')
        return
    } else {
        //console.log($("#inputautosatismin").val());
        min = $("#inputautosatismin").val();
    }

    myChart.setOption({
        yAxis: {
            max: max,
            min: min,
            scale: false
        }
    });

});
$('#inputautosatismin').keyup(function () {
    let min = 0;
    let max = 0;
    if (this.valueAsNumber.toString() === "NaN") {
        //alert(“请输入数字……”);
        //console.log('no')
        return
    } else {
        //console.log(this.valueAsNumber);
        min = this.valueAsNumber;
    }
    //console.log($("#inputautosatismax").val());
    if (parseFloat($("#inputautosatismax").val()).toString() === "NaN") {
        //alert(“请输入数字……”);
        //console.log('no')
        return
    } else {
        //console.log($("#inputautosatismax").val());
        max = $("#inputautosatismax").val();
    }

    myChart.setOption({
        yAxis: {
            max: max,
            min: min,
            scale: false
        }
    });
});

window.onresize = function () {
    Myresize();
};

function Myresize() {
    let sensorfigure = document.getElementById('sensorfigure');
    let tmp = sensorfigure.clientWidth;
    let count = 5;

    //console.log('start*********************');

    function myresize() {

        //console.log(sensorfigure.clientWidth);
        if (tmp === sensorfigure.clientWidth) {
            if (count === 0) {
                //宽度持续一段时间没有变化，执行resize
                myChart.resize();
                // console.log('end');
            } else {
                //等待一段时间观察宽度有没有变化
                count--;
                setTimeout(myresize, 10);
            }

        } else {
            //宽度有变化，检查一下是不是已经不变的宽度了
            count = 5;
            tmp = sensorfigure.clientWidth;
            setTimeout(myresize, 1);
        }
    }

    setTimeout(myresize, 100);
}

$(function () {
    $('#startdatetimepicker').datetimepicker({
        todayHighlight: true,
        format: 'YYYY/MM/DD HH:mm:ss.SSS',
        orientation: 'bottom right',
        sideBySide: true,
        allowInputToggle: true,
        focusOnShow: true,
        autofocus: true,
        buttons: {
            showToday: false,
            showClear: false,
            showClose: false
        }
    });
});
$(function () {
    $('#enddatetimepicker').datetimepicker({
        todayHighlight: true,
        format: 'YYYY/MM/DD HH:mm:ss.SSS',
        orientation: 'bottom right',
        sideBySide: true,
        allowInputToggle: true,
        focusOnShow: true,
        autofocus: true,
        buttons: {
            showToday: false,
            showClear: false,
            showClose: false
        }
    });
});
$("#startdatetimepicker").on("change.datetimepicker", function (e) {
    hasclick_sdateonce = true;
    $('#enddatetimepicker').datetimepicker('minDate', e.date);
});
$("#enddatetimepicker").on("change.datetimepicker", function (e) {
    hasclick_edateonce = true;
    $('#startdatetimepicker').datetimepicker('maxDate', e.date);
});

$('#btnexecute').blur(function () {
    $('#btnexecute').removeAttr("data-original-title");
    $('#btnexecute').removeAttr('data-content');
    $('#btnexecute').popover('dispose');
});

// $('#input_startdatetime').blur(function () {
//     console.log(moment($('#input_startdatetime').val()).valueOf());
//      $('#startdatetimepicker').datetimepicker('viewDate').unix();
// });
//
// $('#input_enddatetime').blur(function () {
//     $('#input_enddatetime').val();
// });
// $('#startdatetimepicker').datetimepicker.val(1318781876);


