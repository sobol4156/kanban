<template>
  <div class="kanban-board">
    <div v-for="(column, index) in columns" :key="index" class="kanban-column">
      <h2 class="kanban-column-title">{{ column.title }}</h2>
      <ul class="kanban-column-list">
        <li v-for="(task, index) in column.tasks" :key="task+index" class="kanban-task">
          {{ task }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@/types/KanbanBoard';
import { defineProps } from 'vue';

defineProps<{columns: Column[]}>()
</script>
