<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Thêm ứng viên',
  },
  isModalOpen: {
    type: Boolean,
    default: false,
  },
})
// Emits sự kiện đóng và lưu modal
const emits = defineEmits(['close', 'save'])
</script>

<template>
  <div
    id="add-candidate-modal"
    :class="[
      'overlay-modal d-flex justify-content-center align-items-center',
      {
        'overlay-modal-show': isModalOpen,
        'overlay-modal-hide': !isModalOpen,
      },
    ]"
  >
    <div class="overlay-modal-content">
      <div class="modal-container">
        <div class="modal-header">
          <div id="title-modal" class="title">{{ props.title }}</div>
          <div class="close-icon" @click="emits('close')"></div>
        </div>
        <div class="modal-body">
          <div class="scroll-view">
            <div class="scroll-wrapper">
              <slot name="scroll-wrapper-inner"></slot>
            </div>
          </div>
        </div>
        <footer>
          <div class="float-right">
            <div class="btn-close pointer" @click="emits('close')">Hủy</div>
            <div id="save-btn" class="btn btn-primary" @click="emits('save')">Lưu</div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
