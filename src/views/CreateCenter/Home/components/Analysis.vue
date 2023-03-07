<script setup lang='ts'>
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;
const main = ref()

onMounted(() => {
  init()
})

const init = () => {
  var myChart = echarts.init(main.value);
  var option: EChartsOption;
  option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220, 50, 255, 101, 153, 120]
    }
  ]
};

  option && myChart.setOption(option);
}



</script>

<template>
  <div ref="main" style="width: 100%; height: 100%">

  </div>
</template>

<style lang='scss' scoped></style>