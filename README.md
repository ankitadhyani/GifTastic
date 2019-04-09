# GifTastic

This is a web-page that has a form that takes in user input, accepting different aminals eg. "dog", "cat", "elephant", etc.

It will then create a button for each animal and show it to the user inside "Animal List" box for future reference.

Also, when user enters an animal name, then asynchronously GIPHY API call is initiated with respective "animal name" getting 8 GIFs information.

Out of this GIPHY API response, only the GIFs rating and GIF still and animated URLs are used in the application.

By default all the Gifs are still.

If the user clicks on a Gif then the gif will turn into animated Gif, and when clicked upon again it will turn still.

The user can select a different animal using the input search bar or select an animal from the "Animal List" to view the respective Gifs again.

User also has the ability to clear the Gifs window by clicking on "Clear GIFs" button.
