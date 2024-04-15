class MemoryGame {
    memoryGameDiv;
    images;
    selectedCards;
    points;
    errors;
    pointsSpan;
    errorsSpan;
    newGameBtn;

    constructor() {
        this.memoryGameDiv = document.querySelector("#memory-game");
        this.pointsSpan = document.querySelector("#points");
        this.errorsSpan = document.querySelector("#errors");
        this.newGameBtn = document.querySelector("#new-game");

        this.images = [
            "car.png", "cargo-ship.png", "cheese.png", "flower.png", "phone.png", "plane.png", "tree.png", "ux.png"
        ];

        this.selectedCards = [];
        this.points = 0;
        this.errors = 0;

        this.shufflingCards();
        this.handCards();
        this.newGame();
    }

    shufflingCards() {
        this.images = this.images.concat(this.images);

        let counter = 0;

        while (counter < 40) {
            const randIndex = Math.floor(Math.random() * this.images.length);
            const randIndex2 = Math.floor(Math.random() * this.images.length);

            if (randIndex !== randIndex2) {
                let tempImg = this.images[randIndex];
                this.images[randIndex] = this.images[randIndex2];
                this.images[randIndex2] = tempImg;
                counter++;
            }
        }
    }

    handCards() {
        for (const fileName of this.images) {
            const div = document.createElement("div");
            div.classList.add("card");

            const img = document.querySelector("img");
            img.src = `kepek/${fileName}`;
            img.classList.add("hide");

            div.appendChild(img);
            this.memoryGameDiv.appendChild(div);

            this.turnCard(img, div);
        }
    }

    turnBack() {
        img.parentNode.classList.remove("rotate");
        img.parentNode.classList.add("rotate-back");

        setTimeout(() => {
            img.classList.add("hide");
            img.classList.remove("show");
        }, 250);

        setTimeout(() => {
            img.parentNode.classList.remove("rotate-back");
        }, 500);
    }

    turnCard(img, card) {
        img.addEventListener("click", () => {
            const contains = img.classList.contains("show");

            if (this.selectedCards.length > 1 && !contains)
                return;

            if (contains) {
                const index = this.selectedCards.findIndex(i => img === i);

                this.selectedCards.splice(index, 1);

                this.turnBack(img);
            } else {
                card.classList.add("rotate");

                setTimeout(() => {
                    img.classList.remove("hide");
                    img.classList.add("show");
                }, 250);

                this.selectedCards.push(img);
            }

            if (this.selectedCards.length === 2) {
                const src1 = this.selectedCards[0].getAttribute("src");
                const src2 = this.selectedCards[1].getAttribute("src");

                if (src1 === src2) {
                    this.points++;
                    this.selectedCards = [];
                } else {
                    console.log("Nem egyforma!");

                    this.errors++;
                    const img1 = this.selectedCards[0];
                    const img2 = this.selectedCards[1];

                    setTimeout(() => {
                        this.turnBack(img1);
                        this.tuenBack(img2);
                    }, 1000);
                }

                this.pointsSpan.innerText = this.points;
                this.errorsSpan.innerText = this.errors;
            }

        });
    }
    newGame() {
        this.newGameBtn.addEvenetListener("click", ()=> {
            this.points = 0;
            this.errors = 0;

            const cards = document.querySelectorAll(".card");

            for(const card of cards) {
                card.children.classList.remove("show");
                card.children.classList.add("hide");
            }

            this.selectedCards = [];
            this.shufflingCards();
            this.pointsSpan.innerText = 0;
            this.errorsSpan.innerText = 0;

        });
    }
}

new MemoryGame();