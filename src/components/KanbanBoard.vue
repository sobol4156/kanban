<template>
  <div class="kanban-board">
    <div v-for="(column, index) in columns" :key="index" class="kanban-column">
      <div class="kanban-column-block">
        <h2 class="kanban-column-title">{{ column.title }}</h2>
        <ul class="kanban-column-list">
          <li v-for="(task, index) in column.tasks" :key="task + index" class="kanban-task">
            {{ task }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@/types/KanbanBoard'
import { defineProps } from 'vue'

defineProps<{ columns: Column[] }>()
</script>

<style scoped>
.kanban-board {
  display: flex;
  justify-content: space-around;
  min-height: inherit;
}
.kanban-column {
  height: 100%;
  padding: 20px 0;
  border-right: 1px solid white;
  min-height: inherit;
    width: 100%;
  display: flex;
  justify-content: center;
}
.kanban-column-block{
  width: 100%;
}
.kanban-column-title{
  text-align: center;
  border-bottom: 1px solid white;
  margin-bottom: 20px;
}
.kanban-column-list{
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  list-style-type: none;
  gap: 10px;
}
.kanban-task{
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid white;
}
</style>
