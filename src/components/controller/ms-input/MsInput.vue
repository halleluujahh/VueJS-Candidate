<script setup>
import CommonEnums from '@/enums/commons'
import * as formatter from '@/utils/formatter.js'
import { nextTick, ref, watch } from 'vue'
const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  formType: {
    type: Number,
    default: CommonEnums.typeFormElement.INPUT,
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  maxlength: {
    type: Number,
    default: null,
  },
  onblur: {
    type: Function,
    default: null,
  },
  accept: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
  options: {
    type: Array,
    default: () => [],
  },
  dateTimeTextDisplay: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const onInputResize = (event) => {
  emit('update:modelValue', event.target.value)
}

// Auto height for textarea
const textAreaRef = ref(null)
const autoResize = async () => {
  await nextTick()
  const el = textAreaRef.value
  if (!el) return

  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}
watch(
  () => props.modelValue,
  () => {
    autoResize()
  },
)
</script>

<template>
  <template v-if="props.formType == CommonEnums.typeFormElement.INPUT">
    <input
      :id="props.id"
      :maxlength="props.maxlength"
      :autocomplete="props.autocomplete"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :value="props.modelValue"
      :class="props.class"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </template>
  <template v-else-if="props.formType == CommonEnums.typeFormElement.DATEPICKER">
    <input
      :id="props.id"
      :maxlength="props.maxlength"
      :autocomplete="props.autocomplete"
      :type="props.type"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :value="props.modelValue"
      :class="props.class"
      @blur="
        emit(
          'update:modelValue',
          formatter.formatInputTypeOnBlur($event.target.value, props.placeholder),
        )
      "
      @input="
        emit(
          'update:modelValue',
          formatter.formatInputTypeOnInput($event.target.value, props.placeholder),
        )
      "
    />
  </template>
  <template v-else-if="props.formType == CommonEnums.typeFormElement.SELECT">
    <select
      :id="props.id"
      :class="props.class"
      :value="props.modelValue"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </template>
  <template v-else-if="props.formType == CommonEnums.typeFormElement.TEXTAREA">
    <textarea
      :id="props.id"
      ref="textAreaRef"
      :maxlength="props.maxlength"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      :class="props.class"
      @input="onInputResize"
    ></textarea>
  </template>
</template>

<style scoped></style>
