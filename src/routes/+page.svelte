<script>
    export let form;

    import RadiusForm from "../components/RadiusForm.svelte";
    import RegionForm from "../components/RegionForm.svelte";
    import Results from "../components/Results.svelte";

    import { isRadiusView, allComments } from "../store";

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

    $: if (form) {
        for (const [key, value] of Object.entries(form)) {
            if (key !== 'region' && key !== 'radius') {
                $allComments[key] = value;
            }
        }
        // console.log($allComments);
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
        <RegionForm />
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