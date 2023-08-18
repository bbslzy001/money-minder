<template>
<div class="sidebar">
  <div class="sidebar-main" :class="{ collapsed: isCollapsed, expanded: !isCollapsed }">
    <div class="sidebar-top sidebar-container">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo" @click="handleCollapse"/>
        <span class="logo-name"></span>
      </div>
      <i class="sidebar-button collapse-button" @click="handleCollapse">
        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path :d="collapsedIconPath"/>
        </svg>
      </i>
    </div>
    <div class="sidebar-divider" style="padding-bottom: 16px; height: 17px;"/>
    <div class="sidebar-nav sidebar-container">
      <div v-for="(navButtonGroup, groupIndex) in navButtonGroups" :key="groupIndex">
        <div class="sidebar-divider" v-if="navButtonGroup.label && navButtonGroup.label !== ''" style="padding: 24px 0; height: 49px;">
          <span class="sidebar-divider-text">{{ navButtonGroup.label }}</span>
        </div>
        <div class="nav-button-group">
          <i
              v-for="(navButton, buttonIndex) in navButtonGroup.buttons"
              :key="buttonIndex"
              class="sidebar-button nav-button"
              :class="{ selected: activeView === navButton.url }"
              @click="handleNavButton(navButton)"
              :data-tooltip="navButton.label">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path v-for="(pathData, index) in navButton.svgPath" :key="index" :d="pathData"/>
            </svg>
            <span>{{ navButton.label }}</span>
          </i>
        </div>
      </div>
    </div>
    <div class="sidebar-divider" style="padding-top: 16px; height: 17px;"/>
    <div class="sidebar-bottom sidebar-container">
      <div class="nav-button-group">
        <i
            v-for="(extraButton, buttonIndex) in extraButtonGroup.buttons"
            :key="buttonIndex"
            class="sidebar-button nav-button"
            :data-tooltip="extraButton.label"
            @click="handleExtraButton(extraButton)">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path v-for="(pathData, index) in extraButton.svgPath" :key="index" :d="pathData"/>
          </svg>
          <span>{{ extraButton.label }}</span>
        </i>
      </div>
    </div>
  </div>
  <div class="sidebar-border"/>
</div>
</template>

<style scoped>
/* =============== 侧边栏（框架） =============== */
.sidebar {
  display: flex;
  height: 100%;
}

.sidebar-main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  background-color: #f9fafb;
  color: #000000;
  transition: width 0.5s;
}

.sidebar-border {
  width: 1px;
  background-color: #b0b0b0;
}

.sidebar-container {
  padding: 8px;
}

.sidebar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.sidebar-nav {
  flex-grow: 1;
}

.sidebar-bottom {
}

/* =============== 侧边栏分割线 =============== */
.sidebar-divider {
  display: flex;
  align-items: center;
}

.sidebar-divider::before,
.sidebar-divider::after {
  content: '';
  flex-grow: 1;
  height: 1px;
  background-color: #b0b0b0;
}

.sidebar-divider-text {
  padding: 0 24px;
  font-size: 14px;
  font-style: italic;
  line-height: 49px;
}

/* =============== 侧边栏按钮 =============== */
.sidebar-button {
  cursor: pointer;
  height: 44px;
  padding: 8px 10px;
  border-radius: 8px;
  transition: background-color 0.5s;
}

.sidebar-button:hover {
  background-color: rgba(128, 128, 128, 0.15);
}

.sidebar-button:active {
  background-color: rgba(128, 128, 128, 0.3);
}

.sidebar-button svg {
  fill: #000000;
  width: 24px;
  height: 24px;
}

.sidebar-button span {
  font-size: 14px;
  font-style: normal;
}

/* =============== sidebar-top（logo相关） =============== */
.logo {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo img {
  cursor: pointer;
  width: 44px;
  height: 44px;
  margin-right: 8px;
}

.logo-name {
  font-size: 16px;
  font-weight: bold;
}

/* =============== 按钮扩展 =============== */
.collapse-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
}

.nav-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav-button.selected {
  border-radius: 8px;
  box-shadow: 2px 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
}

.nav-button::before {
  content: attr(data-tooltip);
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 12px;
  font-style: normal;
  z-index: 1000;
  display: none;
  white-space: nowrap;
  width: auto;
  height: auto;
}

.nav-button.selected svg {
  fill: rgb(22, 123, 223);
}

.nav-button-group > *:not(:last-child) {
  margin-bottom: 8px;
}

/* =============== 侧边栏（展开折叠） =============== */
.sidebar-main.collapsed {
  width: 60px;
}

.sidebar-main.collapsed span {
  display: none;
}

.sidebar-main.collapsed .collapse-button {
  display: none;
}

.sidebar-main.collapsed .nav-button:hover::before {
  display: block;
}

.sidebar-main.expanded .nav-button svg {
  margin-right: 16px;
}
</style>

<script setup lang="ts">
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const $router = useRouter();
const route = useRoute();

const isCollapsed = ref(false);

const collapsedIconPath = ref([
  'M24.825 23.4L24.825 12.6L19.425 18L24.825 23.4ZM6.99998 31.5C6.31248 31.5 5.72394 31.2552 5.23436 30.7656C4.74479 30.2761 4.5 29.6875 4.5 29L4.5 6.99997C4.5 6.31247 4.74479 5.72393 5.23436 5.23436C5.72394 4.74478 6.31248 4.5 6.99998 4.5L29 4.5C29.6875 4.5 30.2761 4.74479 30.7656 5.23436C31.2552 5.72394 31.5 6.31247 31.5 6.99997L31.5 29C31.5 29.6875 31.2552 30.2761 30.7656 30.7656C30.2761 31.2552 29.6875 31.5 29 31.5L6.99998 31.5ZM12.175 29L12.175 6.99997L6.99998 6.99997L6.99998 29L12.175 29ZM14.675 29L29 29L29 6.99997L14.675 6.99997L14.675 29ZM6.99998 29L12.175 29L6.99998 29Z',
]);

const navButtonIcons = ref({
  uploadIconPath: [
    'M160 832h704a32 32 0 1 1 0 64H160a32 32 0 1 1 0-64zm384-578.304V704h-64V247.296L237.248 490.048 192 444.8 508.8 128l316.8 316.8-45.312 45.248L544 253.696z',
  ],
  pieChartIconPath: [
    'M448 68.48v64.832A384.128 384.128 0 0 0 512 896a384.128 384.128 0 0 0 378.688-320h64.768A448.128 448.128 0 0 1 64 512 448.128 448.128 0 0 1 448 68.48z',
    'M576 97.28V448h350.72A384.064 384.064 0 0 0 576 97.28zM512 64V33.152A448 448 0 0 1 990.848 512H512V64z',
  ],
  dataLineIconPath: [
    'M359.168 768H160a32 32 0 0 1-32-32V192H64a32 32 0 0 1 0-64h896a32 32 0 1 1 0 64h-64v544a32 32 0 0 1-32 32H665.216l110.848 192h-73.856L591.36 768H433.024L322.176 960H248.32l110.848-192zM832 192H192v512h640V192zM342.656 534.656a32 32 0 1 1-45.312-45.312L444.992 341.76l125.44 94.08L679.04 300.032a32 32 0 1 1 49.92 39.936L581.632 524.224 451.008 426.24 342.656 534.592z',
  ],
  documentIconPath: [
    'M832 384H576V128H192v768h640V384zm-26.496-64L640 154.496V320h165.504zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h160v64H320v-64zm0 384h384v64H320v-64z',
  ],
  filesIconPath: [
    'M128 384v448h768V384H128zm-32-64h832a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32zm64-128h704v64H160zm96-128h512v64H256z',
  ],
  collectionTagIconPath: [
    'M256 128v698.88l196.032-156.864a96 96 0 0 1 119.936 0L768 826.816V128H256zm-32-64h576a32 32 0 0 1 32 32v797.44a32 32 0 0 1-51.968 24.96L531.968 720a32 32 0 0 0-39.936 0L243.968 918.4A32 32 0 0 1 192 893.44V96a32 32 0 0 1 32-32z',
  ],
});

const extraButtonIcons = ref({
  lockIconPath: [
    'M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32H224zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96z',
    'M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32zm192-160v-64a192 192 0 1 0-384 0v64h384zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64z',
  ],
  unlockIconPath: [
    'M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32H224zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96z',
    'M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32zm178.304-295.296A192.064 192.064 0 0 0 320 320v64h352l96 38.4V448H256V320a256 256 0 0 1 493.76-95.104l-59.456 23.808z',
  ],
});

const navButtonGroups = ref([
  {
    label: '',
    buttons: [
      {
        svgPath: navButtonIcons.value.uploadIconPath,
        label: '上传',
        url: '/upload',
      },
    ],
  },
  {
    label: '分析',
    buttons: [
      {
        svgPath: navButtonIcons.value.pieChartIconPath,
        label: '仪表板',
        url: '/dashboard',
      },
      {
        svgPath: navButtonIcons.value.dataLineIconPath,
        label: '分析报告',
        url: '/report',
      },
    ],
  },
  {
    label: '管理',
    buttons: [
      {
        svgPath: navButtonIcons.value.documentIconPath,
        label: '交易明细',
        url: '/txn',
      },
      {
        svgPath: navButtonIcons.value.filesIconPath,
        label: '账单',
        url: '/bill',
      },
      {
        svgPath: navButtonIcons.value.collectionTagIconPath,
        label: '匹配规则',
        url: '/txn-type-rule',
      },
    ],
  },
]);

const extraButtonGroup = ref({
  buttons: [
    {
      svgPath: extraButtonIcons.value.lockIconPath,
      label: '锁定',
      onClick: () => {},
    },
  ],
});

const handleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleNavButton = (selectedButton: any) => {
  $router.push(selectedButton.url);
};

const handleExtraButton = (selectedButton: any) => {
  selectedButton.onClick();
};

const activeView = computed(() => {
  if (route.path === '/') return '/dashboard';
  if (route.path === '/dashboard' || route.path.startsWith('/dashboard/')) return '/dashboard';
  if (route.path === '/report' || route.path.startsWith('/report/')) return '/report';
  if (route.path === '/upload' || route.path.startsWith('/upload/')) return '/upload';
  if (route.path === '/bill') return '/bill';
  if (route.path === '/txn') return '/txn';
  if (route.path === '/txn-type-rule') return '/txn-type-rule';
  return '';
});
</script>