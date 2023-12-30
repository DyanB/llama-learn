

function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve email and password from the form
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Prepare the request body
    var requestBody = {
        username: email,
        password: password
    };

    // Initialize the API client
    var apigClient = apigClientFactory.newClient();

    // Make the login request
    apigClient.loginPost({}, requestBody)
        .then(function(response) {
            // Handle the response here (e.g., redirect to another page, display a message)
            console.log('Login successful', response);
            // Check if the login was successful
            if (response.status === 200) {
                // Redirect to another HTML page
                console.log(response)
                localStorage.setItem("userId", response.data.userId)
                window.location.href = 'QnA.html';
            } else {
                // Handle other scenarios if needed
            }
        }).catch(function(error) {
            // Handle any errors here
            console.error('Login failed', error);
        });
}
