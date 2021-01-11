import { helper } from '@ember/component/helper';

export default helper(function numberFormat([number]) {
  return number.toLocaleString(
    'de', // leave undefined to use the browser's locale,
               // or use a string like 'en-US' to override it.
    { minimumFractionDigits: 2 }
  );
});
