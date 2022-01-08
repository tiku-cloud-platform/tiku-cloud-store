<template>
  <div>
    <!--    <div v-if="row[prop] instanceof Object">-->
    <!--      asd-->
    <!--    </div>-->
    <!--    <span v-else>{{ row[prop] }}</span>-->
    <span v-if="row[prop] instanceof Object">
      <div v-for="item in row[prop]">
        {{ item }}
      </div>
    </span>
    <span v-else>{{ row[prop] }}</span>
  </div>
</template>

<script>
export default {
  name: 'ICell',
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped></style>

