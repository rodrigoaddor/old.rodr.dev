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
    font-family: 'Inter', sans-serif
    

  *:focus-visible
    outline: none
</style>
