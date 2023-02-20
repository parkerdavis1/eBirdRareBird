<script>
    export let data;
    export let form;

    import BirdObservation from "../../../components/BirdObservation.svelte";
    import { allComments } from '../../../store'

    $: if (form) {
        for (const [key, value] of Object.entries(form)) {
            if (key !== 'region' && key !== 'radius') {
                $allComments[key] = value;
            }
        }
        // console.log($allComments);
    }
</script>

<div class="dark:bg-white dark:text-slate-900 bg-slate-900 text-slate-50 text-sm">
    <div class="container mx-auto max-w-5xl
                px-4 py-5
                flex gap-4 h-10 min-h-max items-center 
                bg-inherit text-inherit">
        <button>🌎 Location</button>
        <button>🗓 Time Period</button>
        <button>♨︎ More Filters</button>
    </div>
</div>

<div class="dark:bg-slate-800 dark:text-slate-50 bg-slate-800 text-slate-50">
    <div class="container max-w-5xl
                px-4 py-12
                mx-auto flex flex-row justify-start items-center
                h-20
                ">
        <div class="flex items-baseline gap-x-4 flex-wrap">
            <h1 class="text-4xl font-bold">Rare Bird Alert</h1>
            <h2>{data.location}</h2>
        </div>
    </div>
</div>


<!-- <h1>{form?.location}</h1>
<form action="?/loadBirds" method="POST">
    <label for="days">Days:</label>
    <input type="number" name="days" id="days" min=1 max=30 value=3>
    <button type="submit">Submit</button>
</form> -->
<ul class="container mx-auto max-w-5xl p-4">
    {#each data.birdObs as birdObs (birdObs.obsId)}
    <!-- {#if form} -->
        <!-- {#each form?.birdObs as birdObs} -->
            <li>
                <BirdObservation
                    bird={birdObs}
                ></BirdObservation>
            </li>
        {/each}
    <!-- {/if} -->
</ul>