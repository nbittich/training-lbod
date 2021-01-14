import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';

export default class CodesController extends Controller {
    currentPage;
    page = 0;
    size = 13;
    sort = 'code';
    sortDirection = false; // false for ASC, true for DESC
    search = null;
    currentPageNumber = null;
    isFirstPage;
    isLastPage;
    @service store;

    constructor() {
        super(...arguments);
        this.load();
    }

    load() {
        this.set("currentPage", null);
        this.codes = this.store.query('code', {
            filter: {
                code: this.search?.toUpperCase()
            },
            sort: this.sortDirection ? this.sort : '-' + this.sort,
            page: {
                number: this.page,
                size: this.size
            },
        }).then(data => {
            this.set("currentPage", data);
            this.set("currentPageNumber",this.currentPageNb())
            this.set("isFirstPage", this.isFirst() )
            this.set("isLastPage",this.isLast() )
        });
    }

    isLast() {
        return this.currentPage?.meta?.pagination?.next?.number === this?.currentPage?.meta?.pagination?.last?.number;
    }

    isFirst() {
        const curr = this.currentPage.meta.pagination.self?.number;
        return !curr || curr === 0;
    }

    currentPageNb() {
        const curr = this.currentPage.meta.pagination.self?.number;
        return !curr || curr === 0 ? 1 : curr + 1;
    }



    @action
    next() {
        this.set('page', this.currentPage.meta.pagination.next.number);
        this.load();
    }

    @action
    runSearch(e) {
        const searchVal = e.target.value;
        if (searchVal.length === 0) {
            this.set("search", null);
            this.load();
        } else if (searchVal.length > 2) {
            this.set("currentPage", null);
            this.set("search", searchVal);
            this.set('page', 0);
            this.load(searchVal.toUpperCase());
        }
    }

    @action
    toggleSort() {
        this.toggleProperty('sortDirection');
        this.set('page', 0);
        this.load();
    }


    @action
    line(number) {
        return number;
    }

    @action
    prev() {
        this.set('page', this.currentPage.meta.pagination.prev.number);
        this.load();

    }

}
