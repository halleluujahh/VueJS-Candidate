<script setup>
import MsPopup from '@/components/controller/ms-popup/MsPopup.vue'
import CandidateHook from '@/hooks/CandidateHook'
import { saveCandidate, getAllCandidates } from '@/services/CandidateService'
import FormCandidateAdd from './FormCandidateAdd.vue'
import FormCandidateUpdate from './FormCandidateUpdate.vue'
import * as formatter from '@/utils/Formatter.js'
import { ref } from 'vue'
import { dateTimeText } from '@/utils/Constants'

import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance()
const toast = appContext.config.globalProperties.$toast

const fullnameInput = ref('')
const birthdateInput = ref('')
const genderSelect = ref('')
const regionSelect = ref('')
const phoneInput = ref('')
const emailInput = ref('')
const addressInput = ref('')
const levelSelect = ref('')
const locationSelect = ref('')
const majorSelect = ref('')
const createdAtInput = ref('')
const humanResourceSelect = ref('')
const candidateResourceSelect = ref('')
const partnerSelect = ref('')
const recentWorkplaceInput = ref('')
const workplaceInput = ref('')
const timeFromWorkplaceInput = ref('')
const timeToWorkplaceInput = ref('')
const positionInput = ref('')
const jobDescriptionInput = ref('')

const fullnameError = ref('')
const birthdateError = ref('')
const phoneError = ref('')
const emailError = ref('')
const timeToError = ref('')

const dateTimePlaceholders = ref(dateTimeText.datemonthyear)

const isSaved = defineModel('isSaved')
const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false,
  },
  isAdd: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits(['close'])

// Đóng modal thêm/cập nhật ứng viên
function closeModalFunc() {
  emits('close')
}
// Validate dữ liệu trong modal thêm ứng viên
function validateAddModal() {
  // validation fields
  if (fullnameInput.value.trim() === '') {
    fullnameError.value = 'Họ và tên không được để trống'
    return false
  } else {
    fullnameError.value = ''
  }
  if (birthdateInput.value.trim() !== '') {
    if (formatter.parseDDMMYYYY(birthdateInput.value) >= new Date()) {
      birthdateError.value = 'Ngày sinh phải nhỏ hơn ngày hiện tại'
      return false
    } else {
      birthdateError.value = ''
    }
  }
  if (phoneInput.value.trim() !== '') {
    const phonePattern = /^(0|\+84)[0-9]{9}$/
    if (!phonePattern.test(phoneInput.value.trim())) {
      phoneError.value = 'Số điện thoại sai định dạng'
      return false
    } else {
      phoneError.value = ''
    }
  }
  if (emailInput.value.trim() !== '') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.value = 'Email sai định dạng'
      return false
    } else {
      emailError.value = ''
    }
  }
  if (timeFromWorkplaceInput.value.trim() !== '' && timeToWorkplaceInput.value.trim() !== '') {
    if (
      formatter.parseMMYYYY(timeFromWorkplaceInput.value) >
      formatter.parseMMYYYY(timeToWorkplaceInput.value)
    ) {
      timeToError.value = 'Thời gian không hợp lệ'
      return false
    } else {
      timeToError.value = ''
    }
  }
  return true
}
// Lưu thông tin ứng viên
function saveCandidateFunc() {
  if (validateAddModal()) {
    saveCandidate({
      id: getAllCandidates().length + 1,
      fullname: fullnameInput.value,
      birthdate: birthdateInput.value,
      gender: genderSelect.value,
      region: regionSelect.value,
      phoneNumber: phoneInput.value,
      email: emailInput.value,
      address: addressInput.value,
      level: levelSelect.value,
      location: locationSelect.value,
      major: majorSelect.value,
      createdAt: createdAtInput.value,
      humanResource: humanResourceSelect.value,
      candidateResource: candidateResourceSelect.value,
      partner: partnerSelect.value,
      recentWorkplace: recentWorkplaceInput.value,
      workplace: workplaceInput.value,
      timeFromWorkplace: timeFromWorkplaceInput.value,
      timeToWorkplace: timeToWorkplaceInput.value,
      position: positionInput.value,
      jobDescription: jobDescriptionInput.value,
    })
    isSaved.value = !isSaved.value
    emits('close')
    toast('success', 'Thêm ứng viên thành công')
  }
}
</script>

<template>
  <MsPopup
    :isModalOpen="props.isModalOpen"
    @save="saveCandidateFunc"
    @close="closeModalFunc"
    :title="props.isAdd ? 'Thêm ứng viên' : 'Cập nhật thông tin ứng viên'"
    #scroll-wrapper-inner
  >
    <template v-if="props.isAdd">
      <FormCandidateAdd
        v-model:fullnameInput="fullnameInput"
        v-model:birthdateInput="birthdateInput"
        v-model:genderSelect="genderSelect"
        v-model:regionSelect="regionSelect"
        v-model:phoneInput="phoneInput"
        v-model:emailInput="emailInput"
        v-model:addressInput="addressInput"
        v-model:levelSelect="levelSelect"
        v-model:locationSelect="locationSelect"
        v-model:majorSelect="majorSelect"
        v-model:createdAtInput="createdAtInput"
        v-model:humanResourceSelect="humanResourceSelect"
        v-model:candidateResourceSelect="candidateResourceSelect"
        v-model:partnerSelect="partnerSelect"
        v-model:recentWorkplaceInput="recentWorkplaceInput"
        v-model:workplaceInput="workplaceInput"
        v-model:timeFromWorkplaceInput="timeFromWorkplaceInput"
        v-model:timeToWorkplaceInput="timeToWorkplaceInput"
        v-model:positionInput="positionInput"
        v-model:jobDescriptionInput="jobDescriptionInput"
        v-model:fullnameError="fullnameError"
        v-model:birthdateError="birthdateError"
        v-model:phoneError="phoneError"
        v-model:emailError="emailError"
        v-model:timeToError="timeToError"
        v-model:dateTimePlaceholders="dateTimePlaceholders"
      />
    </template>
    <template v-else>
      <FormCandidateUpdate />
    </template>
  </MsPopup>
</template>

<style scoped></style>
