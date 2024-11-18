<template>
  <div class="kanban-board">
    <div v-for="(column, index) in columns" :key="index">
      <h2 class="kanban-column-title">{{ column.title }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@/types/KanbanBoard';
import { defineProps } from 'vue';

defineProps<{columns: Column[]}>()
</script>
