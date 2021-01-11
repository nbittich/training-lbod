import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';

export default class OrganizationsController extends Controller {
    currentPage;
    page = 0;
    size = 10;
    sort = 'enterprisenumber';
    sortDirection = false; // false for ASC, true for DESC
    search = null;
    searchByName = null;
    searchByVat = null;
    searchByZipCode = null;

    @service store;

    constructor() {
        super(...arguments);
        this.load();
    }

    load(filter={}) {
        this.set("currentPage", null);
        this.codes = this.store.query('company', {
            filter: filter,
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

    get currentPageNumber() {
        const curr = this.currentPage.meta.pagination.self?.number;
        return !curr || curr === 0 ? 1 : curr + 1;
    }


    @action
    next() {
        this.set('page', this.currentPage.meta.pagination.next.number);
        this.load();
    }

    @action
    runSearchByName() {
        if (this.searchByName.length >= 2) {
            this.set("currentPage", null);
            this.set('page', 0);
            this.load({
                 "denomination": this.searchByName
             });
        }
    }

    @action
    runSearchByVatNumber() {
        if (this.searchByVat.length >= 2) {
            this.set("currentPage", null);
            this.set('page', 0);
            this.load({
                 enterprisenumber: this.searchByVat
             });
        }
    }

    @action
    updateSearchByName(e){
        const searchVal = e.target.value;
        this.set('searchByName', e.target.value);
        if (searchVal.length === 0) {
            this.load();
        }
    }

    @action
    updateSearchByVatNumber(e){
        const searchVal = e.target.value;
        this.set('searchByVat', e.target.value);
        if (searchVal.length === 0) {
            this.load();
        }
    }

    @action
    test(){
        console.log("test");
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
