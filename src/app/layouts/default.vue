<script setup lang="ts">
import { useAuthState } from "@shared/auth";

import { Footer } from "@widgets/footer";
import { Header } from "@widgets/header";

const authState = useAuthState();
await authState.ensureSessionChecked();
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <Header />

    <main id="main-content">
      <slot />
    </main>

    <Footer />
  </div>
</template>
