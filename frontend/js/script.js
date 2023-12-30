document.addEventListener('DOMContentLoaded', function () {
    const qaContainer = document.getElementById('qa-container');

    function createQAPair(qa) {
        size_url = qa.documentUrl.split('/').length
        // Create an object url by fetching the s3 link for the document.
        // Create a new div element
        const newDiv = document.createElement('div');
        newDiv.id = "div" + qa.documentId; // Assign the doc ID to the div

        const docidElement = document.createElement('p');
        docidElement.textContent = `Document: ${qa.documentUrl.split('/')[size_url-1]}`;
        docidElement.id = qa.documentId;
        docidElement.classList.add('docu-div');
        qaContainer.appendChild(docidElement);
        // Create an anchor element
        const link = document.createElement('a');
        link.href = qa.documentUrl;
        link.textContent = 'Link to the Document';
        link.target = '_blank'; // Open link in a new tab
        newDiv.appendChild(link);

        // Loop through The Question and answers and set display to none
        qa.qna.forEach(function (QandAarray) {

            const questionElement = document.createElement('p');
            questionElement.textContent = `Q: ${QandAarray.q}`;
            questionElement.classList.add('question'); // Add a class for styling
            

            const answerElement = document.createElement('p');
            answerElement.textContent = `A: ${QandAarray.a}`;

            newDiv.appendChild(questionElement);
            newDiv.appendChild(answerElement);

        })
        
        
        // Create a new text box for entering question
        const newTextbox = document.createElement('input');
        newTextbox.type = 'text';
        newTextbox.placeholder = 'Enter your Question';
        

        // Create a new button element
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Ask Question';
        

        // Attach an onclick event to the button
        submitButton.onclick = function() {
            //POST Request to API Gateway
            body = {
                'userId': localStorage.getItem('userId'),
                'documentId':localStorage.getItem('docpoint'),
                'q': newTextbox.value
            };
            var params = {};
            var additionalParams = {};
            var apigClient = apigClientFactory.newClient();
            // Activate loading screen and mask the UI

            apigClient.qnaPost(params, body, additionalParams).then(
                function (response) {
                    // Handle the response here (e.g., redirect to another page, display a message)
                    console.log('Get qna successful', response);
                    // Check if the request was successful
                    if (response.status === 200) {
                        // Reload the page so that the changes will be reflected and disable the loading screen
                        window.location.reload();
                    } else {
                        // Handle other scenarios if needed
                        console.log(response);
                    }
                }

            )
        };



        // Add click event listener to toggle the display of the answer
        docidElement.addEventListener('click', function () {

            const contentDiv = document.getElementById("div"+ docidElement.id);
            if (contentDiv.style.display === "" || contentDiv.style.display === 'none') 
            {
                contentDiv.style.display = 'block';
            } 
            else 
            {
                contentDiv.style.display = 'none';
            }
            // Add logic to shift document pointer in localstorage
            localStorage.setItem('docpoint', qa.documentId)
        });

        newDiv.appendChild(document.createElement('br'))
        newDiv.appendChild(newTextbox);
        newDiv.appendChild(submitButton);
        newDiv.style.display = "none";
        qaContainer.appendChild(newDiv);
    }
    function handleqna() {
        const params = {
            userId: localStorage.getItem('userId')
        };
    
        var apigClient = apigClientFactory.newClient();
    
        apigClient.qnaGet(params)
            .then(function (response) {
                // Handle the response here (e.g., redirect to another page, display a message)
                console.log('Get qna successful', response);
                // Check if the request was successful
                if (response.status === 200) {
                    // Display the Q&A pairs from the API response
                    displayQAPairs(response.data);
                } else {
                    // Handle other scenarios if needed
                    console.error('Fetch failed', error);
                }
            })
            .catch(function (error) {
                // Handle any errors here
                console.error('Fetch failed', error);
            });
    }
    
    function displayQAPairs(qaArray) {
        if(qaArray.length>0){
            qaArray.forEach(createQAPair);
        }
        else{
            const default_element = document.createElement('p');
            default_element.textContent = "You haven't uploaded any documents!!";
            default_element.classList.add('question'); // Add a class for styling
            qaContainer.appendChild(default_element)
        }
        
    }

    // Call the handleqna function to initiate the process
    handleqna();
});


