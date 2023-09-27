<template>
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel
        v-for="(data, index) in ancient.data[props.num]"
        :key="index"
        :header="data.name"
        :style="customStyle"
      >
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ data.content }} <SoundFilled @click="sayText()" style="color:rgb(67, 204, 238)" /></p>
      </a-collapse-panel>
    </a-collapse>
  </template>
  
  <script setup>
  import data from '../data.js'
  
  const activeKey = ref(['0']);
  
  const props = defineProps({
    num:{
      type:Number
    },
    menuKey:Number
  })
  
  const customStyle = "text-align: left;"
  
  const ancient = reactive({
    data: data.map(item=>item.data)[props.menuKey].map(item=>item.article)
  });
  
  const sayText = ()=>{
    message.warning('朗诵要钱啊，哥！')
  }
  
  </script>
  
  <style>
  </style>