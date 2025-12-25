<script setup>
import MsInput from '@/components/controller/ms-input/MsInput.vue'
import CommonEnums from '@/enums/commons'
import { dateTimeText } from '@/utils/constants'
import { ref, watch } from 'vue'

const props = defineProps({
  candidateUpdate: {
    type: Object,
    default: () => ({}),
  },
})
const candidateRef = defineModel('candidateRef', { default: {} })

const fullnameError = defineModel('fullnameError', { default: '' })
const birthdateError = defineModel('birthdateError', { default: '' })
const phoneError = defineModel('phoneError', { default: '' })
const emailError = defineModel('emailError', { default: '' })
const timeToError = defineModel('timeToError', { default: '' })

const dateTimePlaceholders = defineModel('dateTimePlaceholders', {
  default: dateTimeText.datemonthyear,
})

const dateTimeTextDisplay = ref(dateTimeText.ddMMyyyy)
const isOpenDateTimeModal = ref(false)

function toggleDisplayDatetimeDropdown() {
  isOpenDateTimeModal.value = !isOpenDateTimeModal.value
}
function changeInputDateType(type) {
  if (type === 'year') {
    dateTimePlaceholders.value = dateTimeText.year
    dateTimeTextDisplay.value = dateTimeText.yyyy
  }
  if (type === 'month-year') {
    dateTimePlaceholders.value = dateTimeText.monthyear
    dateTimeTextDisplay.value = dateTimeText.MMyyyy
  }
  if (type === 'day-month-year') {
    dateTimePlaceholders.value = dateTimeText.datemonthyear
    dateTimeTextDisplay.value = dateTimeText.ddMMyyyy
  }
}

watch(
  () => props.candidateUpdate,
  (value) => {
    candidateRef.value = value
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>

<template>
  <div>
    <div class="info-candidate">
      <div class="avatar-candidate">
        <div class="avatar-modal">
          <div class="show-image">
            <span class="image">Ảnh</span>
          </div>
          <input type="file" accept="image/*" hidden />
        </div>
      </div>
      <div class="input-info">
        <div class="right-content">
          <!-- Họ tên Start -->
          <div class="input-fullname">
            <div class="label-input">Họ và tên <span class="color-red">*</span></div>
            <div class="field-container">
              <MsInput
                v-model="candidateRef.fullname"
                :id="'fullname-update'"
                :class="'field-input'"
                :type="'text'"
                :maxlength="255"
                :placeholder="'Nhập họ và tên'"
                :formType="CommonEnums.typeFormElement.INPUT"
              />
              <div
                :class="[
                  'error-message',
                  {
                    'input-error': fullnameError !== '',
                  },
                ]"
                id="fullname-update-error-message"
              >
                {{ fullnameError }}
              </div>
            </div>
          </div>
          <!-- Họ tên End -->
          <!-- Ngày sinh, giới tính Start -->
          <div class="input-dup">
            <div class="dup-row">
              <div class="label-input d-flex justify-content-between">
                <div>Ngày sinh</div>
                <div class="format-date dis-align-self-center">
                  <div
                    class="dropdown-toggle pointer d-flex align-items-center"
                    @click="toggleDisplayDatetimeDropdown"
                  >
                    <b class="dropdown-text m-r-8" id="dropdown-text-datetime-update">
                      {{ dateTimeTextDisplay }}
                    </b>
                    <div class="dropdown-icon"></div>
                    <!-- dropdown datetime here -->
                    <div
                      id="display-datetime-modal-update"
                      :class="[
                        'datetime-dropdown',
                        {
                          'datetime-dropdown-show': isOpenDateTimeModal,
                          'datetime-dropdown-hide': !isOpenDateTimeModal,
                        },
                      ]"
                    >
                      <div
                        class="dropdown-item d-flex align-items-center"
                        id="choosed-year"
                        @click="changeInputDateType('year')"
                      >
                        <div>Năm</div>
                      </div>
                      <div
                        class="dropdown-item d-flex align-items-center"
                        id="choosed-month-year"
                        @click="changeInputDateType('month-year')"
                      >
                        <div>Tháng năm</div>
                      </div>
                      <div
                        class="dropdown-item d-flex align-items-center"
                        id="choosed-day-month-year"
                        @click="changeInputDateType('day-month-year')"
                      >
                        <div>Ngày tháng năm</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field-container d-flex align-items-center">
                <MsInput
                  v-model="candidateRef.birthdate"
                  :id="'birthdate-update'"
                  :class="'datetime-input'"
                  :type="'text'"
                  :placeholder="dateTimePlaceholders"
                  :formType="CommonEnums.typeFormElement.DATEPICKER"
                  :autocomplete="'off'"
                />
                <div id="calendar" class="calendar-setting pointer">
                  <div class="icon-calendar-vertical"></div>
                </div>
                <input type="date" id="realDate-update" hidden />
              </div>
              <div
                :class="[
                  'error-message',
                  {
                    'input-error': birthdateError !== '',
                  },
                ]"
                id="birthdate-update-error-message"
              >
                {{ birthdateError }}
              </div>
            </div>
            <div class="dup-row">
              <div class="label-input">Giới tính</div>
              <div class="field-container">
                <MsInput
                  v-model="candidateRef.gender"
                  :id="'gender-update'"
                  :formType="CommonEnums.typeFormElement.SELECT"
                  :class="'field-input'"
                  :options="[
                    {
                      label: 'Chọn giới tính',
                      value: '',
                    },
                    {
                      label: 'Nam',
                      value: 'Male',
                    },
                    {
                      label: 'Nữ',
                      value: 'Female',
                    },
                  ]"
                />
                <div class="error-message" id="gender-error-message"></div>
              </div>
            </div>
          </div>
          <!-- Ngày sinh, giới tính End -->
          <!-- Ngày ứng tuyển và Nguồn ứng viên Start -->
          <div class="input-dup">
            <div class="dup-row">
              <div class="label-input">Nguồn ứng viên</div>
              <div class="field-container">
                <MsInput
                  v-model="candidateRef.candidateResource"
                  :id="'candidate-resource-update'"
                  :class="'field-input'"
                  :formType="CommonEnums.typeFormElement.SELECT"
                  :options="[
                    {
                      label: 'Chọn nguồn ứng viên',
                      value: '',
                    },
                    {
                      label: 'Group tuyển dụng',
                      value: 'Group tuyển dụng',
                    },
                    {
                      label: 'Hội chợ việc làm',
                      value: 'Hội chợ việc làm',
                    },
                    {
                      label: 'Website',
                      value: 'Website',
                    },
                    {
                      label: 'Facebook',
                      value: 'Facebook',
                    },
                    {
                      label: 'Zalo',
                      value: 'Zalo',
                    },
                    {
                      label: 'CareerViet',
                      value: 'CareerViet',
                    },
                    {
                      label: 'LinkedIn',
                      value: 'LinkedIn',
                    },
                    {
                      label: 'Careerlink',
                      value: 'Careerlink',
                    },
                  ]"
                />
                <div class="error-message" id="candidate-resource-error-message"></div>
              </div>
            </div>
            <div class="dup-row">
              <div class="label-input d-flex justify-content-between">
                <div>Ngày ứng tuyển</div>
              </div>

              <div class="field-container d-flex align-items-center">
                <MsInput
                  v-model="candidateRef.createdAt"
                  :id="'created-at-update'"
                  :type="'text'"
                  :maxlength="10"
                  :autocomplete="'off'"
                  :placeholder="dateTimeText.datemonthyear"
                  :class="'field-input datetime-input'"
                  :formType="CommonEnums.typeFormElement.DATEPICKER"
                />

                <div id="calendar" class="calendar-setting pointer">
                  <div class="icon-calendar-vertical"></div>
                </div>
                <input type="date" id="realDate" hidden />
              </div>
              <div class="error-message" id="created-at-error-message"></div>
            </div>
          </div>
          <!-- Ngày ứng tuyển và Nguồn ứng viên End -->
          <div class="input-area">
            <div class="label-input">Khu vực</div>
            <div class="field-container d-flex align-items-center">
              <MsInput
                v-model="candidateRef.region"
                :id="'region-update'"
                :class="'field-input'"
                :placeholder="'Khu vực'"
                :formType="CommonEnums.typeFormElement.SELECT"
                :options="[
                  {
                    label: 'Chọn khu vực',
                    value: '',
                  },
                  {
                    label: 'Cầu Giấy',
                    value: 'Cầu Giấy',
                  },
                  {
                    label: 'Tây Hồ',
                    value: 'Tây Hồ',
                  },
                  {
                    label: 'Thanh Xuân',
                    value: 'Thanh Xuân',
                  },
                  {
                    label: 'Gia Lâm',
                    value: 'Gia Lâm',
                  },
                  {
                    label: 'Bắc Từ Liêm',
                    value: 'Bắc Từ Liêm',
                  },
                ]"
              />
              <div class="dictionary-setting pointer">
                <div class="icon-more-vertical"></div>
              </div>
            </div>
            <div class="error-message" id="region-error-message"></div>
          </div>
          <!-- Nhân sự khai thác và Cộng tác viên Start -->
          <div class="label-input d-flex justify-content-between">
            <div>Nhân sự khai thác</div>
          </div>
          <div class="field-container">
            <MsInput
              v-model="candidateRef.humanResource"
              :id="'human-resource-update'"
              :class="'field-input'"
              :formType="CommonEnums.typeFormElement.SELECT"
              :options="[
                {
                  label: 'Chọn nhân sự khai thác',
                  value: '',
                },
                {
                  label: 'Dinh Nga QTHT',
                  value: 'Dinh Nga QTHT',
                },
                {
                  label: 'Lương Nguyễn',
                  value: 'Lương Nguyễn',
                },
                {
                  label: 'Nguyễn Lan Hương',
                  value: 'Nguyễn Lan Hương',
                },
                {
                  label: 'Nguyễn Văn Công',
                  value: 'Nguyễn Văn Công',
                },
                {
                  label: 'Nguyễn Thành Chung',
                  value: 'Nguyễn Thành Chung',
                },
              ]"
            />
            <div class="error-message" id="human-resource-error-message"></div>
          </div>

          <div class="label-input">Cộng tác viên</div>
          <div class="field-container">
            <MsInput
              v-model="candidateRef.partner"
              :id="'partner-update'"
              :class="'field-input'"
              :formType="CommonEnums.typeFormElement.SELECT"
              :options="[
                {
                  label: 'Chọn cộng tác viên',
                  value: '',
                },
                {
                  label: 'Tuyển dụng Misa',
                  value: 'Tuyển dụng Misa',
                },
              ]"
            />
            <div class="error-message" id="partner-error-message"></div>
          </div>
          <div class="d-flex align-items-center pointer mb-2">
            <div class="icon-plus"></div>
            <div class="text-active add-new-context">Thêm người giới thiệu</div>
          </div>
          <!-- Nhân sự khai thác và Cộng tác viên End -->
        </div>
      </div>
    </div>
    <div class="candidate-info">
      <div class="title-candidate-info">THÔNG TIN LIÊN HỆ</div>
      <!-- SĐT, Email Start -->
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-phone"></div>
          <div class="contact-field">Số điện thoại</div>
        </div>

        <div class="field-container">
          <MsInput
            v-model="candidateRef.phoneNumber"
            :id="'phone-update'"
            :placeholder="'Nhập số điện thoại'"
            :class="'field-input'"
            :type="'text'"
            :formType="CommonEnums.typeFormElement.INPUT"
          />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div
          :class="[
            'error-message',
            {
              'input-error': phoneError !== '',
            },
          ]"
          id="phone-update-error-message"
        >
          {{ phoneError }}
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="d-flex align-items-center pointer mb-2">
          <div class="icon-plus"></div>
          <div class="text-active add-new-context">Thêm số điện thoại</div>
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-email"></div>
          <div class="contact-field">Email</div>
        </div>
        <div class="field-container">
          <MsInput
            v-model="candidateRef.email"
            :id="'email-update'"
            :placeholder="'Nhập email'"
            :class="'field-input'"
            :type="'email'"
            :formType="CommonEnums.typeFormElement.INPUT"
          />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div
          :class="[
            'error-message',
            {
              'input-error': emailError !== '',
            },
          ]"
          id="email-update-error-message"
        >
          {{ emailError }}
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="d-flex align-items-center pointer mb-2">
          <div class="icon-plus"></div>
          <div class="text-active add-new-context">Thêm email</div>
        </div>
      </div>
      <!-- SĐT, Email End -->
      <div class="input-address row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-location"></div>
          <div class="contact-field">Địa chỉ</div>
        </div>
        <div class="field-container">
          <MsInput
            v-model="candidateRef.address"
            :id="'address-update'"
            :type="'text'"
            :class="'field-input'"
            :placeholder="'Nhập địa chỉ'"
            :formType="CommonEnums.typeFormElement.INPUT"
          />
        </div>
      </div>
      <div class="input-address row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="address-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-skype"></div>
          <div class="contact-field">Skype</div>
        </div>
        <div class="field-container d-flex gap3">
          <MsInput
            v-model="candidateRef.skypeName"
            :id="'skype-name'"
            :type="'text'"
            :formType="CommonEnums.typeFormElement.INPUT"
            :placeholder="'Tên hiển thị'"
            :class="'field-input'"
          />
          <MsInput
            v-model="candidateRef.skypeId"
            :id="'skype-id'"
            :type="'text'"
            :formType="CommonEnums.typeFormElement.INPUT"
            :placeholder="'live:'"
            :class="'field-input'"
          />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="skype-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-facebook"></div>
          <div class="contact-field">Facebook</div>
        </div>
        <div class="field-container">
          <MsInput
            v-model="candidateRef.linkFacebook"
            :id="'link-facebook'"
            :class="'field-input'"
            :type="'text'"
          />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="facebook-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-zalo"></div>
          <div class="contact-field">Zalo</div>
        </div>
        <div class="field-container">
          <MsInput
            v-model="candidateRef.linkZalo"
            :id="'link-zalo'"
            :class="'field-input'"
            :type="'text'"
          />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="zalo-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center">
          <div class="icon-link"></div>
          <div class="contact-field">Liên kết khác</div>
        </div>
        <div class="field-container">
          <MsInput
            v-model="candidateRef.otherLink"
            :id="'other-link'"
            :class="'field-input'"
            :type="'text'"
          />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="error-message" id="other-link-error-message"></div>
      </div>
      <div class="row-input">
        <div class="label-input d-flex align-items-center"></div>
        <div class="d-flex align-items-center pointer mb-2">
          <div class="icon-plus"></div>
          <div class="text-active add-new-context">Thêm đường dẫn</div>
        </div>
      </div>
      <!-- Học vấn Start -->
      <div class="input-college">
        <div class="label-input title-candidate-info">HỌC VẤN</div>
        <div id="education-input-cluster">
          <div class="education-info d-flex">
            <div class="row-input">
              <div class="label-input d-flex align-items-center">
                <div class="icon-circle"></div>
                <div class="contact-field">Trình độ đào tạo</div>
              </div>
              <div class="field-container d-flex pos-relative align-items-center">
                <MsInput
                  v-model="candidateRef.level"
                  :id="'level-update'"
                  :class="'field-input'"
                  :type="'text'"
                  :maxlength="255"
                  :placeholder="'Nhập trình độ đào tạo'"
                  :formType="CommonEnums.typeFormElement.INPUT"
                />
                <span class="icon-plus plus-input"></span>
                <div class="arrow-setting pointer">
                  <div class="icon-arrow-down"></div>
                </div>
                <span class="icon-sub sub-input sub-input-hide" onclick="removeEducation(e)"></span>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="label-input d-flex align-items-center">
                <div class="label-input"></div>
              </div>
              <div class="error-message" id="level-error-message"></div>
            </div>
            <div class="row-input">
              <div class="label-input d-flex align-items-center">
                <div class="icon-circle"></div>
                <div class="contact-field">Nơi đào tạo</div>
              </div>
              <div class="field-container d-flex pos-relative align-items-center">
                <MsInput
                  v-model="candidateRef.location"
                  :id="'location-update'"
                  :class="'field-input'"
                  :type="'text'"
                  :maxlength="255"
                  :placeholder="'Nhập nơi đào tạo'"
                  :formType="CommonEnums.typeFormElement.INPUT"
                />
                <span class="icon-plus plus-input"></span>
                <div class="arrow-setting pointer">
                  <div class="icon-arrow-down"></div>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="label-input d-flex align-items-center">
                <div class="label-input"></div>
              </div>
              <div class="error-message" id="location-error-message"></div>
            </div>
            <div class="row-input">
              <div class="label-input d-flex pos-relative align-items-center">
                <div class="icon-circle"></div>
                <div class="contact-field">Chuyên ngành</div>
              </div>
              <div class="field-container d-flex pos-relative align-items-center">
                <MsInput
                  v-model="candidateRef.major"
                  :id="'major-update'"
                  :class="'field-input'"
                  :type="'text'"
                  :maxlength="255"
                  :placeholder="'Nhập chuyên ngành'"
                  :formType="CommonEnums.typeFormElement.INPUT"
                />
                <span class="icon-plus plus-input"></span>
                <div class="arrow-setting pointer">
                  <div class="icon-arrow-down"></div>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="label-input d-flex align-items-center">
                <div class="label-input"></div>
              </div>
              <div class="error-message" id="major-error-message"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center pointer mb-2">
        <div class="icon-plus"></div>
        <div class="add-new-context">Thêm học vấn</div>
      </div>
      <!-- Học vấn End -->

      <div class="label-input title-candidate-info">KINH NGHIỆM LÀM VIỆC</div>
      <!-- Nơi làm việc gần đây start -->
      <div class="input-recent-workplace row-input mb-5">
        <div class="label-input d-flex pos-relative align-items-center">
          <div class="icon-circle"></div>
          <div class="contact-field">Nơi làm việc gần đây</div>
        </div>
        <div class="field-container">
          <MsInput
            v-model="candidateRef.recentWorkplace"
            :id="'recent-workplace-update'"
            :class="'field-input'"
            :type="'text'"
            :maxlength="255"
            :placeholder="'Nhập nơi làm việc gần đây'"
            :formType="CommonEnums.typeFormElement.INPUT"
          />
        </div>
      </div>
      <div class="row-input">
        <div class="label-input"></div>
        <div class="d-flex align-items-center pointer mb-2">
          <div class="icon-plus"></div>
          <div class="add-new-context">Thêm kinh nghiệm làm việc</div>
        </div>
      </div>
      <!-- Nơi làm việc gần đây end -->

      <!-- Nơi làm việc start -->
      <div class="input-workplace row-input mb-5">
        <div class="label-input d-flex pos-relative align-items-center">
          <div class="icon-circle"></div>
          <div class="contact-field">Nơi làm việc</div>
        </div>
        <div class="field-container">
          <MsInput
            v-model="candidateRef.workplace"
            :id="'workplace-update'"
            :class="'field-input'"
            :type="'text'"
            :maxlength="255"
            :placeholder="'Nhập nơi làm việc'"
            :formType="CommonEnums.typeFormElement.INPUT"
          />
        </div>
      </div>
      <!-- Nơi làm việc end -->
      <!-- Thời gian start -->
      <div class="row-input mb-5">
        <div class="label-input d-flex pos-relative align-items-center">
          <div class="icon-circle"></div>
          <div class="contact-field">Thời gian</div>
        </div>
        <div class="d-flex align-items-center gap3">
          <div class="field-container d-flex align-items-center">
            <MsInput
              v-model="candidateRef.timeFromWorkplace"
              :id="'time-from-update'"
              :type="'text'"
              :maxlength="10"
              :autocomplete="'off'"
              :placeholder="dateTimeText.monthyear"
              :class="'field-input datetime-input'"
              :formType="CommonEnums.typeFormElement.DATEPICKER"
            />
            <div id="calendar" class="calendar-setting pointer">
              <div class="icon-calendar-vertical"></div>
            </div>
            <input type="date" id="realDate" hidden />
          </div>
          <div class="d-flex align-items-center fs-20">-</div>

          <div class="field-container d-flex align-items-center">
            <MsInput
              v-model="candidateRef.timeToWorkplace"
              :id="'time-to-update'"
              :type="'text'"
              :maxlength="10"
              :autocomplete="'off'"
              :placeholder="dateTimeText.monthyear"
              :class="'field-input datetime-input'"
              :formType="CommonEnums.typeFormElement.DATEPICKER"
            />
            <div id="calendar" class="calendar-setting pointer">
              <div class="icon-calendar-vertical"></div>
            </div>
            <input type="date" id="realDate" hidden />
          </div>
        </div>
      </div>

      <!-- Thời gian end -->
      <!-- Vị trí công việc start -->
      <div class="input-workplace row-input mb-5">
        <div class="label-input d-flex pos-relative align-items-center">
          <div class="icon-circle"></div>
          <div class="contact-field">Vị trí công việc</div>
        </div>
        <div class="field-container">
          <MsInput
            v-model="candidateRef.position"
            :id="'position-update'"
            :type="'text'"
            :class="'field-input'"
            :maxlength="255"
            :placeholder="'Nhập vị trí công việc'"
            :formType="CommonEnums.typeFormElement.INPUT"
          />
        </div>
      </div>
      <!-- Vị trí công việc end -->
      <!--Mô tả công việc start -->
      <div class="input-workplace row-input">
        <div class="label-input d-flex pos-relative align-items-center">
          <div class="icon-circle"></div>
          <div class="contact-field">Mô tả công việc</div>
        </div>
        <div class="field-container">
          <MsInput
            v-model="candidateRef.jobDescription"
            :id="'job-description-update'"
            :placeholder="'Nhập mô tả công việc'"
            :formType="CommonEnums.typeFormElement.TEXTAREA"
          />
          <div class="error-message" id="job-description-error-message"></div>
        </div>
      </div>
      <!-- Mô tả công việc end -->
      <div class="label-input title-candidate-info">TRƯỜNG TÙY CHỈNH</div>
      <div class="row-input">
        <div class="label-input"></div>
        <div class="d-flex align-items-center pointer">
          <div class="icon-plus"></div>
          <div class="add-new-context">Thêm trường tùy chỉnh</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
