import helpers from './helpers.js';

window.addEventListener('load', () => {
    document.getElementById('closeModal').addEventListener('click', () => {
        alert('sssssssssss')
        helpers.toggleModal('recording-options-modal', false);
    });
});