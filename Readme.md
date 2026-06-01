URL Shortner


Design a URL Shortner Service that Takes in a valid URL and returns a shortened URL, redirecting the user to the previously provided URL.

Also, Keep track of total visits/clicks on the URL.

Routes

POST/URL - Generates a new short URL and returns the shortnes URL in the format example.com/random-id

GET/:id - Redirects the user to the Original URL

GET/URL/analytics/:id: Returns the clicks for the provided short id.
