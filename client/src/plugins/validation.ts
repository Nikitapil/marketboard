import { defineRule } from 'vee-validate';
import { url } from '@vee-validate/rules';
export const validation = () => {
  defineRule('required', (value, _, ctx) => {
    if (!value) {
      return `${ctx.field} is required`;
    }
    return !!value;
  });

  defineRule('url', url);
  defineRule('numeric', (value, _, ctx) => {
    // @ts-ignore
    if (Number.isNaN(+value)) {
      return `${ctx.field} must be number`;
    }
    // @ts-ignore
    return !Number.isNaN(+value);
  });
}