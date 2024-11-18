import { mount } from '@vue/test-utils';
import KanbanBoard from '@/components/KanbanBoard.vue';
import { describe, it, expect } from 'vitest';

describe('KanbanBoard', () => {
  it('должен отображать переданные колонки', () => {
    const columns = [
      { id: 1, title: 'To Do', tasks: [] },
      { id: 2, title: 'In Progress', tasks: [] },
      { id: 3, title: 'Done', tasks: [] },
    ];
    const wrapper = mount(KanbanBoard, {
      props: { columns }
    });

    const columnsTitles = wrapper.findAll('.kanban-column-title').map((el) => el.text());
    expect(columnsTitles).toEqual(['To Do', 'In Progress', 'Done'])
  });

  it('должен показывать задачи в колонках', () => {
    const columns = [
      { id: 1, title: 'To Do', tasks: ['Task 1', 'Task 2'] },
      { id: 2, title: 'In Progress', tasks: ['Task 3'] },
    ];

    const wrapper = mount(KanbanBoard, {
      props: {columns}
    });

    const firstColumn = wrapper.findAll('.kanban-column')[0];

    const firstColumnsTasks = firstColumn.findAll('.kanban-task').map((el) => el.text());
    expect(firstColumnsTasks).toEqual(['Task 1', 'Task 2'])
  })
});