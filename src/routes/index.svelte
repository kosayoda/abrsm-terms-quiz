<script lang="ts">
    import { italian, german, french } from "$lib/terms.json";

    function preprocess(questions: Record<string, string[]>) {
        return Object.entries(questions);
    }

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
    }

    const inc = () => {
        if (index < questions.length - 1) {
            index = index + 1;
            reveal = false;
            value = "";
            document.getElementById("inp").value = "";
            document.getElementById("inp").focus();
        }
    };
    const dec = () => {
        if (index > 0) {
            index = index - 1;
            reveal = false;
            value = "";
            document.getElementById("inp").value = "";
            document.getElementById("inp").focus();
        }
    };
    const reset = () => {
        questions = shuffle(processed);
        index = 0;
        reveal = false;
        value = "";
    };

    const handleKeyup = (event) => {
        if (event.key == "Enter" && value !== "") {
            event.preventDefault();
            reveal = true;
        }
    }
    const setLang = (lang, str) => {
        reveal = false;
        index = 0;
        language = lang;
        langString = str;
    }
    const all = { ...italian, ...german, ...french };

    let value = "";
    let index = 0;
    let language = all;
    let langString = "all";
    $: processed = preprocess(language);
    $: questions = shuffle(processed);

    $: term = questions[index][0];
    $: ans = questions[index][1].join(", ");
    $: strikeMin = (index == 0) ? "opacity-60 line-through" : "hover:bg-gray-800";
    $: strikeMax = (index == questions.length - 1) ? "opacity-60 line-through" : "hover:bg-gray-800";

    let reveal = false;
    $: contentReveal = reveal ? "visible" : "invisible";
    $: buttonReveal = reveal ? "hidden" : "block";
</script>

<header class="flex justify-center align-middle bg-gray-800">
    <div class="flex flex-col mt-8 space-y-10">
        <h1 class="text-2xl sm:text-5xl text-gray-200">ABRSM Piano Theory Terms</h1>
        <nav class="flex flex-col sm:flex-row justify-between align-middle w-full bg-gray-100 text-gray-500 sm:space-x-4">
            <button class="{langString === 'all' ? 'italic' : ''} font-bold hover:text-gray-700 hover:underline h-full w-full py-4" on:click={() => setLang(all, "all")}>
                ALL TERMS
            </button>
            <button class="{langString === 'italian' ? 'italic' : ''} font-bold hover:text-gray-700 hover:underline h-full w-full py-4" on:click={() => setLang(italian, "italian")}>
                ITALIAN
            </button>
            <button class="{langString === 'german' ? 'italic' : ''} font-bold hover:text-gray-700 hover:underline h-full w-full py-4" on:click={() => setLang(german, "german")}>
                GERMAN
            </button>
            <button class="{langString === 'french' ? 'italic' : ''} font-bold hover:text-gray-700 hover:underline h-full w-full py-4" on:click={() => setLang(french, "french")}>
                FRENCH
            </button>
        </nav>
    </div>
</header>

<section class="flex flex-col justify-center align-middle h-auto pt-20">
    <div class="flex flex-col text-center">
        <span class="text-2xl">What is the meaning of...</span>
        <span class="text-8xl my-8">{term}</span>
    </div>
    <div class="flex flex-row justify-center pt-6 space-x-4">
        <input id="inp" class="max-w-lg w-full p-4 my-2 border border-gray-300 rounded-md" type="text" placeholder="place your answer here" bind:value on:keyup|preventDefault={handleKeyup}/>
    </div>


    <div class="flex justify-center mt-10">
        <div class="bg-white rounded-lg shadow-md max-w-2xl w-full h-56">
            <button class="block h-full w-full text-gray-700 text-2xl {buttonReveal}" on:click={() => reveal = true}>Click to reveal</button>
            <div class="flex flex-col justify-center space-y-14 {contentReveal} m-10">
                <span class="text-gray-800 text-3xl">{ans}</span>

                <div class="flex w-full mx-auto max-w-lg space-x-10">
                    <button class="px-4 py-2 w-full border border-gray-700 bg-gray-700 text-white rounded-md  {strikeMin}" on:click={dec}>Previous</button>
                    <button class="px-4 py-2 w-full border border-gray-700 bg-gray-700 text-white rounded-md  {strikeMax}" id="nextbtn" on:click={inc}>Next</button>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-row justify-between max-w-2xl mx-auto w-full pt-6">
        <span class="ml-4 text-gray-700">{index + 1} / {questions.length}</span>
        <button class="px-4 py-1 border border-gray-200 bg-gray-200 text-gray-700 rounded-md hover:bg-red-500 hover:text-white" on:click={reset}>Reset</button>
    </div>
</section>

<style>
    button:focus-visible {
        outline: none;
        @apply ring-4;
        @apply ring-red-400;
    }

    :global(body) {
        @apply bg-gray-100;
        overflow-y: auto;
    }
</style>
