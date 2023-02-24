<script>
    export let form;

    import RadiusForm from "$lib/components/RadiusForm.svelte";
    import RegionForm from "$lib/components/RegionForm.svelte";
    import Results from "$lib/components/Results.svelte";

    import { isRadiusView, allComments, filters } from "$lib/store";

    let birdData = {
        radius: undefined,
        region: undefined
    }

    $: if (form?.radius) {
        birdData.radius = form.radius;
        // console.log('radius bird data success!')
        // console.log('radius bird data', birdData.radius)
    }

    $: if (form?.region) {
        birdData.region = form.region;
        // console.log('region bird data success!')
        // console.log('region bird data', birdData.region)
    }

    let regionData = null;
    $: if (form?.regionResults) {
        regionData = form.regionResults
    }

    $: if (form) {
        for (const [key, value] of Object.entries(form)) {
            if (key !== 'region' && key !== 'radius') {
                $allComments[key] = value;
            }
        }
        // console.log($allComments);
    }
    // clear media only filter if switching to Radius view
    $: if ($isRadiusView) {
        $filters.onlyRichMedia = false;
    }
</script>

{#if $isRadiusView}
    <div class="form-container">
        <RadiusForm />
    </div>
    <Results 
        birdData={birdData.radius}
    />
{:else}
    <div class="form-container">
        <RegionForm 
            regionData={regionData}
        />
    </div>
    <Results 
        birdData={birdData.region}
    />
{/if}

<style lang="postcss">
    .form-container {
        @apply bg-slate-100 dark:bg-slate-800 rounded-b-lg p-4;
    }
</style>