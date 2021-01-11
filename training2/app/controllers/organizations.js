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
    filter = {};

    @service store;

    constructor() {
        super(...arguments);
        this.load();
    }

    load() {
        this.set("currentPage", null);
        this.codes = this.store.query('company', {
            filter: this.filter,
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
            this.set('searchByVat', null);
            this.set('searchByZipCode', null);
            
            this.set('filter',{
                "denomination": this.searchByName
            });
            this.load();
        }
    }

    @action
    runSearchByVatNumber() {
        if (this.searchByVat.length >= 2) {
            this.set("currentPage", null);
            this.set('page', 0);
            this.set('searchByZipCode', null);
            this.set('searchByName', null);
            this.set('filter',{
                enterprisenumber: this.searchByVat
            });
            this.load();
        }
    }

    @action
    runSearchByZipCode() {
        if (this.searchByZipCode.length >= 4) {
            this.set("currentPage", null);
            this.set('page', 0);
            this.set('searchByVat', null);
            this.set('searchByName', null);
            this.set('filter',{
                address: {
                    zipcode: this.searchByZipCode
                }
            });
            this.load();
        }
    }

    @action
    updateSearchByName(e){
        const searchVal = e.target.value;
        this.set('searchByName', e.target.value);
        if (searchVal.length === 0) {
            this.set('filter', {})
            this.load();
        }
    }

    @action
    updateSearchByVatNumber(e){
        const searchVal = e.target.value;
        this.set('searchByVat', e.target.value);
        if (searchVal.length === 0) {
            this.set('filter', {})
            this.load();
        }
    }
    @action
    updateSearchByZipCode(e){
        const searchVal = e.target.value;
        this.set('searchByZipCode', e.target.value);
        if (searchVal.length === 0) {
            this.set('filter', {})
            this.load();
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
