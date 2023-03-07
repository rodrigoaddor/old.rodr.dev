<script lang="ts">
	import { animationState, type AnimationState } from './store';

	const steps = {
		forwards: [
			'*rodr|*.dev',
			'*rodr|*dev',
			'*rodr|*ev',
			'*rodr|*v',
			'*rodr|*',
			'*rodr|*',
			'*rodr|*',
			'*rodr|*',
			'*rodr|*',
			'*rod|_r_*',
			'*ro|_dr_*',
			'*r|_odr_*',
			'*_|rodr_*',
			'*_|rodr_*',
			'_|rodr_',
			'_|rodr_',
			'rodr|',
			'rodr|',
			'rodri|',
			'rodrig|',
			'rodrigo|',
			'rodrigo|',
			'rodrigo|',
			'rodrigo|',
			'rodrigo |',
			'rodrigo* a|*',
			'rodrigo* ad|*',
			'rodrigo* add|*',
			'rodrigo* addo|*',
			'rodrigo* addor|*',
			'rodrigo* addor|*',
			'rodrigo* addor|*',
			'rodrigo* addor|*',
			'rodrigo* addor|*',
			'rodrigo* addor|*',
			'rodrigo* addo|r*',
			'rodrigo* add|or*',
			'rodrigo* ad|dor*',
			'rodrigo* a|ddor*',
			'rodrigo* |addor*',
			'rodrigo|* addor*'
		],
		backwards: [
			'rodrigo|* addor*',
			'rodrigo|*addor*',
			'rodrigo|*addor*',
			'rodrigo|*addor*',
			'rodrigo|*ddor*',
			'rodrigo|*dor*',
			'rodrigo|*or*',
			'rodrigo|*r*',
			'rodrigo|',
			'rodrigo|',
			'rodrigo|',
			'rodrigo|',
			'rodrigo|',
			'rodrig|',
			'rodri|',
			'rodr|',
			'rodr|',
			'rodr|',
			'rod_|r_',
			'ro_|dr_',
			'r_|odr_',
			'_|rodr_',
			'_|rodr_',
			'_|rodr_',
			'*_|rodr_*',
			'*_|rodr_*',
			'*_|rodr_*',
			'*rodr|*',
			'*rodr|*',
			'*rodr|*',
			'*rodr*.|',
			'*rodr*.d|',
			'*rodr*.de|',
			'*rodr*.dev|',
			'*rodr*.dev|',
			'*rodr*.dev|',
			'*rodr*.dev|',
			'*rodr*.de|v',
			'*rodr*.d|ev',
			'*rodr*.|dev',
			'*rodr|*.dev'
		]
	};

	let currentText = steps[$animationState][steps[$animationState].length - 1];

	const renderAsHTML = (text: string) => {
		const newText = text
			.replace(/[^*_]\|/g, (match) => `<span class="caret">${match.slice(0, -1)}</span>`)
			.replace(
				/[*_]\|./g,
				(match) => `${match[0]}<span class="caret before">${match.slice(2)}</span>`
			)
			.replace(/\*[^*]+\*/g, (match) => `<span class="highlight">${match.slice(1, -1)}</span>`)
			.replace(/\_[^_]+\_/g, (match) => `<span class="select">${match.slice(1, -1)}</span>`);

		return newText;
	};

	let currentStep = 0;
	let interval: number;

	const animate = (direction: AnimationState) => {
		$animationState = direction;
		clearInterval(interval);
		interval = setInterval(() => {
			currentStep++;
			if (currentStep >= steps[direction].length) {
				currentStep = 0;
				clearInterval(interval);
				return;
			}

			currentText = steps[direction][currentStep];
		}, 150);
	};

	const toggleAnimation = () => {
		if ($animationState === 'forwards') {
			animate('backwards');
		} else {
			animate('forwards');
		}
	};
</script>

<h1 on:click={toggleAnimation}>
	{@html renderAsHTML(currentText)}
</h1>

<style lang="sass">
  @keyframes blinking-caret
    to
      visibility: hidden

  h1
    font-family: 'Inter', sans-serif
    display: flex
    align-items: baseline
    width: 100%
    border: 0 solid transparent
    border-width: 8rem 0
    justify-content: center
    font-size: min(6rem, 10vmin)
    font-weight: 100
    white-space: pre    
    user-select: none
  
  :global(.highlight)
    font-weight: 700
    letter-spacing: normal
 
  :global(.select)
    background: transparentize(#2196F3, 0.5)

  :global(.caret)
    position: relative
  
  :global(.caret:not(.before)::after)
      content: ""
      position: absolute
      display: inline-block
      background: currentColor
      bottom: 0
      right: -.05em
      width: .02em
      height: 1.32em
      animation: blinking-caret 1s steps(2, start) infinite

  :global(.caret.before::before)
    content: ""
    position: absolute
    display: inline-block
    background: currentColor
    bottom: 0
    width: .02em
    height: 1.32em
    animation: blinking-caret 1s steps(2, start) infinite


</style>
