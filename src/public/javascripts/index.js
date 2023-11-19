

var dom = document.getElementById('container');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};
var option;
const dataCount = 5e5;
let datay = [];
let datax = [];
let chrName = "";
let listArr = [];
let min_g = 0;
let max_g = 0;
let reportingId;
//getButt(butArr);


$("#chr_number_select").change(() => {
    $.ajax({
        type: "get",
        url: "/gene-reporting-data/findGeneReportingDataMaxMinChrNumber",
        data: {
            geneReportingId: reportingId,
            chrType: $("#chr_number_select").val()
        },
        success: (data) => {
            console.log(data)

            let min = data.data[0]._min.chrStart;
            let max = data.data[0]._max.chrEnd;
            min_g = min;
            max_g = max;
            $("#input_min").val(min);
            $("#input_max").val(max);
            let string = `position数值应处于${min}~${max}之间`;
            $("#value_interval_div").text(string)
            getChrInfo(reportingId, $("#chr_number_select").val(), min, max)
        }
    })
})

$("#chr_reporting").change(()=>{
    $.ajax({
        type: "get",
        url: "/gene-reporting-data/chartDataInitByGeneReportingName",
        data: {
            reportingName:$('#chr_reporting').val()
        },
        success: (data) => {
            $("#chr_number_select").empty();
            $("#input_max").val("")
            $("#input_min").val("")
            $("#value_interval_div").text("")

            const initMinValue = data.data.resultFindMaxMinValue[0]._min.chrStart
            const initMaxValue = data.data.resultFindMaxMinValue[0]._max.chrEnd
            reportingId = data.data.reportingId;
            min_g = initMinValue;
            max_g = initMaxValue;
    
            let string = `position数值应处于${initMinValue}~${initMaxValue}之间`;
    

            for (let i = 0; i < data.data.resultFindChrTypeByReportingId.length; i++) {
                console.log(data.data.resultFindChrTypeByReportingId[i])
                var myOption = document.createElement("option");
                myOption.innerHTML = data.data.resultFindChrTypeByReportingId[i].chrType;
                myOption.id = data.data.resultFindChrTypeByReportingId[i].chrType + "_opt";
                myOption.disabled = false;
                myOption.className = "Chr_opt"
                document.getElementById("chr_number_select").appendChild(myOption)
            }
            $("#input_min").val(initMinValue);
            $("#input_max").val(initMaxValue);
            $("#value_interval_div").text(string)
            getChrInfo(reportingId, $("#chr_number_select").val(), initMinValue, initMaxValue)
    

        }
    })
})

function getChrInfo(geneReportingId, chrType, minChrNumber, maxChrNumber) {

    $.ajax({
        type: "get",
        url: "/gene-reporting-data/findGeneReportingDataByChrRange",
        data: {
            chrType: chrType,
            geneReportingId: geneReportingId,
            minChrNumber: minChrNumber,
            maxChrNumber: maxChrNumber

        },
        contentType: "application/json",
        dataType: "json",
        success: (data) => {
            datax = data.data.datax;
            datay = data.data.datay;
            bar(datax, datay)

        }
    })
}


function getChrNameButt(butArr) {
    for (let i = 0; i < butArr.length; i++) {
        var myButton = document.createElement("button");
        myButton.innerHTML = butArr[i];
        myButton.id = butArr[i] + "_but"
        myButton.disabled = false;
        myButton.className = "ChrName_but";
        document.getElementById("but_div").appendChild(myButton)
        $('#' + myButton.id).click(() => {

            chrName = butArr[i];
            $("#chr_number_select").empty();
            $("#input_max").val("")
            $("#input_min").val("")
            $("#value_interval_div").text("")
            $.ajax({
                type: "get",
                url: "/getChrNumber",
                data: {
                    chrName: butArr[i]
                },
                contentType: "application/json",
                dataType: "json",
                success: (data) => {


                    for (let i = 0; i < data.length; i++) {

                        var myOption = document.createElement("option");
                        myOption.innerHTML = data[i].chr_number;
                        myOption.id = data[i].chr_number + "_opt";
                        myOption.disabled = false;
                        myOption.className = "Chr_opt"
                        document.getElementById("chr_number_select").appendChild(myOption)
                    }

                }
            })
        })
    }
}



function getButt(butArr) {
    for (let i = 0; i < butArr.length; i++) {
        var myButton = document.createElement("button");
        myButton.innerHTML = butArr[i] + "test";
        myButton.id = butArr[i] + "_but"
        myButton.disabled = false;
        myButton.className = "Chr_but";
        document.getElementById("but_div").appendChild(myButton)
        $('#' + myButton.id).click(() => {
            datay = [];
            datax = [];
            for (let j = 0; j < 5; j++) {
                datay.push(Math.random() * 10)
                datax.push(Math.random() * 10)
            }
            bar(datax, datay)
        })
    }
}



//页面初始化
$.ajax({
    type: "get",
    url: "/gene-reporting-data/chartDataInit",
    data: {},
    contentType: "application/json",
    dataType: "json",
    success: (data) => {
        $("#chr_reporting").empty();
        $("#chr_number_select").empty();
        $("#input_max").val("")
        $("#input_min").val("")
        $("#value_interval_div").text("")
        const dataKeysArr = Object.keys(data.data);
        console.log(data)
        if(dataKeysArr.length === 0){
            alert("暂无任何报告,请先上传!")
            return
        }

        const initMinValue = data.data.resultFindMaxMinValue[0]._min.chrStart
        const initMaxValue = data.data.resultFindMaxMinValue[0]._max.chrEnd
        reportingId = data.data.resultFindFirstReporting[0].id;
        min_g = initMinValue;
        max_g = initMaxValue;

        let string = `position数值应处于${initMinValue}~${initMaxValue}之间`;

        for (let i = 0; i < data.data.resultFindFirstReporting.length; i++) {

            console.log(data.data.resultFindFirstReporting[i])
            var myOption = document.createElement("option");
            myOption.innerHTML = data.data.resultFindFirstReporting[i].reportingName;
            myOption.id = data.data.resultFindFirstReporting[i].reportingName + "_opt";
            myOption.disabled = false;
            myOption.className = "Chr_reporting_opt"
            document.getElementById("chr_reporting").appendChild(myOption)
        }
        for (let i = 0; i < data.data.resultFindChrTypeByReportingId.length; i++) {
            console.log(data.data.resultFindChrTypeByReportingId[i])
            var myOption = document.createElement("option");
            myOption.innerHTML = data.data.resultFindChrTypeByReportingId[i].chrType;
            myOption.id = data.data.resultFindChrTypeByReportingId[i].chrType + "_opt";
            myOption.disabled = false;
            myOption.className = "Chr_opt"
            document.getElementById("chr_number_select").appendChild(myOption)
        }
        $("#input_min").val(initMinValue);
        $("#input_max").val(initMaxValue);
        $("#value_interval_div").text(string)
        getChrInfo(data.data.resultFindFirstReporting[0].id, $("#chr_number_select").val(), initMinValue, initMaxValue)

        //getChrNameButt(ChrNameButArr);
    }
})

$("#search").click(() => {

    let geneReportingId = reportingId;
    let chrType = $("#chr_number_select").val();
    let minChrNumber = $("#input_min").val();
    let maxChrNumber = $("#input_max").val();
    if (isNaN(minChrNumber) && isNaN(chr_end)) {
        alert("注意：搜索的positon或者position_s不为数字")
        return
    }
    if (minChrNumber < min_g) {
        alert("搜索的数值不在position该有的范围内")
        return
    }
    if (maxChrNumber > max_g) {
        alert("搜索的数值不在position该有的范围内")
        return
    }
    if (maxChrNumber < minChrNumber) {
        alert("positon值应当小于positon_s值")
        return
    }

    getChrInfo(geneReportingId, chrType, minChrNumber, maxChrNumber)

})





/**
 * @desc 得到柱状图
 * @param1 datax：数组，柱状图x轴数值。
 * @param2 datay：数组，柱状图y轴数值。
*/
function bar(datax, datay) {
    option = {
        title: {
            //text: echarts.format.addCommas(dataCount) + ' Data',
            left: 10
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            bottom: 90
        },
        dataZoom: [
            {
                type: 'inside'
            },
            {
                type: 'slider'
            }
        ],
        xAxis: {
            data: datax,
            silent: false,
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        },
        yAxis: {
            splitArea: {
                show: false
            }
        },
        barWidth: '100%',
        series: [
            {
                type: 'bar',
                data: datay,
                // Set `large` for large data amount
                large: true
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }
}

bar([], [])

$('form').submit(() => {
    event.preventDefault();

    var file = $('input[type=file]')[0].files[0];
    if (!file) {
        alert("请选择文件!");
        return
    }

    var formData = new FormData();
    formData.append("file", file);

    $.ajax({
        url: '/upload/gene-reporting',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: () => {
            alert('上传成功!')
        },
        error: (xhr, status, error) => {
            const msg = xhr.responseJSON.message
            alert('上传失败:' + msg)
        }

    })
})


window.addEventListener('resize', myChart.resize);