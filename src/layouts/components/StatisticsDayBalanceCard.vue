<script setup>
import { defineProps, toRefs } from 'vue';
const props = defineProps(['title', 'statistics', 'isLoading'])
const { title, statistics } = toRefs(props)
</script>

<template>
  <VCard>
    <VProgressLinear indeterminate v-if="props.isLoading"/>
    <VCardItem >
      <VCardTitle>{{ title }}</VCardTitle>
    </VCardItem>

    <VCardText class="mt-4">
      <VRow>
        <VCol v-for="item in statistics" :key="item.title" cols="6" sm="3" style="align-self: center;">
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar :color="item.color" rounded size="42" class="elevation-1">
                <VIcon size="24" :icon="item.icon" />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption" style="line-height: normal;">
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
