<script>
    import AltRegionForm from '$lib/components/AltRegionForm.svelte'
    import RegionForm from '$lib/components/RegionForm.svelte'
    import DaysPicker from '$lib/components/DaysPicker.svelte';
    import { region } from '$lib/store';

    export let form

    $: regionData = form?.regionResults
    $: searchInput = form?.searchInput
</script>

<div class="container mx-auto my-10 h-[80vh] h-[80svh] grid place-content-center w-full p-4">

    <div class="flex flex-wrap justify-center">
        <pre class="select-none">
  __    _   __   ___  
  )_)  /_)  )_)  )_   
 / \  / /  / \  (__   
        </pre>
        <pre class="select-none">
  __   ___  __   __   
  )_)   )   )_)  ) )  
 /__) _(_  / \  /_/   
        </pre>
        <pre class="select-none">
   _       ___  __  ___  
  /_)  )   )_   )_)  )   
 / /  (__ (__  / \  (    
        </pre>
    </div>

    <div class="my-10">
        <AltRegionForm 
            regionData={regionData}
            searchInput={searchInput}
        />
    </div>
    <div class="mx-auto">
        <DaysPicker home={true} />
    </div>
    <!-- <form method="POST" id="region" action="?/region" class="flex flex-col flex-wrap align-center">
        <input type="hidden" name="regionId" bind:value={$region.region}>
        <label for="days">Time period (days ago): {$region.days}</label>
        <input type="range" name="days" id="days" min="1" max="30" form="region" bind:value={$region.days}>
    </form> -->
</div>