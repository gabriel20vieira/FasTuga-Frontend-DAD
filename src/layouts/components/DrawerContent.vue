<script setup>
import logo from '@/assets/logo.svg?raw';
import { useUserStore } from "@/stores/user";
import { VerticalNavLink, VerticalNavSectionTitle } from '@layouts';

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
    <VerticalNavLink :item="{
      title: 'Home',
      to: 'index',
      icon: { icon: 'mdi-home-outline' }
    }" />
    <VerticalNavLink v-show="(userStore.isManager ?? false)" :item="{
      title: 'Dashboard',
      to: 'dashboard',
      icon: { icon: 'mdi-view-dashboard-outline' }
    }" />

    <!-- 👉 Pages -->
    <VerticalNavSectionTitle v-show="userStore.isAnonymous" :item="{ heading: 'Pages' }" />

    <VerticalNavLink v-show="userStore.isAnonymous" :item="{
      title: 'Login',
      to: 'login',
      icon: { icon: 'mdi-login' }
    }" />
    <VerticalNavLink v-show="userStore.isAnonymous" :item="{
      title: 'Register',
      to: 'register',
      icon: { icon: 'mdi-account-plus-outline' },
    }" />

    <VerticalNavLink v-show="(userStore.isManager ?? false)" :item="{
      title: 'Statistics',
      to: 'statistics',
      icon: { icon: 'mdi-account-details-outline' }
    }" />
    <VerticalNavLink v-show="(userStore.isManager ?? false)" :item="{
      title: 'Employees',
      to: 'users',
      icon: { icon: 'mdi-account-group-outline' }
    }" />
    <VerticalNavLink v-show="userStore.isAnonymous || userStore.isCustomer" :item="{
      title: 'Menu',
      to: 'menu',
      icon: { icon: 'mdi-hamburger' }
    }" />

    <!-- 👉 User Interface -->
    <div v-if="false">
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
    </div>
  </ul>
</template>