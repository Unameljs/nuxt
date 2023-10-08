<template>
    <a-layout v-if="!screenSizeShow" style="min-height: 100vh">
      <a-layout-sider>
        <div class="logo" />
        <a-menu
          @select="onSelect"
          @openChange="openChange"
          theme="dark"
          mode="inline"
          :open-keys="openKeys"
          v-model:selectedKeys="selectedKeys"
        >
          <a-sub-menu  v-for="(cate, index) in categoryContent"
          :key="index">
            <template #title><user-outlined />{{ cate.title }}</template>
            <a-menu-item v-for="(p, index) in cate.project" :key="index">
              <span class="nav-text">{{ p }}</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
          <div
            :style="{ padding: '24px', background: '#fff', textAlign: 'center' }"
          >
            <a-empty
              v-if="emptyShow"
              :image="simpleImage"
              description="暂未选择诗集"
            />
            <component v-if="!emptyShow" :is="currComponent" :menuKey="menuKey" :num="num"></component>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  
    <a-tabs v-if="screenSizeShow" v-model:activeKey="activeKey" size="large" :tabBarGutter="50" centered @change="onchange">
      <a-tab-pane :key="index" :tab="category.title" v-for="(category, index) in categoryContent">
        <a-collapse v-model:activeKey="collapseKey" @change="onchange2">
          <a-collapse-panel :key="index2" :header="c" v-for="(c, index2) in category.project">
            <component :is="currComponent" :menuKey="menuKey" :num="num"></component>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script setup>
  import simpleImage from "~/assets/资料库.png";
  import ancient from './ancientPoetry.vue'
  import confucian from './confucian.vue'
  import data from '../data'
  
  const activeKey = ref('0');
  const collapseKey = ref(['0']);
  
  const onchange = (keys) => {
    currComponent.value = tabs[keys].com
    menuKey.value = keys
    num.value = 0
  }
  
  const onchange2 = (key)=>{
    num.value = Number(key[key.length - 1])
  }
  
  const screenSizeShow = ref(false)
  
  onMounted(()=>{
    //移动端设备
    if(/Mobi|Android|iPhone/i.test(navigator.userAgent)){
      screenSizeShow.value = true
    }else{
      screenSizeShow.value = false
    }
    //SSR渲染 在服务器无法获取window 在挂载后再获取
    window.addEventListener("resize",()=>{
    //判断屏幕宽度或可视宽度
    if(window.screen.width < 500 || window.innerWidth < 650){
      screenSizeShow.value = true
    }else{
      screenSizeShow.value = false
    }
  })
  })
  
  //pc
  const selectedKeys = ref([]);
  const openKeys = ref([])
  
  const emptyShow = ref(true);
  
  const categoryContent = reactive(data.map(item => ({
    title: item.title,
    project: item.data.map(item => item.author)
  })));
  
  let currComponent = shallowRef(ancient)
  
  const menuKey = ref(0)
  const num = ref(0)
  
  const tabs = reactive([
    { com: markRaw(ancient) },
    { com: markRaw(confucian) }
  ])
  
  const onSelect = ({ key }) => {
    emptyShow.value = false;
    num.value = key
  };
  
  const openChange = (keys) => {
    menuKey.value = keys[keys.length - 1]
    if (keys.length) {
      num.value = 0
      openKeys.value = [keys[keys.length - 1]]
      selectedKeys.value = []
      currComponent.value = tabs[keys[keys.length - 1]].com
    } else {
      emptyShow.value = true
    }
  }
  
  </script>
  
  <style scoped>
  #components-layout-demo-side .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }
  
  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }
  </style>