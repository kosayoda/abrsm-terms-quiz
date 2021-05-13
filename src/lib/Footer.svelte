<script lang="ts">
  import info from "$lib/info";
  const { github, email } = info;
</script>

<footer class="bg-gray-800 flex flex-col text-center py-10 mt-8 space-y-6">
  <div class="flex flex-row justify-center space-x-5">
    <a href="mailto:{email}" class="email">
      <!-- prettier-ignore -->
      <svg class="w-8 fill-current text-gray-200 hover:text-gray-300 stroke-current text-gray-200 hover:text-gray-400" id="email-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256"/><rect class="fill-current text-gray-800" width="356" height="256" x="78" y="128" rx="8%"/><path fill="none" stroke-width="20" d="M434 128 269 292c-7 8-19 8-26 0L78 128m0 256 129-128m227 128L305 256"/></svg>
    </a>
    <a href={github} class="github">
      <!-- prettier-ignore -->
      <svg class="w-8 fill-current text-gray-200 hover:text-gray-300" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
    </a>
  </div>
  <span class="text-lg text-gray-200">Made by kosayoda.</span>
</footer>
