<script lang="ts">
  import Footer from "$lib/components/core/Footer.svelte";
  import Header from "$lib/components/core/Header.svelte";
  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";
  import { fly } from "svelte/transition";

  export let data;
  inject({ mode: dev ? 'development' : 'production'})
</script>
<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>
<Header />
  {#key data.url}
    <div 
      in:fly={{y: -50, delay: 300, duration: 300}}
      out:fly={{y: -50, duration: 300}}>
      <slot />
    </div>
  {/key}
<Footer />
