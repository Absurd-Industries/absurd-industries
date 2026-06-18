<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const title = ref('')
const desc = ref('')

function show(t: string, d: string) {
  title.value = t
  desc.value = d
  visible.value = true
}

function dismiss() {
  visible.value = false
}

function onBackdropClick(e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('coming-soon-backdrop')) {
    dismiss()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && visible.value) dismiss()
}

onMounted(() => {
  (window as any).__comingSoon = show
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  delete (window as any).__comingSoon
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    :class="['coming-soon-backdrop', { active: visible }]"
    @click="onBackdropClick"
  >
    <div class="coming-soon-modal">
      <div class="coming-soon-icon">
        <i class="ph-bold ph-wrench"></i>
      </div>
      <div class="coming-soon-title">{{ title }}</div>
      <p class="coming-soon-desc">{{ desc }}</p>
      <button class="coming-soon-dismiss" @click="dismiss">Got it</button>
    </div>
  </div>
</template>
