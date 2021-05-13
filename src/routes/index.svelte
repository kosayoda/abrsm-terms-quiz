<script lang="ts">
  import Footer from "$lib/Footer.svelte";
  import { italian, german, french } from "$lib/terms.json";

  function preprocess(questions: Record<string, string[]>) {
    return Object.entries(questions);
  }

  // Stolen from stackoverflow
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  const inc = () => {
    if (index < questions.length - 1) {
      _reset();
      index = index + 1;
      // Delay for 200 msecs so the input renders before we try to add focus
      setTimeout(
        function() {document.getElementById("inp").focus()}, 200
      );
    }
  };

  const dec = () => {
    if (index > 0) {
      _reset();
      index = index - 1;
      setTimeout(
        function() {document.getElementById("inp").focus()}, 200
      );
    }
  };

  const reset = () => {
    questions = shuffle(processed);
    index = 0;
    rightCounter = 0;
    wrongCounter = 0;
    _reset();
  };

  const _reset = () => {
    reveal = false;
    value = "";
    answerStyle = AnswerState.NONE;
  }

  const handleKeyup = (event) => {
    if (event.key == "Enter" && value !== "") {
      event.preventDefault();
      reveal = true;
      if (questions[index][1].includes(value.trim().toLowerCase())) {
        answerStyle = AnswerState.RIGHT;
        rightCounter += 1;
      } else {
        _wrong();
      }
    }
  };

  const _wrong = () => {
    answerStyle = AnswerState.WRONG;
    wrongCounter += 1;
  }

  const setLang = (lang, str) => {
    _reset();
    rightCounter = 0;
    wrongCounter = 0;
    language = lang;
    langString = str;
    answerStyle = AnswerState.NONE;
  };
  const all = { ...italian, ...german, ...french };

  let value = "";
  let index = 0;
  let language = all;
  let langString = "all";
  $: processed = preprocess(language);
  $: questions = shuffle(processed);

  $: term = questions[index][0];
  $: ans = questions[index][1].join(", ");
  $: strikeMin = index == 0 ? "opacity-60 line-through" : "hover:bg-gray-800";
  $: strikeMax = index == questions.length - 1 ? "opacity-60 line-through" : "hover:bg-gray-800";

  let reveal = false;
  $: contentReveal = reveal ? "block" : "hidden";
  $: buttonReveal = reveal ? "hidden" : "block";

  const enum AnswerState {
    RIGHT = "border-green-200",
    WRONG = "border-red-200",
    NONE = "border-gray-200",
  }
  let answerStyle = AnswerState.NONE;
  let rightCounter = 0;
  let wrongCounter = 0;
</script>

<header class="flex justify-center align-middle bg-gray-800">
  <div class="flex flex-col mt-12 space-y-10">
    <h1 class="font-bold text-2xl sm:text-5xl text-gray-200">ABRSM Piano Theory Terms</h1>
    <nav
      class="flex flex-col sm:flex-row justify-between align-middle w-full bg-gray-200 text-gray-500 sm:space-x-4"
    >
      <button
        class="{langString === 'all'
          ? 'bg-gray-100'
          : 'bg-gray-200'} font-bold hover:ibg-gray-700 hover:underline h-full w-full py-4"
        on:click={() => setLang(all, "all")}
      >
        ALL TERMS
      </button>
      <button
        class="{langString === 'italian'
          ? 'bg-gray-100'
          : 'bg-gray-200'} font-bold hover:text-gray-700 hover:underline h-full w-full py-4"
        on:click={() => setLang(italian, "italian")}
      >
        ITALIAN
      </button>
      <button
        class="{langString === 'german'
          ? 'bg-gray-100'
          : 'bg-gray-200'} font-bold hover:text-gray-700 hover:underline h-full w-full py-4"
        on:click={() => setLang(german, "german")}
      >
        GERMAN
      </button>
      <button
        class="{langString === 'french'
          ? 'bg-gray-100'
          : 'bg-gray-200'} font-bold hover:text-gray-700 hover:underline h-full w-full py-4"
        on:click={() => setLang(french, "french")}
      >
        FRENCH
      </button>
    </nav>
  </div>
</header>

<section class="flex flex-col justify-center align-middle h-auto pt-20">
  <!-- Question Box -->
  <div class="flex flex-col text-center space-y-4">
    <span class="text-lg md:text-2xl">What is the meaning of...</span>
    <span class="break-all text-6xl md:text-8xl mx-8">{term}</span>
  </div>

  <!-- Input box -->
  <div class="flex flex-row justify-center pt-6 space-x-4 mx-4">
    <input
      id="inp"
      class="max-w-lg w-full p-4 my-2 border border-gray-300 rounded-md"
      type="text"
      placeholder="place your answer here"
      bind:value
      on:keyup|preventDefault={handleKeyup}
      disabled={reveal}
    />
  </div>

  <!-- Answer box -->
  <div class="flex justify-center mt-10 mx-8">
    <div class="bg-white rounded-lg shadow-md max-w-2xl w-full h-56 border-4 {answerStyle}">
      <!-- Reveal button -->
      <button
        class="h-full w-full text-gray-700 text-2xl {buttonReveal}"
        on:click={() => { reveal = true; _wrong()}}>Click to reveal</button
      >

      <!-- Answer -->
      <div class="flex flex-col justify-center space-y-14 {contentReveal} m-10">
        <span class="text-gray-800 text-3xl">{ans}</span>

        <!-- Question navigation -->
        <div class="flex w-full mx-auto max-w-lg space-x-10">
          <button
            class="px-4 py-2 w-full border border-gray-700 bg-gray-700 text-white rounded-md  {strikeMin}"
            on:click={dec}>Previous</button
          >
          <button
            class="px-4 py-2 w-full border border-gray-700 bg-gray-700 text-white rounded-md  {strikeMax}"
            id="nextbtn"
            on:click={inc}>Next</button
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Question index and reset -->
  <div class="flex justify-between items-center max-w-2xl mx-auto w-full pt-6 px-4 pb-20">
    <span class="flex align-middle text-gray-700">{index + 1} / {questions.length}</span>
    <div class="flex align-middle items-center">
        <span class="mr-10 text-gray-700 space-x-4">
            <svg class="inline w-6 h-6 fill-current text-green-500" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
            <span class="inline-flex align-middle">{rightCounter}</span>
            <svg class="inline w-5 h-5 fill-current text-red-500" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
            <span class="inline-flex align-middle">{wrongCounter}</span>
        </span>
        <button class="px-4 py-1 border border-gray-200 bg-gray-200 text-gray-700 rounded-md hover:bg-red-500 hover:text-white" on:click={reset}>Reset</button>
    </div>
  </div>
</section>

<Footer />

<style>
  input:focus-visible {
    outline: none;
    @apply ring-2;
    @apply ring-blue-400;
  }

  button:focus-visible {
    outline: none;
    @apply ring-4;
    @apply ring-blue-400;
  }

  :global(body) {
    @apply bg-gray-100;
    overflow-y: auto;
  }
</style>
