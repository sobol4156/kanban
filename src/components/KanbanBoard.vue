<template>
  <div class="kanban-board">
    <div v-for="(column, indexColumn) in visibledColumns" :key="indexColumn" class="kanban-column">
      <div :class="['kanban-column-block']" :data-index="indexColumn">
        <h2 class="kanban-column-title">{{ column.title }}</h2>
        <ul class="kanban-column-list">
          <li
            v-for="(task, index) in column.tasks"
            :key="task + index"
            class="kanban-task"
            @mousedown="startDrag(column, index, indexColumn, $event)"
          >
            {{ task }}
          </li>
        </ul>
        <div v-if="draggedTask" :style="floatingStyle" class="kanban-task">
          {{ draggedTask }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Column } from '@/types/KanbanBoard'
import { computed, defineProps } from 'vue'
import { ref, reactive } from 'vue'

const props = defineProps<{ columns: Column[] }>()

const draggedTask = ref<string | null>(null)
const cursorPosition = reactive({ x: 0, y: 0 })
const visibledColumns = ref<Column[]>(props.columns)
const currentColumns = ref<number | null>(null)

const floatingStyle = computed(() => ({
  position: 'absolute' as const,
  top: `${cursorPosition.y}px`,
  left: `${cursorPosition.x}px`,
  pointerEvents: 'none' as const,
  zIndex: 1000,
}))

const startDrag = (column: Column, index: number, indexColumn: number, event: MouseEvent) => {
  draggedTask.value = column.tasks[index]
  currentColumns.value = indexColumn
  updateCursorPosition(event)

  const copyColumns = JSON.parse(JSON.stringify(visibledColumns.value))

  visibledColumns.value[currentColumns.value].tasks = copyColumns[
    currentColumns.value
  ].tasks.filter((el: string) => el !== draggedTask.value)

  document.body.style.userSelect = 'none'

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', stopDrag)
}

const updateCursorPosition = (event: MouseEvent) => {
  cursorPosition.x = event.clientX + 10
  cursorPosition.y = event.clientY + 10
}

const onMouseMove = (event: MouseEvent) => {
  updateCursorPosition(event)
}
const stopDrag = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const closestElement = target.closest('[data-index]') as HTMLElement

  if (closestElement) {
    const targetIndex = closestElement.dataset.index

    if (targetIndex !== undefined && draggedTask.value) {
      currentColumns.value = Number(targetIndex)
      visibledColumns.value[currentColumns.value].tasks.push(draggedTask.value)
    }
  }

  draggedTask.value = null
  document.body.style.userSelect = ''

  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', stopDrag)
}
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
.kanban-column-block {
  width: 100%;
}
.kanban-column-title {
  text-align: center;
  border-bottom: 1px solid white;
  margin-bottom: 20px;
}
.kanban-column-list {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  list-style-type: none;
  gap: 10px;
}
.kanban-task {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid white;
  cursor: pointer;
  user-select: none;
}
</style>
