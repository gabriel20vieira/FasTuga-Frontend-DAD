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
    <!-- <VerticalNavLink v-show="(userStore.isManager ?? false)" :item="{
      title: 'Dashboard',
      to: 'dashboard',
      icon: { icon: 'mdi-view-dashboard-outline' }
    }" /> -->
    <VerticalNavLink v-if="userStore.isCustomer" :item="{
      title: 'Home',
      to: 'index',
      icon: { icon: 'mdi-home-outline' }
    }" />
    <VerticalNavLink v-show="userStore.isAnonymous || userStore.isCustomer" :item="{
      title: 'Board',
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
    <VerticalNavLink v-show="userStore.isManager || userStore.isCustomer" :item="{
      title: 'Orders',
      to: 'orders-history',
      icon: { icon: 'mdi-clipboard-list-outline' }
    }" />
    <VerticalNavLink v-show="userStore.isChef" :item="{
      title: 'Items history',
      to: 'items-history',
      icon: { icon: 'mdi-nutrition' }
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

    <!-- 👉 Pages -->
    <!-- <VerticalNavSectionTitle v-show="userStore.isAnonymous" :item="{ heading: 'Pages' }" />

    <VerticalNavLink v-show="userStore.isAnonymous" :item="{
      title: 'Login',
      to: 'login',
      icon: { icon: 'mdi-login' }
    }" />
    <VerticalNavLink v-show="userStore.isAnonymous" :item="{
      title: 'Register',
      to: 'register',
      icon: { icon: 'mdi-account-plus-outline' },
    }" /> -->

    <!-- 👉 User Interface -->
    <!-- <div v-if="true">
      <VerticalNavSectionTitle :item="{ heading: 'User Interface' }" />

      <VerticalNavLink :item="{
        title: 'Typography',
        to: 'typography',
        icon: { icon: 'mdi-alpha-t-box-outline' }
      }" />
      <VerticalNavLink :item="{
        title: 'Icons',
        to: 'icons',
        icon: { icon: 'mdi-eye-outline' }
      }" />
      <VerticalNavLink :item="{
        title: 'Cards',
        to: 'card-basic',
        icon: { icon: 'mdi-credit-card-outline' }
      }" />
      <VerticalNavLink :item="{
        title: 'Tables',
        to: 'tables',
        icon: { icon: 'mdi-table' }
      }" />
      <VerticalNavLink :item="{
        title: 'Form Layouts',
        to: 'form-layouts',
        icon: { icon: 'mdi-form-select' }
      }" />
    </div> -->
  </ul>
</template>