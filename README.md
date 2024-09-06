**Dynamisk web**

# Lav et Pokedex eller et Star Wars 'leksikon'

### **Mål**
Målet med opgaven er at træne listevisning og detaljevisning ved brug af url-parametre(query-strings).

### **Materialer**
Der er ikke noget layout til opvaven. Så det er dig helt frit for, hvordan det skal se ud.

Du kan hente data fra enten pokemon api: https://pokeapi.co/
eller star wars api: https://swapi.dev/

### **Opgaven**

I listevisning fetches pokemons (`https://pokeapi.co/api/v2/pokemon`) eller Star Wars karaterer (`https://swapi.dev/api/people`), og udskrives med et link rundt om hver pokemon eller Star Wars karakter. Ved at klikke på linket, skal brugeren vises en ny side (fx. `detail.html`), som viser mere uddybende detaljer om den enkelte pokemon eller karakter. Ved hjælp af et url-parameter skal du videresende information til `detail.html` hvilken en af pokemon'erne eller karaktererne brugeren har klikket på. Hvis du bruger pokemon api'et kan du hente én pokemon ved hjælp af dens navn, så her ser din url måske sådan ud: 
```
http://127.0.0.1:5500/detail.html?name=ivysaur
```

Du skal nu "fiske" navnet ud af url'en og fetche data om `ivysaur` og præsentere Pokemonen på siden.

**Star Wars api'et**

I Star Wars apiet får man ikke umiddelbart adgang til data man kan fetche en enkelt person med, så et forslag kunne være at tage url'en og splitte til et array, så man kan få fat i id'et ad den vej.

### **Processen** 
- Husk at lave en branch til din aflevering.
- Commit ofte
- Tænk over, hvad du skriver i dine commit-beskeder.


### **Aflevering**: 
Du afleverer ved at lave et **pull-request** hvor du sætter din lærer på som *reviewer*.

### **Feedback**: 
Din lærer kigger dit pull-request igennem, og hvis du blot får et godkendt/approved tilbage betyder det, at du har løst opgaven ligesom det var forventet. 

Hvis din lærer sender et godkendt/approved tilbage, men også tilknytter en kommentar, er det måske for at gøre opmærksom på en detalje du let kan forbedre. Du behøver ikke at lave en ny pull request.

Hvis du får en anmodning tilbage fra din lærer om at udføre ændringer, skal du implementere ændringerne/løse problemet og lave en ny pull-request. 


# Ekstraopgaver


### **Pokemon api - ekstraopgave 1 - mulighed for at bladre**

Der fetches 20 pokemons på første side. Tilføj knapper, så det bliver muligt at bladre til de næste 20 pokemons.
Man skal både kunne bladre frem og tilbage. Dog skal man ikke kunne bladre tilbage hvis man lige nu ser de første 20 pokemons, ligesom man ikke skal kunne bladre frem, hvis man ser de sidste pokemnons.

**Hint:**

Apiet bruger et parameter, `offset`, når der fetches pokemons. Måske kan du bruge et offset-url parameter på din index side, så du, når du bladrer til de næste pokemnos  har en url der måske ser sådan ud: 
```
http://127.0.0.1:5500/index.html?offset=20
```

### **Pokemon api - ekstraopgave 2 - mulighed for at søge**

Tilføj et søgefelt til index siden, så man ikke skal bladre hen til sin favorit-pokemon. Det kan være du skal bruge et url-parameter til at få fat i søgeresultatet..?

### **Pokemon api - ekstraopgave 3 - sidetal**

Når man bladrer frem og tilbage i siderne af pokemons, skal man kunne se hvilken side, ud af et totalt antal sider man er på. Så der fx. stod `side 2 af 56` nederst på siden når man var på side to. 

Her skal du bruge lidt matematik. Når man fetcher pokemons, får man at vide hvor mange der er. Så med lidt gangen og divideren, burde det være muligt at regne ud, hvor mange sider der er, samt hvilken side man er på lige nu.


### **Star Wars api - ekstraopgave 1 - mulighed for at bladre**

Der fetches 10 karakterer på første side. Tilføj knapper, så det bliver muligt at bladre til de næste 10 karakterer.
Man skal både kunne bladre frem og tilbage. Dog skal man ikke kunne bladre tilbage hvis man lige nu ser de første 10 karakterer, ligesom man ikke skal kunne bladre frem, hvis man ser de sidste pokemnons.

**Hint:**

Apiet bruger et parameter, `page`, når der fetches karakterer. Måske kan du bruge et page-url parameter på din index side, så du, når du bladrer til de næste karakterer har en url der måske ser sådan ud: 
```
http://127.0.0.1:5500/index.html?page=2
```

### **Star Wars api - ekstraopgave 2 - mulighed for at få vist planter og starships**

Tilføj knapper til siden, så man vælge om man vil se people, planets eller starships. Det kan være du skal bruge et url-parameter til at bestemme, hvad du vil fetche..?

### **Star Wars api - ekstraopgave 3 - sidetal**

Når man bladrer frem og tilbage i siderne af karakterer, planeter eller starships, skal man kunne se hvilken side, ud af et totalt antal sider man er på. Så der fx. stod `side 2 af 7` nederst på siden når man var på side to. 

Her skal du bruge lidt matematik. Når man fetcher fx. karakterer, får man at vide hvor mange der er. Så med lidt gangen og divideren, burde det være muligt at regne ud, hvor mange sider der er, samt hvilken side man er på lige nu.
