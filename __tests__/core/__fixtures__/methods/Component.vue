<template lang="pug">
  q-input.form-password-input__password-input(
    ref="input"
    :value="value"
    @input="$emit('input', $event)"
    :label="label"
    :type="visible || noTypePassword ? 'text' : 'password'"
    v-bind="$attrs"
    :class="{ 'form-password-input__password-input--type-text': !visible && noTypePassword }"
  )
    slot(v-for="(_, name) in $slots" :name="name" :slot="name")
    template(#prepend v-if="!noPrepend")
      q-icon(:name="matLock")
    template(#append)
      q-icon.cursor-pointer(
        :name="visible ? matVisibilityOff : matVisibility"
        @click="$emit('visibility')"
      )
</template>

<script lang="ts">
import {
  matLock,
  matVisibility,
  matVisibilityOff,
} from '@quasar/extras/material-icons';
import { computed, defineComponent, ref } from '@vue/composition-api';
import { QInput } from 'quasar';

/**
 * A password input component for forms.
 */
export default defineComponent({
  name: 'FormPasswordInput',
  inheritAttrs: false,
  props: {
    /**
     * The current value of the password form input field
     * @model
     */
    value: {
      type: String,
      required: true,
    },
    /**
     * The label of the password field
     */
    label: {
      type: String,
      default: 'Password',
    },
    /**
     * Whether or not the password is currently visible
     */
    visible: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether or not to deactivate the default prepend slot with a lock
     */
    noPrepend: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether to disable the password type on the input box and instead use
     * a password mask font (for preventing password managers from activating
     * password autofill)
     */
    noTypePassword: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const input = ref<QInput>();

    function validate() {
      if (input.value) {
        input.value.validate();
      }
    }

    const hasError = computed(() => {
      return input.value?.hasError;
    });

    return {
      input,
      validate,
      hasError,

      matLock,
      matVisibilityOff,
      matVisibility,
    };
  },
});
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'password';
  font-style: normal;
  font-weight: 400;
  src: url('/password.ttf');
}

.form-password-input__password-input--type-text ::v-deep .q-field__native {
  font-family: 'password', monospace;
}
</style>
