<script setup>
import MsPopup from '@/components/controller/ms-popup/MsPopup.vue'
import CandidateHook from '@/hooks/candidateHook'
import { saveCandidate, getAllCandidates } from '@/services/candidateService'
import FormCandidateAdd from './FormCandidateAdd.vue'
import FormCandidateUpdate from './FormCandidateUpdate.vue'
import * as formatter from '@/utils/formatter.js'
import { ref } from 'vue'
import { dateTimeText } from '@/utils/constants'

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
      fullname: props.isAdd
        ? candidateRef.value.fullname
        : candidateRef.value.fullname !== ''
          ? candidateRef.value.fullname
          : props.candidateUpdate.fullname,
      birthdate: props.isAdd
        ? candidateRef.value.birthdate
        : candidateRef.value.birthdate !== ''
          ? candidateRef.value.birthdate
          : props.candidateUpdate.birthdate,
      gender: props.isAdd
        ? candidateRef.value.gender
        : candidateRef.value.gender !== ''
          ? candidateRef.value.gender
          : props.candidateUpdate.gender,
      region: props.isAdd
        ? candidateRef.value.region
        : candidateRef.value.region !== ''
          ? candidateRef.value.region
          : props.candidateUpdate.region,
      phoneNumber: props.isAdd
        ? candidateRef.value.phoneNumber
        : candidateRef.value.phoneNumber !== ''
          ? candidateRef.value.phoneNumber
          : props.candidateUpdate.phoneNumber,
      email: props.isAdd
        ? candidateRef.value.email
        : candidateRef.value.email !== ''
          ? candidateRef.value.email
          : props.candidateUpdate.email,
      address: props.isAdd
        ? candidateRef.value.address
        : candidateRef.value.address !== ''
          ? candidateRef.value.address
          : props.candidateUpdate.address,
      level: props.isAdd
        ? candidateRef.value.level
        : candidateRef.value.level !== ''
          ? candidateRef.value.level
          : props.candidateUpdate.level,
      location: props.isAdd
        ? candidateRef.value.location
        : candidateRef.value.location !== ''
          ? candidateRef.value.location
          : props.candidateUpdate.location,
      major: props.isAdd
        ? candidateRef.value.major
        : candidateRef.value.major !== ''
          ? candidateRef.value.major
          : props.candidateUpdate.major,
      createdAt: props.isAdd
        ? candidateRef.value.createdAt
        : candidateRef.value.createdAt !== ''
          ? candidateRef.value.createdAt
          : props.candidateUpdate.createdAt,
      humanResource: props.isAdd
        ? candidateRef.value.humanResource
        : candidateRef.value.humanResource !== ''
          ? candidateRef.value.humanResource
          : props.candidateUpdate.humanResource,
      candidateResource: props.isAdd
        ? candidateRef.value.candidateResource
        : candidateRef.value.candidateResource !== ''
          ? candidateRef.value.candidateResource
          : props.candidateUpdate.candidateResource,
      partner: props.isAdd
        ? candidateRef.value.partner
        : candidateRef.value.partner !== ''
          ? candidateRef.value.partner
          : props.candidateUpdate.partner,
      recentWorkplace: props.isAdd
        ? candidateRef.value.recentWorkplace
        : candidateRef.value.recentWorkplace !== ''
          ? candidateRef.value.recentWorkplace
          : props.candidateUpdate.recentWorkplace,
      workplace: props.isAdd
        ? candidateRef.value.workplace
        : candidateRef.value.workplace !== ''
          ? candidateRef.value.workplace
          : props.candidateUpdate.workplace,
      timeFromWorkplace: props.isAdd
        ? candidateRef.value.timeFromWorkplace
        : candidateRef.value.timeFromWorkplace !== ''
          ? candidateRef.value.timeFromWorkplace
          : props.candidateUpdate.timeFromWorkplace,
      timeToWorkplace: props.isAdd
        ? candidateRef.value.timeToWorkplace
        : candidateRef.value.timeToWorkplace !== ''
          ? candidateRef.value.timeToWorkplace
          : props.candidateUpdate.timeToWorkplace,
      position: props.isAdd
        ? candidateRef.value.position
        : candidateRef.value.position !== ''
          ? candidateRef.value.position
          : props.candidateUpdate.position,
      jobDescription: props.isAdd
        ? candidateRef.value.jobDescription
        : candidateRef.value.jobDescription !== ''
          ? candidateRef.value.jobDescription
          : props.candidateUpdate.jobDescription,
      skypeName: props.isAdd
        ? candidateRef.value.skypeName
        : candidateRef.value.skypeName !== ''
          ? candidateRef.value.skypeName
          : props.candidateUpdate.skypeName,
      skypeId: props.isAdd
        ? candidateRef.value.skypeId
        : candidateRef.value.skypeId !== ''
          ? candidateRef.value.skypeId
          : props.candidateUpdate.skypeId,
      linkFacebook: props.isAdd
        ? candidateRef.value.linkFacebook
        : candidateRef.value.linkFacebook !== ''
          ? candidateRef.value.linkFacebook
          : props.candidateUpdate.linkFacebook,
      linkZalo: props.isAdd
        ? candidateRef.value.linkZalo
        : candidateRef.value.linkZalo !== ''
          ? candidateRef.value.linkZalo
          : props.candidateUpdate.linkZalo,
      otherLink: props.isAdd
        ? candidateRef.value.otherLink
        : candidateRef.value.otherLink !== ''
          ? candidateRef.value.otherLink
          : props.candidateUpdate.otherLink,
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
