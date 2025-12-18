<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './layout/TheHeader.vue'
import TheSidebar from './layout/TheSidebar.vue'
import { ref } from 'vue'

const isSidebarCollapse = ref(false)
const isIconRight = ref(false)
const isRecruitmentContainerCollapse = ref(false)
const isCollapsedTextHidden = ref(false)

function collapseSidebar() {
  isSidebarCollapse.value = !isSidebarCollapse.value
  isIconRight.value = !isIconRight.value
  isCollapsedTextHidden.value = !isCollapsedTextHidden.value
  isRecruitmentContainerCollapse.value = !isRecruitmentContainerCollapse.value
}
</script>

<template>
  <div id="app-wrapper">
    <!-- ==================== Layout ==================== -->
    <the-header />
    <main>
      <the-sidebar
        :isSidebarCollapse="isSidebarCollapse"
        :isIconRight="isIconRight"
        :isCollapsedTextHidden="isCollapsedTextHidden"
        @collapse-sidebar="collapseSidebar"
      />
      <!-- ==================== End Layout ==================== -->

      <!-- ==================== View Page ==================== -->
      <RouterView :isRecruitmentContainerCollapse="isRecruitmentContainerCollapse" />
    </main>
  </div>
</template>

<style scoped></style>
