/*The turnCard function you've provided adds a click event listener to 
an image element (img) and defines the behavior when the image is clicked. 

Let's break down the logic step by step:

const contains = img.classList.contains("show");: 
Checks if the clicked image (img) has the class "show". 
This is typically used to determine if the card is already flipped and visible.

if (this.selectedCards.length > 1 && !contains): 
Checks if there are already two cards selected (this.selectedCards.length > 1) 
and the clicked card (img) is not already flipped (!contains). 
If both conditions are true, it returns early, preventing further actions. 
This ensures that only one or two cards can be selected at a time and that you can't select a card that is already flipped.

if (contains): Checks if the clicked card (img) is already flipped (contains the class "show"). 
If it is, it means the user is trying to flip it back. In this case:

The class "show" is removed from the image, making it hidden again.
The class "hide" is added to the image to ensure it's not visible.

The index of the clicked card (img) is found in the selectedCards array using findIndex.
The clicked card is removed from the selectedCards array using splice.

else: If the clicked card is not flipped (contains is false), meaning it's currently hidden, the code:

Adds the class "rotate" to the card element (card),triggering a CSS transition or animation to flip the card.
After a short delay (250 milliseconds), removes the class "hide" and adds the class "show" to the image, making it visible.
Adds the clicked image (img) to the selectedCards array using push.
Overall, this function controls the flipping behavior of the cards in your memory game, 
ensuring that only one or two cards can be selected at a time, and managing the state of the selected cards accordingly.
*/

turnCard(img, card) {
    img.addEventListener("click", ()=> {
        const contains = img.classList.contains("show");

        if(this.selectedCards.length > 1 && !contains)
            return;

            if(contains) {
                img.classList.remove("show");
                img.classList.add("hide");
                const index = this.selectedCards.findIndex(i=> img === i);

                this.selectedCards.splice(index, 1);
            } else {
                card.classList.add("rotate");
                setTimeout(()=> {
                    img.classList.remove("hide");
                    img.classList.add("show");
                }, 250);

                this.selectedCards.push(img);
            }
    })
}