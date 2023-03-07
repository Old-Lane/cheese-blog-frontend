<script setup lang='ts'>
import { DataTableColumns, DataTableRowKey, NButton } from 'naive-ui';

const createColumns = ({
  play
}: {
  play: (row: CommentType) => void
}): DataTableColumns<CommentType> => {
  return [
    {
      type: 'selection'
    },
    {
      title: '头像',
      key: 'avatar'
    }, {
      title: '昵称',
      key: 'nickname'
    },
    {
      title: '文章',
      key: 'title'
    },
    {
      title: '内容',
      key: 'content'
    },
    {
      title: '时间',
      key: 'createTime'
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            type: 'error',
            strong: true,
            size: 'small',
            onClick: () => play(row)
          },
          { default: () => '删除' }
        )
      }
    }
  ]
}

const columns = createColumns({
  play(row: CommentType) {

  }
})

const data = ref([
  {

  }
])

const checkedRowKeys = ref<DataTableRowKey[]>([])

const handleCheck = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeys.value = rowKeys
}

const rowKey = (row: CommentType) => row.id


</script>

<template>
  <div>
    <h1 class="text-3xl font-700 mb-10">评论管理</h1>
    <n-data-table :row-key="rowKey" @update:checked-row-keys="handleCheck" :columns="columns" :data="data" />
  </div>
</template>

<style lang='scss' scoped></style>