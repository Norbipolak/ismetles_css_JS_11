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
        this.memoryGameDiv = document.querySelcetor("#memory-game");
        this.pointsSpan = document.querySelector("#points");
        this.errorsSpan = document.querySelector("#errors");
        this.newGameBtn = document.querySelector("new-game");

        this.images = ["car.png", "cargo-ship.png", "cheese.png", "flower.png", "phone.png", "plane.png", "tree.png", "ux.png"];

        this.selectedCards = [];
        this.points = 0;
        this.errors = 0;

        this.handCard();
        this.newGameBtn();
    }


    /*
    Így írjuk ki majd a pontokat
    -> 
    <div class="box">
        <h3>Points: <span id="points">0</span></h3>
    </div>
    
    Ez ténylegesen egy span elem, úgy csináltuk meg, hogy egy box-ban és abban egy h3-asban található egy span és 
    akkor csak a span-nek az értékét módisítjuk -> <span id="points">0</span></h3>, akkor így kevesebb adatforgalom van a DOM-val 
    mert akkor azt, hogy errors, nem kell a h3-ast beírni, hogy errors:, hanem csak a span-be írogatjuk azt, hogy nulla vagy egy 
    */

    shufflingCards() {
        this.images = this.images.concat(this.images);
        /*
        Így tudjuk a concat-val, hogy van egy tömbünk bizonyos elemekkel és azt szeretnénk, hogy ez a tömb tartalmazza
        ugyanazokat az elemeket, mint az eredeti tömb de kétszer!!!
        
        Ha itt az elemeket nem duplikálni szeretnénk, hanem 3-szor vagy 4-szerezni ugyanabban a tömbben akkor tudjuk használni a map-ot,
        hogy végimenjünk a tömbbön és van egy olyan, hogy flatMap() 
        flatMap() azt csinálja, hogy a több tömbböl csinál eggyet!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
        this.images = this.images.flatMap(image=> [image, image, image]);
        ezt így tudjuk elérni, de ha mindjuk nem 3-szorozni, hanem 4-szerezni szeretnénk az elemeket, akkor pedig 
        -> 
        this.images = this.images.flatMap(image=> [image, image, image, image]);
        Tehát annyiszor írjuk be ide, amennyiszer azt szeretnénk, hogy többszörösítse 
        */

        /*
        Itt azt szeretnénk, hogy összekeverje a kártyákat
        Ehhez kell egy counter, hogy meghatározzuk, hogy hányszor menjen végbe a folyamat 
    
        randIndex meg a randIndex2 -> generáltunk két véletlen számot, nem adtunk hozzá + 1-et, ami az jelenti, hogy generál nekünk egy véletlen 
        számot 0 és a this.images.length - 1 között, tehát, ha mondjuk a this.images tömbben van 14 számunk, akkor generál egy véletlen számot 
        0 és 13 között, ez pont arra jó, hogy a this.images-nek az indexei is 0-13-ig mennek és ez a két érték között genarál egy véletlen számot 
    
        utána megnézzük, hogy a két generált szám az különbözik-e és csak akkor megyünk be az if-be és csináljuk meg ami ott van, amikor igen 
        if(randIndex !== randIndex2);
    
        Itt belül történik maga keverés és olyan formában, hogy a randIndex-en helyen lévő elemet átrakjuk a randIndex2 helyen lévőre 
        tehát, a két elemnek a helyét kicseréljük és itt adunk hozzá a counter-hez is, hogy biztosak legyünk, hogy ez a folyamat megtörténik 40-szer
    
        1. counter létrehozása 
        2. while szerkezetben, meddig menjen, counter nulláról indul itt meg megadjuk feltételnek, hogy addig menjen, amig nem lesz 40 a counter 
            ugye ennek a counter-nak majd növeljük eggyel az értékét ha végbement a folyamat, amit szerettünk volna 
        3. generálunk 2 véltetlen számot az index-eknek, ezért kell, hogy nulla és length-1 között legyen a szám 
            ezt úgy tudjuk elérni, hogy a floor miatt lekerekítünk és megadjuk, hogy a length-ig menjen 
        4. Mikor meg van ez a két véletlen szám, akkor összehasonlítjuk őket és csak akkor megyünk bele ha ez az állítás igaz 
            -> randIndex !== randIndex2, tehát nem egyenlő a két szám 
        5. 
        let tempImg = this.images[randIndex];
        this.images[randIndex] = this.images[randIndex2];
        this.images[randIndex2] = tempImg;
        Így cserélünk ki két elemet egy tömbben 
        1. sor -> let tempImg = this.images[randIndex];
            létrehozunk egy változót, amiben eltárolja az értékét a this.images[randIndex]-nek 
        2. sor this.images[randIndex] = this.images[randIndex2]; -> itt történik meg a csere, tehát az this.images[randIndex] elemet 
            felcseréli a this.images[randIndex2] elemre
        3. sor this.images[randIndex2] = tempImg; ebben a változóban lesz eltárolva mostmár a randIndex2-nek az értéke 
        Ez hasonló amikor van egy array és az a feladat, hogy válasszuk ki mondjuk a legnagyobb számot 
        
        let largestNumber = arr[0];
    
        for(let i = 0; i < arr.length; i++) {
            if(largestNumber < arr[i]) {
                largestNumber = arr[i];
            }
        }
    
    
        */

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
    /*
    concat-nak a visszatérési értéke a két tömbnek a konkatenációja, tehát az összefüzése 
    
    Abban az esetben, hogyha az if-en kivül lenne a counter akkor is növelnénk a counter értékén, hogyha ugyanazok az indexek és igazából nem is
    cseréltünk!!!!!!!
    Tehát így  gyakorlatilag, hogyha ugyanazok az indexek, akkor plusz egy iteráció történik, ha ugyanazok az indexek, akkor plusz kettő 
    ezért fontos, hogy belül növeljük, mert azt szeretnénk, hogy a mag abba benne van ebbe az if-ben az menjen le 40-szer, ezért csak 
    akkor szabad a counter-nek az értékét növelni, ha ez már megtörtént és nem elötte az éppen a leírtak miatt!!!!!
    csak azért, hogy ténylegesen annyiszor legyenek megcserélve ezek a kártyák, amennyiszer kell, ezt a while-ban meghatároztuk 
    *******************************************************************************************************
    */

    handCards() {
        for (const fileName of this.images) {
            const div = document.createElement("div");
            div.classList.add("card");

            const img = document.createElement("img");
            img.src = `kepek/${fileName}`;
            img.classList("hide");

            div.appendChild(img);
            this.memoryGameDiv.appendChild(div);
            this.turnCard(img, div);
        }
    }

    /*
    Ha itt egy for of helyett egy sima for-val szeretnénk végigmenni a tömbon ->
    handCard() {
        for(let i = 0; i < this.images.length; i++) {
            const fileName = this.images[i];
            const div = document.createElement("div");
            div.classList.add("card");

            const img = document.createElement("img");
            img.src = `kepek/${fileName}`;
            img.classList("hide");

            div.appendChild(img);
            this.memoryGame.appendChild(div);
            this.turnCard();
        }
    }
    */

    /*
    Ezzel csináltuk azt, hogy megjelenítettük a kártyákat
    1.fontos, hozzá, hogy csináljunk egy tömböt, ami tartalmazza azokat a fileneveket, amelyek nekünk le vannak mentve 
    jobbra, tehát a képneket a neveit (pl.car.png, cargoship.png)
    2. végigmegyünk egy for-val ezen a tömbbön és megcsináljuk a html szerkezetet, ami úgy fog kinézni, hogy van egy div
    const div = document.createElement("div");
    ennek megadjuk, amit készítettünk css-ben egy .card-os classt 
    ebben a div-ben pedig lesz az img-tagunk, aminek, fontos, hogy megadjuk az src-jének az elérési útvonalat 
    -> képek mappában vannak lementve ezek a képek, hogy car.png, cargo-ship.png stb. 
    ennek megadjuk a hide class.t ami az lesz, hogy az elején ne látszanak ezek a kártyák 
    ezért memory-game, hogy csak akkor legyen látható, ha rákattintunk és akkor felforduljon 
    -> ami a turnCard-ban majd meg is for történni 
    végén meg ezeket majd appendChild-oljuk, a legvégén pedig mindent belerakunk a memoryGameDiv-be!!! 
    valahogy így fog kinézni, miután legyártottuk az egészet a for-val 
    
    <div class="card">
        <img src="images/card.png">
    </div>

    <div class="card">
        <img src="images/cargo-ship.png">
    </div>

    fontos, hogy itt html-ben teljes elérési útvonal lesz, ahova le van mentve a kép, nem úgy mint itt JavaScriptben, hogy kepek/valami.png 
    ***********************************************************
    */

    turnCard(img, card) {
        img.addEventListener("click", () => {
            const contains = img.classList.contains("show");

            if (this.selectedCards.length > 1 && !contains)
                return;

            if (contains) {
                img.classList.remove("show");
                img.classList.add("hide");
                const index = this.selectedCards.findIndex(i => img === i);

                this.selectedCards.splice(index, 1);
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
                    this.selectedCards = [];

                    setTimeout(()=> {
                        this.turnBack(img1);
                        this.turnBack(img2);
                    }, 1000)
                }

                this.pointsSpan.innerText = this.points;
                this.errorsSpan.innerText = this.errors;
            }

        });
    
}

    /*
    if(this.selectedCards.length > 1 && !contains)
    return;
    Itt azért van return, mert selectedCards, az egy tömb lesz és oda gyüjtjük azokat a kártyákat, amire rákattintottunk 
    Ebben az if-ben két dolog van meghatározva 
    this.selectedCards.length nagyobb, mint egy tehát ebben a tömbben már van két elemünk minimum!!!!!
    !contains tehát nem tartalmazza a show-t const contains = img.classList.contains("show");
    Ha rákattintunk arra, ami egyszer már felfordult 
    Mert ha tartalmazza a show-t mint class-t, akkor ne rakja bele mégegyszer!!!! 

    if(contains) {
    img.classList.remove("show");
    img.classList.add("hide");
    const index = this.selectedCards.findIndex(i=> img === i);

    this.selectedCards.splice(index, 1);

    Itt ha rajta van a kártyán a show, tehát a show osztályba van sorolva, akkor már újra rákkatintunk, mert ha nincsen rajta show, 
    akkor még nem kattintunk rá, tehát rákattintuk és akkor így eltünteti 
    const index = this.selectedCards.findIndex(i=> img === i);
    Ki kell keresni az indexét az alapján, amire rákattintottunk, mert akkor azt fogjuk kiszedni belöle, tehát ha 
    újra rákattintunk akkor ki kell szedni belőle azt a bizonyos elemet és meg kell nézni, hogy az a nullás vagy az eggyes index, mert 
    ez a selectedCards tömb az kételemű

    } else {
        card.classList.add("rotate");
        setTimeout(()=> {
            img.classList.remove("hide");
            img.classList.add("show");
        }, 250);

        this.selectedCards.push(img);
    }

    else ágban, pedig arra kattintunk rá, amin nincsen show, ilyenkor adja rá a show-t meg előtte vegye le a hide-ot 
    hogy lássuk, hogy melyik kártyáról van szó és tegye is bele a selectedCards tömbbe 

    if(this.selectedCards.length === 2) {
    const src1 = this.selectedCards[0].getAttribute("src");
    const src2 = this.selectedCards[1].getAttribute("src");
    }

    A getAttribte-val tudunk hozzáférni az src-jéhez az adott elemnek és ez alapján nézzük meg, hogy van egyezés-e 
    mert, ha ugyanaz, akkor egyezés van tehát megtaláltuk a párját és ilyenkor nem is kell visszafordítani, meg a pontokat 
    növelni kell, meg ki kell űríteni a tömböt, hogy újra bele tudjunk rakni elemeket!!!!!! 
    getAttribute itt nagyon fontos!!!!!!!!!!!!!!!!!!!!!

    if(src1 === src2) {
    this.points++;
    this.selectedCards = [];

    - növeljük a pontok számát ha ugyanaz az src 
    - kiürírjük a tömböt 

    else 

    - növeljük az errors-ok számát 
    - 1másodperc múlva visszafordítjuk rotate-backvel 
        setTimeout(()=> {
            this.selectedCards[0].parentNode.classList.remove("rotate");
            this.selectedCards[0].parentNode.classList.add("rotate-back");

            this.selectedCards[1].parentNode.classList.remove("rotate");
            this.selectedCards[1].parentNode.classList.add("rotate-back");
        }, 1000);
    - 1.25 másodperc múlva pedig hide-oljuk a hide-val
        setTimeout(()=> {
            this.selectedCards[0].classList.add("hide");
            this.selectedCards[0].classList.remove("show");

            this.selectedCards[1].classList.add("hide");
            this.selectedCards[1].classList.remove("show");
        }, 1250);
    - 1,5 másodperc múlva pedig leszedjük a rotate-back-et 
        setTimeout(()=> {
            this.selectedCards[0].parentNode.classList.remove("rotate-back");
            this.selectedCards[1].parentNode.classList.remove("rotate-back");
            this.selectedCards = [];
        }, 1500);

    Ez azért van ez a hide-olás, mert nem szeretnénk ha egyből eltünne a kép amikor rákattintunk, meg azt sem szeretnénk ha csak megfordítsa 
    és ne tünjön el a kép 

    Rotate-back-et meg azért szedjük le a végén, mert nem fordítja be normálisan, ha rajta van ez a rotate-back
    és itt is ki kell üríteni a selectedCards-ot a végén miután vissza lettek fordítva az elemek, hogy tudjunk tovább játszani 
    
    Legvégén meg kiírjuk a pontokat illetve a hibákat 
        this.pointsSpan.innerText = this.points;
        this.errorsSpan.innerText = this.errors;

        visszafordítás még nem az igazi ezért csinálunk egy turnBack függvényt 
    
   turnBack() {
    setTimeout(() => {
        this.selectedCards[0].parentNode.classList.remove("rotate");
        this.selectedCards[0].parentNode.classList.add("rotate-back");

        this.selectedCards[1].parentNode.classList.remove("rotate");
        this.selectedCards[1].parentNode.classList.add("rotate-back");
    }, 1000);

    setTimeout(() => {
        this.selectedCards[0].classList.add("hide");
        this.selectedCards[0].classList.remove("show");

        this.selectedCards[1].classList.add("hide");
        this.selectedCards[1].classList.remove("show");
    }, 1250);

    setTimeout(() => {
        this.selectedCards[0].parentNode.classList.remove("rotate-back");
        this.selectedCards[1].parentNode.classList.remove("rotate-back");
        this.selectedCards = [];
    }, 1500);
   };

   
   És akkor ez nem a selectedCards-ra hanem egy img-re fog vonatkozni, mert csak azt tudunk neki átadni!!!!
   az elözőből lesz ez
   ->
   */
   turnBack(img) {
        img.parentNode.classList.remove("rotate");
        img.parentNode.classList.add("rotate-back");

    setTimeout(() => {
        img.classList.add("hide");
        img.classList.remove("show");
    }, 250);

    setTimeout(() => {
        img.parentNode.classList.remove("rotate-back");
    }, 500);
   };


/*
turnBack-et meg meghívjuk itt 
-> 
if (contains) {
    const index = this.selectedCards.findIndex(i => img === i);

    this.selectedCards.splice(index, 1);

    this.turnBack(img);

meg itt is, de itt viszont kell az 1 másodperc-es setTimeout


Ha előre lementjük őket és az img1-et és az img2-öt fogjuk használni, mert akkor egyből mondhatjuk, hogy 
this.selectedCards = [];

} else {
    console.log("Nem egyforma!");

    this.errors++;

    const img1 = this.selectedCards[0];
    const img2 = this.selectedCards[1];
    this.selectedCards = [];

    setTimeout(()=> {
        this.turnBack(img1);
        this.turnBack(img2);
        }, 1000)
    }

    this.pointsSpan.innerText = this.points;
    this.errorsSpan.innerText = this.errors;
}

Ezt a turnBack-et megadtuk kéthelyen!!!!!! 
És akkor így nem kellett másolgatni a kódot, hanem csak a turnBack-et megcsináltunk egy függvénybe és meghívtuk két helyen!!! 

Végén meg egy newGameBtn
*/
newGame(){
    this.newGameBtn.addEventListener("click", ()=> {
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
    })
}
}