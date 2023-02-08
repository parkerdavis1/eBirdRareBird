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
        console.log('radius bird data success!')
        console.log('radius bird data', birdData.radius)
    }

    $: if (form?.region) {
        birdData.region = form.region;
        console.log('region bird data success!')
        console.log('region bird data', birdData.region)
    }

    $: if (form) {
        for (const [key, value] of Object.entries(form)) {
            if (key !== 'region' && key !== 'radius') {
                $allComments[key] = value;
            }
        }
        // console.log(allComments);
    }
</script>
    {#if $isRadiusView}
        <RadiusForm />
        <Results 
            birdData={birdData.radius}
        />
    {:else}
        <RegionForm />
        <Results 
            birdData={birdData.region}
        />
    {/if}
