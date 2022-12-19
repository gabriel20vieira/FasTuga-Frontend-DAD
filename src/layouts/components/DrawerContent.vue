<script setup>
import logo from '@/assets/logo.svg?raw';
import { useUserStore } from "@/stores/user";
import { VerticalNavLink } from '@layouts';

const userStore = useUserStore()
</script>

<template>
  <!-- 👉 Nav header -->
  <div class="nav-header">
    <RouterLink to="/" class="app-logo d-flex align-center gap-x-3 app-title-wrapper">
      <div v-html="logo" />
    </RouterLink>
  </div>

  <!-- 👉 Nav items -->
  <ul>
    <VerticalNavLink v-if="userStore.isCustomer" :item="{
      title: 'Home',
      to: 'index',
      icon: { icon: 'mdi-home-outline' }
    }" />
    <VerticalNavLink v-show="userStore.isAnonymous || userStore.isCustomer" :item="{
      title: 'Public Board',
      to: 'board',
      icon: { icon: 'mdi-clipboard-list-outline' }
    }" />
    <VerticalNavLink v-show="userStore.isChef" :item="{
      title: 'Board',
      to: 'board-chef',
      icon: { icon: 'mdi-clipboard-list-outline' }
    }" />
    <VerticalNavLink v-show="userStore.isDelivery" :item="{
      title: 'Board',
      to: 'delivery-board',
      icon: { icon: 'mdi-clipboard-list-outline' }
    }" />
    <VerticalNavLink v-show="userStore.isAnonymous || userStore.isCustomer" :item="{
      title: 'Menu',
      to: 'menu',
      icon: { icon: 'mdi-food-outline' }
    }" />
    <VerticalNavLink v-show="userStore.isManager" :item="{
      title: 'Menu',
      to: 'manage-menu',
      icon: { icon: 'mdi-food-outline' }
    }" />
    <VerticalNavLink v-show="userStore.isManager" :item="{
      title: 'Statistics',
      to: 'statistics',
      icon: { icon: 'mdi-chart-timeline-variant' }
    }" />
    <VerticalNavLink v-show="userStore.isManager" :item="{
      title: 'Employees',
      to: 'users',
      icon: { icon: 'mdi-account-group-outline' }
    }" />
    <VerticalNavLink v-show="userStore.isManager || userStore.isCustomer || userStore.isDelivery" :item="{
      title: userStore.isCustomer ? 'My Orders' : 'Order History',
      to: 'orders-history',
      icon: { icon: 'mdi-nutrition' }
    }" />
    <VerticalNavLink v-show="userStore.isChef" :item="{
      title: 'Cooking History',
      to: 'items-history',
      icon: { icon: 'mdi-nutrition' }
    }" />
  </ul>
</template>