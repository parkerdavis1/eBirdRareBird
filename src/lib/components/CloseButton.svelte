<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<div class="w-full flex justify-center my-5">
    <button class="bg-sky-700 px-2 py-1 rounded text-white" on:click={()=> dispatch('close')}>Done</button>
</div>