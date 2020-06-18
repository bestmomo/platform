import {Controller} from "stimulus";
import {Modal} from 'bootstrap'

export default class extends Controller {

    /**
     *
     * @type {string[]}
     */
    static targets = [
        "title"
    ];

    /**
     *
     */
    connect() {
        this.modal = new Modal(this.element)

        if (this.element.querySelectorAll('.is-invalid').length > 0) {
            this.setFormAction(sessionStorage.getItem('last-open-modal'));
            this.element.classList.remove('fade', 'in');

            this.modal.show();


            $(this.element).on('hide.bs.modal', () => {
                if (!this.element.classList.contains('fade')) {
                    this.element.classList.add('fade', 'in');
                }
            })
        }
    }

    /**
     *
     * @param options
     */
    open(options) {
        if (typeof options.title !== "undefined") {
            this.titleTarget.textContent = options.title;
        }

        this.setFormAction(options.submit);

        if (this.data.get('async')) {
            this.asyncLoadData(JSON.parse(options.params));
        }

        this.modal.toggle();
    }

    /**
     *
     * @param params
     */
    asyncLoadData(params) {
        axios.post(this.data.get('async'), params).then((response) => {
            this.element.querySelector('[data-async]').innerHTML = response.data;
        });
    }

    /**
     *
     * @param action
     */
    setFormAction(action) {
        this.element.querySelector('form').action = action;
        sessionStorage.setItem('last-open-modal', action);
    }
}
