<template>
  <main class="main">
    <KanbanBoard :columns="columns" />
  </main>
</template>

<script setup lang="ts">
import KanbanBoard from '@/components/KanbanBoard.vue'

const columns = [
  { id: 1, title: 'To Do', tasks: ['сделать то', 'сделать сё'] },
  { id: 2, title: 'In Progress', tasks: ['делается'] },
  { id: 3, title: 'Done', tasks: ['сделали'] },
]
</script>

<style scoped>
.main{
  min-height: inherit;
}
</style>