var fileInput = document.getElementById('file-upload');
var fileNameDisplay = document.getElementById('selected-file-name');

fileInput.addEventListener('change', function () {
    fileNameDisplay.textContent = fileInput.files[0] ? fileInput.files[0].name : '';
});

document.querySelector('.ask-question button').addEventListener('click', function() {
    var file = fileInput.files[0];

    if (file === null || file.type !== 'application/pdf' && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type !== 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        alert('Please upload a PDF or Word document.');
        return;
    }

    // Submit the uploaded document file to the server
    // ...
});
