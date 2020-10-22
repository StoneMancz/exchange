<template>
    <div class="chart">
        <div class="line_title fColor1">
            <span v-for="(item,index) in lineList" :class="{'active' :index==current}"  @click="changeCyle(index)">{{item}}</span>     
        </div>
        <div id="container" style="min-width:400px;height:510px"></div>
        <!-- <div>
		<iframe src="../../static/k_line/kline.html" frameborder="0" width="100%" height="540" allowfullscreen scrolling="no" allowtransparency="true"></iframe>
	</div> -->
    </div>
</template>

<script>
    export default {
        name: "chart",
        data (){
            return{
                lineList:["日","周","月"],
                current:0,
                address:'',
                kData:''
            }
        },
        created(){
            this.address = localStorage.getItem('address') || '';
        },
        methods: {
            changeCyle(index){
              var index=index;
              this.current=index;
        //       this.getData();
            },
            getData(){
                var that=this
                this.$http({
                        url:'https://data.jianshukeji.com/stock/history/000001',
                        method:'get',
                }).then(res=>{
                this.chartLine(res.data.data)
                })
            },
            chartLine(data){
                Highcharts.setOptions({
                lang: {
                        rangeSelectorZoom: ''
                }
                });
                data = data;
                var ohlc = [],
                volume = [],
                dataLength = data.length,
                // set the allowed units for data grouping
                groupingUnits = [[
                        'week',                         // unit name
                        [1]                             // allowed multiples
                ], [
                        'month',
                        [1, 2, 3, 4, 6]
                ]],
                i = 0;
                for (i; i < dataLength; i += 1) {
                        ohlc.push([
                                data[i][0], // the date
                                data[i][1], // open
                                data[i][2], // high
                                data[i][3], // low
                                data[i][4] // close
                        ]);
                        volume.push([
                                data[i][0], // the date
                                data[i][5] // the volume
                        ]);
                }
                // create the chart
                var chart = Highcharts.stockChart('container', {
                        rangeSelector: {
                                selected: 1,
                                inputDateFormat: '%Y-%m-%d'
                        },
                        title: {
                                text: '行情趋势图'
                        },
                        xAxis: {
                                dateTimeLabelFormats: {
                                        millisecond: '%H:%M:%S.%L',
                                        second: '%H:%M:%S',
                                        minute: '%H:%M',
                                        hour: '%H:%M',
                                        day: '%m-%d',
                                        week: '%m-%d',
                                        month: '%y-%m',
                                        year: '%Y'
                                }
                        },
                        tooltip: {
                                split: false,
                                shared: true,
                        },
                        yAxis: [{
                                labels: {
                                        align: 'right',
                                        x: -3
                                },
                                title: {
                                        text: '价格'
                                },
                                height: '65%',
                                resize: {
                                        enabled: true
                                },
                                lineWidth: 2
                        }, {
                                labels: {
                                        align: 'right',
                                        x: -3
                                },
                                title: {
                                        text: '成交量'
                                },
                                top: '65%',
                                height: '35%',
                                offset: 0,
                                lineWidth: 2
                        }],
                        series: [{
                                type: 'candlestick',
                                name: 'demo',
                                color: 'green',
                                lineColor: 'green',
                                upColor: 'red',
                                upLineColor: 'red',
                                tooltip: {
                                },
                                navigatorOptions: {
                                        color: Highcharts.getOptions().colors[0]
                                },
                                data: ohlc,
                                dataGrouping: {
                                        units: groupingUnits
                                },
                                id: 'sz'
                        },{
                                type: 'column',
                                data: volume,
                                yAxis: 1,
                                dataGrouping: {
                                        units: groupingUnits
                                }
                        }]
                });
            }
        },
        mounted(){
            this.getData();
        }
}
</script>

<style lang="scss" scoped>
.chart{
    width: 100%;
    .line_title{
        width: 100%;
        line-height: 30px;
        background: #1a243b;
        // padding-left: 30px;
        span{
            display: inline-block;
            width: 30px;
            text-align: center;
            margin-left: 20px;
            cursor: pointer;
        }
    }
    .highcharts-axis-resizer {
		        stroke: #eee;
    }
    .highcharts-axis-resizer:hover {
        stroke: #ccc;
    }
}
</style>





// WEBPACK FOOTER //
// src/view/chart.vue