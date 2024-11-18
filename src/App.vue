<template>
  <header>

  </header>

  <main>
    <KanbanBoard :columns="columns" />
  </main>
</template>

<script setup lang="ts">
import KanbanBoard from '@/components/KanbanBoard.vue'

const columns = [
  { id: 1, title: 'To Do', tasks: [] },
  { id: 2, title: 'In Progress', tasks: [] },
  { id: 3, title: 'Done', tasks: [] },
]
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
