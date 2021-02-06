// 基于准备好的dom，初始化echarts实例
datanum = 1000;
var sensordata = [];
var myChart = echarts.init(document.getElementById('sensorfigure'));
var selector_channel = document.getElementById('selector_channel');
var selector_sensor = document.getElementById('selector_sensor');
var channelinfo = [];
let nowchannelandsensor = {'channel': 0, 'sensor': 0};
var isfirstrun = true;

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
            gt: 1555.574,
            color: '#941600',
        }, {
            lte: 1555.569,
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
                        yAxis: 1555.574,
                        lineStyle: {
                            color: '#42947a'
                        }
                    }, {
                        yAxis: 1555.569,
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
let waittingData = true;

function addData(newdata) {
    return new Promise(function () {
        //console.log(newdata);
        channelinfo = newdata['peak_counts'];
        if (isfirstrun) {
            //第一次运行生成通道标签
            insert_channel_option();
            isfirstrun = false;
        }
        //检查通道的值，并生成传感器标签
        checkchanneltag(newdata['data_req']);
        if (waittingData) {
            myChart.hideLoading();
            waittingData = false;
        }
        if (newdata['data_type'] === "raw") {
            if (sensordata.length + newdata['x_data'].length > datanum) {
                sensordata.splice(0, sensordata.length + newdata['x_data'].length - datanum);
            }
            for (let i = 0; i < newdata['x_data'].length; i++) {
                sensordata.push({
                    name: newdata['x_data'][i],
                    value: [
                        newdata['x_data'][i],
                        newdata['y_data'][i]
                    ]
                });
            }
            myChart.setOption({
                series: [{
                    data: sensordata
                }]
            })

        }
    })
}

function insert_channel_option() {
    //var len = Number(selector_channel.childElementCount);
    //var alloptions = selector_channel.children;
    // for (let i = 0; i < len; i++) {
    //     console.log(alloptions[i].value);
    //     console.log(alloptions[i].text);
    // }

    //setshow
    let innerHTML = "";
    //$("#selector_channel").empty();
    //$("#selector_channel").removeAttr("display");
    for (let j = 0, len = channelinfo.length; j < len; j++) {
        if (channelinfo[j] !== 0) {
            innerHTML += "<button class=\"dropdown-item\" onclick=\"onclick_channel(this.value)\" value="
                + j + ">Channel" + (j + 1) + "</button>"
        }
    }
    selector_channel.innerHTML = innerHTML;
    //$('#selector_channel').dropdown();
}

function checkchanneltag(nowdata) {

    if (nowdata['channel'] !== nowchannelandsensor['channel'] ||
        nowdata['sensor'] !== nowchannelandsensor['sensor']) {
        nowchannelandsensor = nowdata;
        console.log(nowchannelandsensor);
        $('#selector_sensor_text').removeAttr('disabled');
        $('#selector_channel_text').removeAttr('disabled');

        $('#selector_channel_text').text('Channel' + (nowchannelandsensor['channel'] + 1));
        $('#selector_channel_text').val(parseInt(nowchannelandsensor['channel']));

        let innerHTML = "";
        for (let j = 1; j <= channelinfo[nowchannelandsensor['channel']]; ++j) {
            innerHTML += "<button class=\"dropdown-item\" onclick=\"onclick_sensor(this.value)\" value="
                + (j - 1) + ">Sensor" + j + "</button>"
        }
        selector_sensor.innerHTML = innerHTML;
        $('#selector_sensor_text').text('Sensor' + (nowchannelandsensor['sensor'] + 1));
        $('#selector_sensor_text').val(parseInt(nowchannelandsensor['sensor']));
    }
}

function onclick_channel(val) {
    //console.log(val);
    // let innerHTML = "";
    // for (let j = 1; j <= channelinfo[val]; ++j) {
    //     innerHTML += "<button class=\"dropdown-item\" onclick=\"onclick_sensor(this.value)\" value="
    //         + (j - 1) + ">传感器" + j + "</button>"
    //
    // }
    // selector_sensor.innerHTML = innerHTML;
    if ($('#selector_channel_text').val() === val) {
        return;
    }

    $('#selector_channel_text').html('<i class="fa fa-spinner fa-spin"></i>Loading');
    $('#selector_channel_text').attr('disabled', 'disabled');
    $('#selector_channel_text').val(parseInt(val));
    onclick_sensor(0)
}

function onclick_sensor(val) {
    //console.log(val);
    // console.log(JSON.stringify({
    //     'channel': parseInt($('#selector_channel_text').val()),
    //     'sensor': parseInt(val)
    // }));
    if ($('#selector_sensor_text').val() === val) {
        return;
    }
    $('#selector_sensor_text').html('<i class="fa fa-spinner fa-spin"></i>Loading');
    $('#selector_sensor_text').attr('disabled', 'disabled');
    console.log(JSON.stringify({
        'device_id': 'si255',
        'data_type': 'peak_data',
        'channel': parseInt($('#selector_channel_text').val()),
        'sensor': parseInt(val),
        'order': 'rt'
    }));
    ws.send(JSON.stringify({
        'device_id': 'si255',
        'data_type': 'peak_data',
        'channel': parseInt($('#selector_channel_text').val()),
        'sensor': parseInt(val),
        'order': 'rt'
    }));
    //清空数组
    sensordata.splice(0, sensordata.length);
    //myChart.resize();

    waittingData = true;
    myChart.showLoading();

}

var ws;
getremotedata();

//window.WEB_SOCKET_SWF_LOCATION = '';
function getremotedata() {
    ws = new WebSocket("ws://si255:si255@"+ window.location.hostname +":8765");

    ws.onopen = function (evt) {
        myChart.hideLoading();
        console.log("Connection open ...");
        //ws.send("Hello WebSockets!");
    };

    ws.onmessage = async function (evt) {
        //console.log("Received Message: " + evt.data);

        info = JSON.parse(evt.data);
        await addData(info);
    };

    ws.onclose = function (evt) {
        myChart.showLoading();
        getremotedata();
        console.log("Connection closed.");
    };
}

$("#cb_autosatis").click(function () {
    if ($(this).prop("checked")) {
        $("#cb_autosatis").attr("checked", true);
        $(".input-group").hide();

        // $("#spanautosatismax").hide();
        // $("#spanautosatismin").hide();
        // $("#inputautosatismax").hide();
        // $("#inputautosatismin").hide();
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

        $(".input-group").show();

        // $("#spanautosatismax").show();
        // $("#spanautosatismin").show();
        // $("#inputautosatismax").show();
        // $("#inputautosatismin").show();
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
