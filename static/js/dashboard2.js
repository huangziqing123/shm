// 基于准备好的dom，初始化echarts实例
datanum = 2000;
var sensordata = [];
var myChart = echarts.init(document.getElementById('sensorfigure'), 'dark');
var fftmyChart = echarts.init(document.getElementById('fftfigure'), 'dark');
var selector_channel = document.getElementById('selector_channel');
var selector_sensor = document.getElementById('selector_sensor');
var channelinfo = [];
let nowchannelandsensor = {'channel': 0, 'sensor': 0};
var isfirstrun = true;

var option = {
    title: {
        text: 'RealTime'
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
    backgroundColor: '#0b376d',
    animation: false
};

var fftoption = {
    title: {
        text: 'FFT'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    xAxis:
        {
            axisLabel: {
                //interval: 100, //此处关键， 设置文本标签全部显示
                showMaxLabel: true //强制显示最后一个
            },
            scale: true,
            type: 'value',
            splitLine: {
                show: false
            },
        },
    yAxis: {

        type: 'value',
        scale: true,
        splitLine: {
            show: false
        }
    },
    dataZoom: {
        type: 'inside',
        start: 0,
        end: 100
    },
    series: [
        {
            name: 'Sensor1',
            visualMap: true,
            type: 'line',
            symbol: 'none',
            color: '#42947a',

        }
    ],
    backgroundColor: '#0b376d',
    animation: false
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
fftmyChart.setOption(fftoption);
fftmyChart.showLoading();
myChart.showLoading();
let waittingData = true;

function addData(newdata) {
    return new Promise(function () {
        //console.log(newdata);
        if (newdata['data_type'] === 'alarm') {
            for (let i = 0; i < newdata['data'].length; ++i) {
                let time = newdata['data'][i]['time'];
                let device = newdata['data'][i]['device'];
                let channel = newdata['data'][i]['channel'];
                let sensor = newdata['data'][i]['sensor'];
                let value = newdata['data'][i]['value'];
                alarmfigurepoint(channel, sensor, value, time);
            }
            return
        }

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
            fftmyChart.hideLoading();
            waittingData = false;
        }
        if (newdata['data_type'] === 'fft') {
            fftdata = [];
            for (let i = 0; i < newdata['x_data'].length; i++) {
                fftdata.push({
                    name: newdata['x_data'][i],
                    value: [
                        newdata['x_data'][i],
                        newdata['y_data'][i]
                    ]
                });
            }
            fftmyChart.setOption({
                series: [{
                    data: fftdata
                }]
            })
        } else if (newdata['data_type'] === "raw") {
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
        //清空数组
        sensordata = [];
        nowchannelandsensor = nowdata;
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
    waittingData = true;
    myChart.showLoading();
    fftmyChart.showLoading();

}

var ws;
getremotedata();

//window.WEB_SOCKET_SWF_LOCATION = '';
function getremotedata() {
    ws = new WebSocket("ws://si255:si255@"+document.domain+":8765");

    ws.onopen = function (evt) {
        myChart.hideLoading();
        fftmyChart.hideLoading();
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
        fftmyChart.showLoading();
        getremotedata();
        console.log("Connection closed.");
    };
}

function onclick_sample(val) {
    datanum = val;
    $("#inputsamplenum").val(val)
}

$("#inputsamplenum").val(datanum)

function onclick_start(val) {
    ws.send(JSON.stringify({
        'device_id': 'si255',
        'data_type': 'peak_data',
        'channel': parseInt($('#selector_channel_text').val()),
        'sensor': parseInt($('#selector_sensor_text').val()),
        'order': 'rt'
    }));
}

function onclick_stop(val) {
    ws.send(JSON.stringify({
        'device_id': 'si255',
        'data_type': 'peak_data',
        'channel': parseInt($('#selector_channel_text').val()),
        'sensor': parseInt($('#selector_sensor_text').val()),
        'order': 'stop'
    }));
}

$("#cb_autosatis").click(function () {
    if ($(this).prop("checked")) {
        $("#cb_autosatis").attr("checked", true);
        $(".boundgroup").hide();

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

        $(".boundgroup").show();

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

$('#inputsamplenum').keyup(function () {
    if (this.valueAsNumber.toString() === "NaN") {
        //alert(“请输入数字……”);
        // console.log('no')

    } else {
        //console.log(this.valueAsNumber);
        datanum = this.valueAsNumber;
    }


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

    function myresize() {

        //console.log(sensorfigure.clientWidth);
        if (tmp === sensorfigure.clientWidth) {
            if (count === 0) {
                //宽度持续一段时间没有变化，执行resize
                myChart.resize();
                fftmyChart.resize();
                imageChart.resize();
                cximageChart.resize();
                trainimgresize();
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

    setTimeout(myresize, 200);
}

var imageChart = echarts.init(document.getElementById('xfjfigure'), 'dark');
var imageoption = {
    grid: {
        left: 'center',
        top: 'center',
        width: 49,
        height: 36,
    },
    backgroundColor: '#1c222c',
    xAxis: {
        splitLine: {show: false},
        position: 'top',
        type: 'value',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            show: false
        },
        silent: true,
        min: 0,
        max: 499,
    },
    yAxis: {
        splitLine: {show: false},
        min: 0,
        max: 364,
        inverse: true,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            show: false
        },
    },
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            //console.log(JSON.stringify(params))
            if (params.data.hasOwnProperty('alarm')) {
                return '报警时间:' + params.data['alarm']['time'] + '<br>报警值:' + params.data['alarm']['value'] + '';
            }
            return '正常';

        },
    },
    series: [{
        name: 'sensorindex',
        symbolSize: 20,
        type: 'effectScatter',
        data: [
            {
                name: '温度',
                value: [499, 364],
                id: 123
            },
            {
                name: '震动',
                value: [49, 34],
                id: 122
            }
        ],
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke'
        },
        hoverAnimation: true,
        itemStyle: {
            color: '#3EACFF',
            shadowBlur: 5,
            shadowColor: '#333'
        },
        // markPoint: {
        //         data: [
        //             {type: 'max', name: '最大值'},
        //             {type: 'min', name: '最小值'}
        //         ]
        //     },
        label: {
            show: true,
            formatter: '{b}'
        },
        zlevel: 1
    }, {
        name: "bgp",
        type: 'pictorialBar',
        symbolPosition: 'center',
        //symbol: 'image://data:image/jpg;base64,' + "{{ base64_data}}",
        z: -10,
        silent: true,
        animate: false,
        data: [{
            value: [49 / 2, 34],
            symbolSize: [49, -34],
        }]
    },],
    backgroundColor: '#0b376d',
};

function figurepointclick(id) {

    for (let i = 0; i < xfjdata.length; ++i) {
        if (xfjdata[i]['id'] !== id) {
            if (xfjdata[i].hasOwnProperty('itemStyle') && xfjdata[i]['itemStyle']['color'] !== "#ff0011") {
                xfjdata[i]['itemStyle'] = {
                    color: '#3EACFF'
                }
            }
        } else {
            xfjdata[i]['itemStyle'] = {
                color: '#3e64ff'
            }
        }
    }
    imageChart.setOption({
        series: [{
            name: 'sensorindex',
            data: xfjdata,
        }]
    });
    for (let i = 0; i < cxdata.length; ++i) {
        if (cxdata[i]['id'] !== id) {
            if (cxdata[i].hasOwnProperty('itemStyle') && cxdata[i]['itemStyle']['color'] !== "#ff0011") {
                cxdata[i]['itemStyle'] = {
                    color: '#3EACFF',
                }
            }
        } else {
            cxdata[i]['itemStyle'] = {
                color: '#3e64ff'
            }
        }
    }
    cximageChart.setOption({
        series: [{
            name: 'sensorindex',
            data: cxdata,
        }]
    });
}

// 使用刚指定的配置项和数据显示图表。
let cximageoption = imageoption;
imageChart.setOption(imageoption);
imageChart.on('click', {seriesName: 'sensorindex',}, function (params) {
    //console.log(params.data['id']);
    figurepointclick(params.data['id']);
    ws.send(JSON.stringify({
        'device_id': 'si255',
        'data_type': 'peak_data',
        'channel': params.data['channel'],
        'sensor': params.data['sensor'],
        'order': 'rt'
    }));
    //清空数组
    sensordata = [];
    //myChart.resize();

    waittingData = true;
    myChart.showLoading();
    fftmyChart.showLoading();
});

var cximageChart = echarts.init(document.getElementById('cxfigure'), 'dark');


// 使用刚指定的配置项和数据显示图表。
cximageChart.setOption(cximageoption);
cximageChart.on('click', {seriesName: 'sensorindex',}, function (params) {
    //console.log(params);
    figurepointclick(params.data['id']);
    ws.send(JSON.stringify({
        'device_id': 'si255',
        'data_type': 'peak_data',
        'channel': params.data['channel'],
        'sensor': params.data['sensor'],
        'order': 'rt'
    }));
    //清空数组
    sensordata = [];
    //myChart.resize();

    waittingData = true;
    myChart.showLoading();
    fftmyChart.showLoading();
});

function alarmfigurepoint(channel, sensor, value, time) {

    for (let i = 0; i < xfjdata.length; ++i) {
        if (xfjdata[i]['channel'] === channel && xfjdata[i]['sensor'] === sensor) {
            let date = new Date(time);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            xfjdata[i]['alarm'] = {
                time: Y + M + D + h + m + s,
                value: value.toString()
            };
            xfjdata[i]['itemStyle'] = {
                color: '#ff0011'
            }
        }
    }
    imageChart.setOption({
        series: [{
            name: 'sensorindex',
            data: xfjdata,
        }]
    });
    for (let i = 0; i < cxdata.length; ++i) {
        if (cxdata[i]['channel'] === channel && xfjdata[i]['sensor'] === sensor) {
            let date = new Date(time);
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            cxdata[i]['alarm'] = {
                time: Y + M + D + h + m + s,
                value: value.toString()
            };
            cxdata[i]['itemStyle'] = {
                color: '#ff0011'
            };
        }
    }
    cximageChart.setOption({
        series: [{
            name: 'sensorindex',
            data: cxdata,
        }]
    });

}