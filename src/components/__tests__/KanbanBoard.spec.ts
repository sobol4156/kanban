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
});