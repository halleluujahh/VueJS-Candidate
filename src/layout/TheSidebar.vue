<script setup>
import { ref } from 'vue'

const props = defineProps({
  isSidebarCollapse: {
    type: Boolean,
    default: false,
  },
  isIconRight: {
    type: Boolean,
    default: false,
  },
  isCollapsedTextHidden: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['collapse-sidebar'])
</script>

<template>
  <div class="app-sidebar">
    <div
      id="sidebar"
      :class="[isSidebarCollapse ? 'sidebar-collapse-mode' : 'sidebar-expand-mode']"
    >
      <div class="sidebar-item-list">
        <div class="sidebar-container">
          <div class="sidebar-item pointer">
            <a href="#">
              <div class="item-content d-flex h-100 align-items-center pos-relative">
                <div class="icon-sb-recruiment item-icon"></div>
                <div class="icon-text" title="Tin tuyển dụng">Tin tuyển dụng</div>
              </div>
            </a>
          </div>
          <div class="sidebar-item pointer">
            <a href="#">
              <div class="item-content d-flex h-100 align-items-center pos-relative">
                <div class="icon-sb-candidate item-icon"></div>
                <div class="icon-text" title="Ứng viên">Ứng viên</div>
              </div>
            </a>
          </div>
          <div class="sidebar-item pointer">
            <a href="#">
              <div class="item-content d-flex h-100 align-items-center pos-relative">
                <div class="icon-sb-calendar item-icon"></div>
                <div class="icon-text" title="Lịch">Lịch</div>
              </div>
            </a>
          </div>
          <div class="sidebar-item pointer">
            <a href="#">
              <div class="item-content d-flex h-100 align-items-center pos-relative">
                <div class="icon-sb-talent-pools item-icon"></div>
                <div class="icon-text" title="Kho tiềm năng">Kho tiềm năng</div>
              </div>
            </a>
          </div>
          <div class="sidebar-item pointer">
            <a href="#">
              <div class="item-content d-flex h-100 align-items-center pos-relative">
                <div class="icon-sb-recruiment-campaign-active item-icon"></div>
                <div class="icon-text" title="Chiến dịch tuyển dụng">Chiến dịch tuyển dụng</div>
              </div>
            </a>
          </div>
          <div class="sidebar-item pointer">
            <a href="#">
              <div class="item-content d-flex h-100 align-items-center pos-relative">
                <div class="icon-sb-task item-icon"></div>
                <div class="icon-text" title="Công việc">Công việc</div>
              </div>
            </a>
          </div>
          <div class="sidebar-item pointer">
            <a href="#">
              <div class="item-content d-flex h-100 align-items-center pos-relative">
                <div class="icon-email-ai-marketing item-icon"></div>
                <div class="icon-text" title="aiMarketing">aiMarketing</div>
              </div>
            </a>
          </div>
          <div class="sidebar-item pointer">
            <a href="#">
              <div class="item-content d-flex h-100 align-items-center pos-relative">
                <div class="icon-chat-box item-icon"></div>
                <div class="icon-text" title="Trao đổi với ứng viên">Trao đổi với ứng viên</div>
              </div>
            </a>
          </div>
          <div class="sidebar-item pointer">
            <a href="#">
              <div class="item-content d-flex h-100 align-items-center pos-relative">
                <div class="icon-sb-report item-icon"></div>
                <div class="icon-text" title="Báo cáo">Báo cáo</div>
              </div>
            </a>
          </div>
          <div class="sidebar-item pointer">
            <a href="#">
              <div class="item-content d-flex h-100 align-items-center pos-relative">
                <div class="icon-sb-setting item-icon"></div>
                <div class="icon-text" title="Khác">Khác</div>
              </div>
            </a>
          </div>
        </div>
        <div class="bottom-area pos-absolute w-100">
          <div
            @click="emits('collapse-sidebar')"
            class="collapse-btn d-flex align-items-center pointer border"
          >
            <div
              id="icon-left"
              :class="['item-icon', 'icon-left', isIconRight ? 'icon-right' : 'icon-left']"
            ></div>
            <div
              id="collapsed-text"
              :class="[
                'icon-text',
                'text-content',
                isCollapsedTextHidden ? 'collapsed-text-hidden' : 'collapsed-text-show',
              ]"
            >
              Thu gọn
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
