<template>
    <div>
        <label for="threshold">Last:</label>
        <select id="threshold" v-model="selected" @change="adjustThreshold($event)">
            <option value="" selected disabled>Choose</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.text }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        methods: {
            adjustThreshold(event) {
                this.$emit('changed', event);
            }
        },
        props: {
            selected: {
                type: Object,
                default: null
            },
            options: {
                type: Object,
                default: null
            }
        },
    }
</script>