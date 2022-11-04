<script setup lang='ts'>import { listApi } from '@/api/tag';

interface TagType {
  id: string,
  name: string,
  type: string
}
const addType = ref('')
const addCType = ref('')
const tagIdList = ref<string[]>([])
const tagList = ref<TagType[]>([])
const tagNameList = ref<string[]>([])
onMounted(() => {
  /* getCategoryListByUid().then(res => {
    categoryList.value = res.data
  }) */
  getTagList()
})

const getTagList = () => {
  listApi().then(res => {
    console.log(1, res.data);
    for (let i = 0; i < res.data.length; i++) {
      const list = res.data[i]
      const tag: TagType = {
        id: '',
        name: '',
        type: 'default'
      }
      tag.id = list.id
      tag.name = list.name
      tagList.value.push(tag)
    }
  })
}


const handleDelTag = (index: number, name: string) => {
  tagNameList.value.splice(index, 1)
  tagIdList.value.splice(index, 1)
  for (let i = 0; i < tagList.value.length; i++) {
    if (tagList.value[i].name === name) {
      tagList.value[i].type = 'default'
      break
    }
  }
}

const showSelector = ref(false)
const handleAddTag = () => {
  showSelector.value = true
}

const tagHandle = (index: number, name: string, id: string) => {
  if (tagList.value[index].type === 'default') {
    tagIdList.value.push(tagList.value[index].id)
    tagNameList.value.push(tagList.value[index].name)
  } else {
    for (let i = 0; i < tagIdList.value.length; i++) {
      if (tagIdList.value[i] === id) {
        tagIdList.value.splice(i, 1)
        tagNameList.value.splice(i, 1)
      }
    }
  }
  tagList.value[index].type = tagList.value[index].type === 'default' ? 'warning' : 'default'
}

const emit = defineEmits(['getTagIdList'])

watch(
  () => tagIdList.value.length,
  () => {
    emit('getTagIdList', tagIdList.value)
  }
)


</script>

<template>
  <div>
    <n-space>
      <n-tag v-for="(tag, index) in tagNameList" type="warning" closable @close="handleDelTag(index, tag)">
        {{ tag }}
      </n-tag>
      <div class="relative">
        <div class="w-100vw h-100vh fixed z-0 top-0 left-0" v-if="showSelector" @click="showSelector = false"></div>
        <div
          class="w-130 min-h-50 z-10000 absolute bottom-12 left-0 light:bg-$light-card-color dark:bg-$dark-card-color rounded-lg"
          v-show="showSelector && tagIdList.length < 5" style="box-shadow: 0 0 30px rgb(0 0 0 / 10%);">
          <div class="py-2 text-center" style="border-bottom: 1px solid #efeff5;">标签</div>
          <div class="px-3 py-1">
            <n-scrollbar class="max-h-100">
              <n-space>
                <n-tag v-for="(tag, index) in tagList" :type="tag.type" class="cursor-pointer"
                  @click="tagHandle(index, tag.name, tag.id)">
                  {{ tag.name }}
                </n-tag>
              </n-space>
            </n-scrollbar>
          </div>
        </div>
        <n-tag v-if="tagIdList.length < 5" :type="addCType" @mouseenter="addCType = 'warning'"
          @mouseleave="addCType = ''" @click="handleAddTag" class="cursor-pointer relative">
          ＋添加文章标签
        </n-tag>
      </div>
    </n-space>
  </div>
</template>

<style lang='scss' scoped>

</style>