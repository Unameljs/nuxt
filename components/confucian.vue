<template>
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel
        v-for="(data, index) in ancient.data[props.num]"
        :key="index"
        :header="data.name"
        :style="customStyle"
      >
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ data.content }} <SoundFilled @click="sayText(data.content)" style="color:rgb(67, 204, 238)" /></p>
      </a-collapse-panel>
    </a-collapse>
  </template>
  
  <script setup>
  import data from '../data'
  
  const activeKey = ref(['0']);
  
  const customStyle = "text-align: left;"
  
  const props = defineProps({
    num:Number,
    menuKey:Number
  })
  
  const ancient = reactive({
    data: data.map(item=>item.data)[props.menuKey].map(item=>item.article)
  });
  
  const sayText = (text)=>{
    const say = new SpeechSynthesisUtterance(text)
    say.rate = 1.3
    window.speechSynthesis.speak(say)
  }
  
  </script>
  
  <style>
  </style>