<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps(['title', 'statistics', 'text'])
const { title, statistics, text } = toRefs(props)
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>{{ title }}</VCardTitle>
    </VCardItem>

    <VCardText>
      <h6 class="text-sm mb-12">
        <span>{{ text }}</span>
      </h6>

      <VRow>
        <VCol v-for="item in statistics" :key="item.title" cols="6" sm="3">
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar :color="item.color" rounded size="42" class="elevation-1">
                <VIcon size="24" :icon="item.icon" />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption">
                {{ item.title }}
              </span>
              <span class="text-h6 font-weight-medium">{{ item.stats }}</span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
