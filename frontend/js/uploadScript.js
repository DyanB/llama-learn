// function uploadDocument() {
//   var fileInput = document.getElementById('file-upload');
//   var submitButton = document.getElementById('submit-question-btn');
//   var fileNameSpan = document.getElementById('selected-file-name');
  
//   var file = fileInput.files[0];
//   fileNameSpan.textContent = file.name;

//   // Show the "Submit" button when a file is selected
//   submitButton.style.display = 'block';
// }

document.getElementById('uploadButton').addEventListener('click', async () => {
  const fileInput = document.getElementById('pdfInput');
  const file = fileInput.files[0];
  console.log(file)
  if (!file) {
    alert('Please select a PDF file to upload.');
    return;
}
  var name_file = file.name;
  // Changing file name to maintain state of user_id
  // Define a new file name
  var user_Id = localStorage.getItem('userId');
  var newFileName = user_Id + '_' + name_file;

  // Create a new file object with the new name
  var newFile = new File([file], newFileName, {
      type: file.type,
      lastModified: file.lastModified,
  });
  

  try {
      // Initialize the API Gateway client
      var apigClient = apigClientFactory.newClient();

      // Parameters for the API call
      var params = {
          // Add any required parameters for your API here
          'object': newFile.name  // Assuming your API needs the file name
      };
      var body = {};
      var additionalParams = {};

      // Making the GET request to your API Gateway to get the presigned URL
      apigClient.uploadObjectGet(params, body, additionalParams)
          .then(function(result){
              // Use the presigned URL to upload the file
              var presignedUrl = result.data;
              console.log(presignedUrl)
              return fetch(presignedUrl, {
                  method: 'PUT',
                  body: newFile,
                  headers: new Headers({'Content-Type': 'application/pdf'})
              });
          })
          .then(response => {
              if (response.ok) {
                  alert('PDF uploaded successfully.');
              } else {
                  console.log('Upload failed:', response);
              }
          })
          .catch(function(error){
              console.log('Error getting the presigned URL or uploading the file:', error);
          });
  } catch (error) {
      console.log('Error:', error);
  }
});

function postQuestion(){
  var questionTextArea = document.getElementById('question-textarea');
  var questionText = questionTextArea.value;
  console.log('Submitted Question:', questionText);

  var requestBody = {
    "userId" : localStorage.getItem('userId'),
    "documentId" : "test.jpeg",
    "q" : questionText,
    "a" : ""
  }

  var apigClient = apigClientFactory.newClient();
    // Make the login request
  apigClient.qnaPost({}, requestBody)
      .then(function(response) {
          // Handle the response here (e.g., redirect to another page, display a message)
          console.log('Post successful', response);
          // Check if the login was successful
          if (response.status === 200) {
              // Redirect to another HTML page
              console.log(response)
              alert('Question is submitted');
          } else {
              // Handle other scenarios if needed
          }
      }).catch(function(error) {
          // Handle any errors here
          console.error('Post failed', error);
      });
}
// document.getElementById('submit-question-text-btn').addEventListener('click', postQuestion);

// Your existing functions

// function submitQuestion() {
//   var questionArea = document.getElementById('ask-question-area');
//   var fileNameSpan = document.getElementById('selected-file-name');
//   var submitButton = document.getElementById('submit-question-btn');
//   var uploadButton = document.getElementById('button-upload');
//   // var questionText = document.getElementById('question-text').value;

//   // Hide the file upload area and "Submit" button, and show the text box
//   uploadButton.style.display = 'none';
//   submitButton.style.display = 'none';
//   questionArea.style.display = 'block';

//   // Display the selected file name in the text area div
//   fileNameSpan.style.display = 'block';

// }

// // Add this event listener to the "Submit" button
// document.getElementById('submit-question-btn').addEventListener('click', submitQuestion);

