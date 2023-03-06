<script lang="ts">
	export const prerender = true;

	import '@fontsource/jetbrains-mono';
	import 'normalize.css';
</script>

<svelte:head>
	<title>rodr.dev</title>
</svelte:head>

<slot />

<style lang="sass">
  :global(body)
    display: grid
    place-items: center
    width: 100vw
    height: 100vh
    background: #263238
    color: #FAFAFA

  *:focus-visible
    outline: none
</style>
