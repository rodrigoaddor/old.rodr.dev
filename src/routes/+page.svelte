<h1 class="caret"><span class="display">rodr</span>.dev</h1>

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
  
  h1
    font-family: "Jetbrains Mono", monospace
    font-size: min(4rem, 10vmin)
  
  .display
    font-size: 2em

  @keyframes blinking-caret
    to
      visibility: hidden

  .caret
    position: relative
  
    &::after
      content: ""
      position: absolute
      display: inline-block
      background: currentColor
      bottom: .1em
      width: .05em
      height: 1.32em
      animation: blinking-caret 1s steps(2, start) infinite
</style>
