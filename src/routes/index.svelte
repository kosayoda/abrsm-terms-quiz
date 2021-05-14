<script>
  import Footer from "$lib/components/Footer.svelte";
  import allLanguages from "$lib/resources/terms.json";
  import { shuffle } from "$lib/utils";

  // Types
  type Term = string;
  type Answer = string;
  type Language = string;
  type TermMap = Record<Term, Answer[]>;

  const enum AnswerState {
    RIGHT = "border-green-200",
    WRONG = "border-red-200",
    NONE = "border-gray-200",
  }

  const reset = {
    soft: () => {
      reveal = false;
      value = "";
      answerStyle = AnswerState.NONE;
    },
    hard: () => {
      questions = shuffle(processed);
      index = 0;
      rightCounter = wrongCounter = 0;
      reset.soft();
    },
  };

  const modifyIndex = (delta: number) => {
    index = index + delta;
    reset.soft();
    // Delay for 200 msecs so the input renders before we try to add focus
  };

  function refocus(node: HTMLElement) {
    node.focus();
  }

  const handleKeyup = (event) => {
    if (event.key == "Enter" && value !== "") {
      event.preventDefault();
      let input = value.trim().toLowerCase();
      revealAnswer(meanings.includes(input));
    }
  };

  const revealAnswer = (isCorrect: boolean) => {
    reveal = true;
    if (isCorrect) {
      rightCounter += 1;
      answerStyle = AnswerState.RIGHT;
    } else {
      wrongCounter += 1;
      answerStyle = AnswerState.WRONG;
    }
  };

  const setLang = (lang: string) => {
    language = lang;
    reset.soft();
  };

  const languageMap: Record<Language, TermMap> = allLanguages;
  languageMap["all"] = Object.assign({}, ...Object.values(languageMap));

  const languages = Object.keys(languageMap);
  languages.sort();

  let language = "all";
  $: processed = Object.entries(languageMap[language]);
  $: questions = shuffle(processed);

  let value = "";
  let index = 0;
  $: term = questions[index][0];
  $: meanings = questions[index][1];

  let reveal = false;
  let answerStyle = AnswerState.NONE;
  let rightCounter = 0;
  let wrongCounter = 0;
</script>

<header class="flex justify-center align-middle bg-gray-800">
  <div class="flex flex-col mt-12 space-y-10">
    <h1 class="font-bold text-3xl sm:text-5xl text-gray-200">ABRSM Piano Theory Terms</h1>
    <nav
      class="flex flex-col sm:flex-row justify-between align-middle w-full bg-gray-200 text-gray-500"
    >
      {#each languages as lang}
        <button
          class="{language === lang
            ? 'bg-gray-100'
            : 'bg-gray-200 hover:-mt-2'} font-bold h-full w-full py-4"
          on:click={() => setLang(lang)}
        >
          {lang.toUpperCase()}
        </button>
      {/each}
    </nav>
  </div>
</header>

<section class="flex flex-col justify-center align-middle h-auto pt-16">
  <!-- Question Box -->
  <div class="flex flex-col text-center space-y-4 pb-14">
    <span class="text-lg md:text-2xl">What is the meaning of...</span>
    <span class="break-all text-6xl md:text-8xl mx-8">{term}</span>
  </div>

  <!-- Input box -->
  <div class="flex flex-row justify-center space-x-4 mx-4">
    {#key reveal}
      <input
        id="inp"
        class="max-w-lg w-full p-4 my-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="type your answer here"
        bind:value
        on:keyup|preventDefault={handleKeyup}
        disabled={reveal}
        use:refocus
      />
    {/key}
  </div>

  <!-- Answer box -->
  <div class="flex justify-center mt-10 mx-4">
    <div class="bg-white rounded-lg shadow-md max-w-2xl w-full h-56 border-4 {answerStyle}">
      <!-- Reveal button -->
      <button
        class="h-full w-full text-gray-700 text-2xl {reveal ? 'hidden' : 'block'}"
        on:click={() => revealAnswer(false)}>Click to reveal</button
      >

      <!-- Answer -->
      <div class="flex flex-col justify-center space-y-14 {reveal ? 'block' : 'hidden'} m-10">
        <span class="text-gray-800 text-3xl">{meanings.join(", ")}</span>

        <!-- Question navigation -->
        <div class="flex w-full mx-auto max-w-lg space-x-10">
          <button class="nav-button" disabled={index == 0} on:click={() => modifyIndex(-1)}
            >Previous</button
          >
          <button
            class="nav-button"
            disabled={index == questions.length - 1}
            on:click={() => modifyIndex(1)}>Next</button
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Question index and reset -->
  <div class="flex justify-between items-center max-w-2xl mx-auto w-full pt-6 px-4 pb-16">
    <div class="flex align-middle items-center text-gray-800 space-x-4">
      <button
        class="ml-auto px-4 py-1 border border-gray-200 bg-gray-200 text-gray-700 rounded-md hover:bg-red-500 hover:text-white"
        on:click={reset.hard}>Reset</button
      >
    </div>
    <div class="flex space-x-4 text-gray-700 tabular-nums">
      <span class="inline-flex justify-center items-center bg-green-200 w-10 h-8 rounded-md">
        {rightCounter}
      </span>
      <span class="inline-flex justify-center items-center bg-red-200 w-10 h-8 rounded-md">
        {wrongCounter}
      </span>
      <span class="inline-flex justify-center items-center bg-blue-200 w-20 h-8 rounded-md">
        {index + 1}/{questions.length}
      </span>
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

  .nav-button {
    @apply px-4 py-2 w-full rounded-md;
    @apply border border-gray-700 bg-gray-700 text-white;
    @apply disabled:line-through disabled:opacity-60;
  }

  button:focus {
    outline: none;
  }

  button:focus-visible {
    @apply ring-4;
    @apply ring-blue-400;
  }

  :global(body) {
    @apply bg-gray-100;
    overflow-y: auto;
  }
</style>
