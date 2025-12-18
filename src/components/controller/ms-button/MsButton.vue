<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'green',
    validation: (value) => {
      return ['green', 'red', 'blue'].includes(value)
    },
  },
  title: String,
  icon: String,
})
</script>

<template>
  <button :class="[props.type]">
    <div :class="[props.icon]"></div>
    {{ props.title }}
  </button>
</template>

<style scoped>
.green {
  background-color: #e6f4ea;
}
.red {
  background-color: #fdeded;
}
.blue {
  background-color: #e8f0fe;
}
</style>
