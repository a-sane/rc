export function modalHide() {
    return {
        type: 'MODAL_HIDE',
        payload: {
            show: false,
            body: ''
        }
    }
}