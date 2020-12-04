<template>
  <div>Hello world</div>
</template>

<script lang='ts'>
/**
 * @vue-data {String} [foo=bar] Foo description
 */
export default {
  name: 'Component',
  data(): { foo: string } {
    return {
      foo: 'bar'
    }
  },
}
</script>
