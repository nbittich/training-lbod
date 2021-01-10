import { helper } from '@ember/component/helper';

export default helper(function rowNumber([page, index]) {
  return index + 1 + (page.self.number > 1 ? (page.self.number-1) * page.self.size : 0);
});
