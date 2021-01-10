import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';

export default class CodesController extends Controller {
    currentPage;
    page = 0;
    size = 15;
    sort = 'code';
    sortDirection = false; // false for ASC, true for DESC
    search = null;
    @service store;

    constructor() {
        super(...arguments);
        this.load();
    }

    load() {
        this.set("currentPage", null);
        this.codes = this.store.query('code', {
            sort: this.sortDirection ? this.sort : '-' + this.sort,
            page: {
                number: this.page,
                size: this.size
            },
        }).then(data => {
            this.set("currentPage", data);
        });
    }

    get isLastPage() {
        return this.currentPage?.meta?.pagination?.next?.number === this?.currentPage?.meta?.pagination?.last?.number;
    }

    get isFirstPage() {
        const curr = this.currentPage.meta.pagination.self?.number;
        return !curr || curr === 0;
    }

    get currentPageNumber(){
        const curr = this.currentPage.meta.pagination.self?.number;
        return !curr || curr === 0 ? 1: curr + 1;
    }


    @action
    next() {
        this.set('page', this.currentPage.meta.pagination.next.number);
        this.load();
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
