import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';

export default class CodesController extends Controller {
    currentPage;
    page = 1;
    size = 15;
    @service store;

     constructor() {
        super(...arguments);
        this.load();
    }

    load(){
        this.set("currentPage", null);
        this.codes =  this.store.query('code', { page: {
            number: this.page,
            size: this.size
          }
        }).then(data => {
            this.set("currentPage" , data);
        });
    }

    get isLastPage(){
        return this.currentPage?.meta?.pagination?.next?.number === this?.currentPage?.meta?.pagination?.last?.number;
    }

    get isFirstPage(){
        return !this.currentPage.meta.pagination.prev?.number;
    }


    @action
      next(){
          this.set('page',this.currentPage.meta.pagination.next.number);
          this.load();
    }

    @action
      line(number){
          return number;
    }

    @action
      prev(){
        this.set('page',this.currentPage.meta.pagination.prev.number);
        this.load();

    }

}
