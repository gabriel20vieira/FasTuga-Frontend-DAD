<script setup>
import logo from '@/assets/logo.svg?raw';
import { useUserStore } from "@/stores/user";
import {
  VerticalNavLink,
  VerticalNavSectionTitle
} from '@layouts';
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
      title: 'Dashboard',
      to: 'index',
      icon: { icon: 'mdi-home-outline' }
    }" />
    <VerticalNavLink v-if="false" :item="{
      title: 'Account Settings',
      to: 'account-settings',
      icon: { icon: 'mdi-account-cog-outline' }
    }" />
    <VerticalNavLink :item="{
      title: 'Employees',
      to: 'users',
      icon: { icon: 'mdi-account-group-outline' }
    }" />

    <!-- 👉 Pages -->
    <VerticalNavSectionTitle v-show="!useUserStore().user" :item="{ heading: 'Pages' }" />
    <VerticalNavLink v-show="!useUserStore().user" :item="{
      title: 'Login',
      to: 'login',
      icon: { icon: 'mdi-login' }
    }" />
    <VerticalNavLink v-show="!useUserStore().user" :item="{
      title: 'Register',
      to: 'register',
      icon: { icon: 'mdi-account-plus-outline' },
    }" />

    <!-- 👉 User Interface -->
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
  </ul>
</template>