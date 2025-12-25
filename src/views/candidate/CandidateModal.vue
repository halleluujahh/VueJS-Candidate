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

const candidateRef = ref({})

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
  candidateUpdate: {
    type: Object,
    default: () => ({}),
  },
})
const emits = defineEmits(['close'])

// Đóng modal thêm/cập nhật ứng viên
function closeModalFunc() {
  candidateRef.value.fullname = ''
  candidateRef.value.birthdate = ''
  candidateRef.value.gender = ''
  candidateRef.value.region = ''
  candidateRef.value.phoneNumber = ''
  candidateRef.value.email = ''
  candidateRef.value.address = ''
  candidateRef.value.level = ''
  candidateRef.value.location = ''
  candidateRef.value.major = ''
  candidateRef.value.createdAt = ''
  candidateRef.value.humanResource = ''
  candidateRef.value.candidateResource = ''
  candidateRef.value.partner = ''
  candidateRef.value.recentWorkplace = ''
  candidateRef.value.workplace = ''
  candidateRef.value.timeFromWorkplace = ''
  candidateRef.value.timeToWorkplace = ''
  candidateRef.value.position = ''
  candidateRef.value.jobDescription = ''
  candidateRef.value.skypeName = ''
  candidateRef.value.skypeId = ''
  candidateRef.value.linkFacebook = ''
  candidateRef.value.linkZalo = ''
  candidateRef.value.otherLink = ''

  fullnameError.value = ''
  birthdateError.value = ''
  phoneError.value = ''
  emailError.value = ''
  timeToError.value = ''

  emits('close')
}
// Validate dữ liệu trong modal thêm ứng viên
function validateAddModal() {
  // validation fields
  if (candidateRef.value.fullname.trim() === '') {
    fullnameError.value = 'Họ và tên không được để trống'
    return false
  } else {
    fullnameError.value = ''
  }
  if (candidateRef.value.birthdate.trim() !== '') {
    if (formatter.parseDDMMYYYY(candidateRef.value.birthdate) >= new Date()) {
      birthdateError.value = 'Ngày sinh phải nhỏ hơn ngày hiện tại'
      return false
    } else {
      birthdateError.value = ''
    }
  }
  if (candidateRef.value.phoneNumber.trim() !== '') {
    const phonePattern = /^(0|\+84)[0-9]{9}$/
    if (!phonePattern.test(candidateRef.value.phoneNumber.trim())) {
      phoneError.value = 'Số điện thoại sai định dạng'
      return false
    } else {
      phoneError.value = ''
    }
  }
  if (candidateRef.value.email.trim() !== '') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(candidateRef.value.email.trim())) {
      emailError.value = 'Email sai định dạng'
      return false
    } else {
      emailError.value = ''
    }
  }
  if (
    candidateRef.value.timeFromWorkplace.trim() !== '' &&
    candidateRef.value.timeToWorkplace.trim() !== ''
  ) {
    if (
      formatter.parseMMYYYY(candidateRef.value.timeFromWorkplace) >
      formatter.parseMMYYYY(candidateRef.value.timeToWorkplace)
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
      id: props.isAdd ? getAllCandidates().length + 1 : props.candidateUpdate.id,
      fullname: candidateRef.value.fullname,
      birthdate: candidateRef.value.birthdate,
      gender: candidateRef.value.gender,
      region: candidateRef.value.region,
      phoneNumber: candidateRef.value.phoneNumber,
      email: candidateRef.value.email,
      address: candidateRef.value.address,
      level: candidateRef.value.level,
      location: candidateRef.value.location,
      major: candidateRef.value.major,
      createdAt: candidateRef.value.createdAt,
      humanResource: candidateRef.value.humanResource,
      candidateResource: candidateRef.value.candidateResource,
      partner: candidateRef.value.partner,
      recentWorkplace: candidateRef.value.recentWorkplace,
      workplace: candidateRef.value.workplace,
      timeFromWorkplace: candidateRef.value.timeFromWorkplace,
      timeToWorkplace: candidateRef.value.timeToWorkplace,
      position: candidateRef.value.position,
      jobDescription: candidateRef.value.jobDescription,
      skypeName: candidateRef.value.skypeName || '',
      skypeId: candidateRef.value.skypeId || '',
      linkFacebook: candidateRef.value.linkFacebook || '',
      linkZalo: candidateRef.value.linkZalo || '',
      otherLink: candidateRef.value.otherLink || '',
    })
    isSaved.value = !isSaved.value
    closeModalFunc()
    toast('success', props.isAdd ? 'Thêm ứng viên thành công' : 'Cập nhật ứng viên thành công')
    candidateRef.value = {}
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
        v-model:candidateRef="candidateRef"
        v-model:fullnameError="fullnameError"
        v-model:birthdateError="birthdateError"
        v-model:phoneError="phoneError"
        v-model:emailError="emailError"
        v-model:timeToError="timeToError"
        :candidateUpdate="props.candidateUpdate"
      />
    </template>
    <template v-else>
      <FormCandidateUpdate
        v-model:candidateRef="candidateRef"
        v-model:fullnameError="fullnameError"
        v-model:birthdateError="birthdateError"
        v-model:phoneError="phoneError"
        v-model:emailError="emailError"
        v-model:timeToError="timeToError"
        :candidateUpdate="props.candidateUpdate"
      />
    </template>
  </MsPopup>
</template>

<style scoped></style>
