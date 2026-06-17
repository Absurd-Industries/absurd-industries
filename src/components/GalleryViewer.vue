<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  images: string[];
  alt: string;
}>();

const activeIndex = ref(0);
const dialogRef = ref<HTMLDialogElement | null>(null);

function selectImage(index: number) {
  activeIndex.value = index;
}

function openLightbox() {
  dialogRef.value?.showModal();
}

function closeLightbox() {
  dialogRef.value?.close();
}
</script>

<template>
  <div class="gallery-viewer">
    <!-- Primary image -->
    <div class="gallery-primary" @click="openLightbox">
      <img
        :src="props.images[activeIndex]"
        :alt="props.alt"
        class="gallery-primary-img"
      />
    </div>

    <!-- Thumbnail row -->
    <div class="gallery-thumbs">
      <button
        v-for="(img, idx) in props.images"
        :key="idx"
        class="gallery-thumb"
        :class="{ 'gallery-thumb--active': idx === activeIndex }"
        @click="selectImage(idx)"
      >
        <img :src="img" :alt="`${props.alt} thumbnail ${idx + 1}`" />
      </button>
    </div>

    <!-- Lightbox dialog -->
    <dialog ref="dialogRef" class="gallery-lightbox" @click="closeLightbox">
      <div class="gallery-lightbox-content" @click.stop>
        <button class="gallery-lightbox-close" @click="closeLightbox">
          &times;
        </button>
        <img
          :src="props.images[activeIndex]"
          :alt="props.alt"
          class="gallery-lightbox-img"
        />
      </div>
    </dialog>
  </div>
</template>

<style scoped>
.gallery-viewer {
  border-radius: 0.875rem;
  overflow: hidden;
}

.gallery-primary {
  width: 100%;
  height: 16rem;
  cursor: pointer;
  overflow: hidden;
}

@media (min-width: 640px) {
  .gallery-primary {
    height: 20rem;
  }
}

.gallery-primary-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.gallery-primary:hover .gallery-primary-img {
  transform: scale(1.02);
}

.gallery-thumbs {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #FAF3E8;
}

.gallery-thumb {
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  background: none;
  flex-shrink: 0;
  transition: border-color 0.15s ease;
}

.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-thumb--active {
  border-color: #FF5900;
}

.gallery-thumb:hover:not(.gallery-thumb--active) {
  border-color: rgba(255, 89, 0, 0.4);
}

/* Lightbox */
.gallery-lightbox {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border: none;
  padding: 0;
  margin: 0;
  background: rgba(26, 26, 26, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-lightbox::backdrop {
  background: transparent;
}

.gallery-lightbox:not([open]) {
  display: none;
}

.gallery-lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.gallery-lightbox-close {
  position: absolute;
  top: -2.5rem;
  right: 0;
  background: none;
  border: none;
  color: #FAF3E8;
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.25rem 0.5rem;
}

.gallery-lightbox-close:hover {
  color: #FF5900;
}

.gallery-lightbox-img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 0.5rem;
}
</style>
