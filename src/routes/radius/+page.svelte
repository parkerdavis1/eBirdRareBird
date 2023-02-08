<script>
    export let form

    import RadiusForm from "../../components/RadiusForm.svelte";
    import Results from '../../components/Results.svelte'

    import { allComments } from '../../store'

    let birdData;
    let filters = {
        showAll: true,
        hideUnconfirmed: false,
        sortType: null
    }

    $: if (form?.radius) {
        birdData = form.radius;
        console.log('bird data success!')
        console.log('bird data', birdData)
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

<RadiusForm />

<Results 
    birdData={birdData}
/>