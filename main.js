{
    //get the county name from the form and display on the page
    //first of all, let us grab the form
    let form = document.getElementById('pokeForm')
    console.log(form)
    
    //create a func to handle submit event
    async function handleSubmit(e){
        e.preventDefault(); //this will prevent the event from refreshing the page
        //console.log(e)
        let pokeName = (e.target.pokeName.value)
        console.log(pokeName)
        let pokeInfo=await getPokeInfo(pokeName)
        //console.log(pokeInfo)
        //INSTEAD OF LOGGING WE WILL BUILD THE Pokecard using JavaSCRIPT
        buildPokeCard(pokeInfo)
        //console.log(typeof pokeInfo)

        //clear the input of the poke name
        e.target.pokeName.value=''
        
    }
    
    //Create a func that takes in a poke name, makes the request to the api and returns a JS object
    
    async function getPokeInfo(pokeName){
        let response =await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        //console.log(response)
        //console.log(pokeInfo)
        let data = await response.json()
        //console.log(data);
        //console.log(typeof pokeInfo)
        return data
    
    }
    
    //function that will take in a poke object and build an html card and append it to the gallery poke display
    function buildPokeCard(pokeObject){
        //create a card div
        let card = document.createElement('div')
        card.className = 'card'
        
        //Create a top image that will hold the flag
        let image=document.createElement('img')
        image.className='card-img-top';
        image.src = pokeObject.sprites.front_default.png
        
        //add image as a child to the card div
        card.append(image)
        
        //card body create
        
        let cardBody=document.createElement('div')
        cardBody.className='card-body'
        
        //Create pokename and population element
        let poketitle=document.createElement('h5')
        poketitle.className='card-title'
        poketitle.innerHTML=pokeObject.name
        
        let pokeheight = document.createElement('p')
        pokeheight.className='card-text'
        pokeheight.innerHTML=`Height: ${pokeObject.height}ft || Weight: ${pokeObject.weight}lbs `
        
        // ADD TITLE and population  to the card body
        cardBody.append(poketitle)
        cardBody.append(pokeheight)
        
        //add card body to the card
        
        card.append(cardBody)
        
        //create a column for the row
        let col = document.createElement('div')
        col.className = 'col.12 col-md-6 col-lg-3 my-3'
        
        
        //add the card as a child to the column
        col.append(card)
        
        //get the poke display row and add hw column
        let display= document.getElementById('pokeDisplay')
        display.append(col)
        
        
        
        
    }
    //add handleSubmut func to the form as a listener to the submit event
    
    form.addEventListener('submit', handleSubmit)
}