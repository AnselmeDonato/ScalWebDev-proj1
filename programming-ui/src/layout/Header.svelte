<script>
  import { userUuid } from "../stores/stores.js";
</script>

<nav class="p-4 mb-4 shadow">
  <span class="text-2xl text-gray-700 font-serif"></span>
</nav>


<div class="p-4 mb-4 lg:flex lg:items-center lg:justify-between">
  <div class="min-w-0 flex-1">
    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Hello {$userUuid}! </h2>
  </div>
</div>
