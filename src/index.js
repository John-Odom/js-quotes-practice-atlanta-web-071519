// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
const form = document.querySelector("#new-quote-form")
const mainFunction = () => {
document.addEventListener("DOMContentLoaded", ()=>{
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(resp => resp.json())
    .then(quotes => {
        quotes.forEach(quote => {
            appendQuote(quote)
        })
    } )
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        postBook(event)
    })
    document.addEventListener("click", (event) => {
        if (event.target.className === "btn-danger"){
            fetch(`http://localhost:3000/quotes/${event.target.dataset.id}`, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(data => {
                event.target.parentNode.parentNode.remove()
            })
        }
    })
})
}

const postBook = (event) => {
    fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            quote: event.target[0].value,
            author: event.target[1].value
        })
    })
    .then(resp => resp.json())
    .then(quote => {
       appendQuote(quote)
    })
    // console.log(event.target[0].value)
}

const appendQuote = (quote) =>{
    let li = document.createElement("li")
    li.className = 'quote-card'
    let blockquote = document.createElement("blockquote")
    blockquote.className = "blockquote"
    li.append(blockquote)

    let pTag = document.createElement("p")
    let footer = document.createElement("footer")
    let br = document.createElement("br")
    let likesButton = document.createElement("button")
    let deleteButton = document.createElement("button")

    pTag.innerText = quote.quote
    pTag.className = "mb-0"
    footer.innerText = quote.author
    footer.className = "blockquote-footer"
    likesButton.className = "btn-success"
    likesButton.innerHTML= `Likes: ${quote.likes.length = 0}`
    deleteButton.className = "btn-danger"
    deleteButton.innerText = "Delete"
    deleteButton.dataset.id = quote.id

    blockquote.append(pTag)
    blockquote.append(footer)
    blockquote.append(br)
    blockquote.append(likesButton)
    blockquote.append(deleteButton)

    let ul = document.querySelector("#quote-list")
    ul.append(li)
}


mainFunction()


//     <li class='quote-card'>
//             <blockquote class="blockquote">
//               <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
//               <footer class="blockquote-footer">Someone famous</footer>
//               <br>
//               <button class='btn-success'>Likes: <span>0</span></button>
//               <button class='btn-danger'>Delete</button>
//             </blockquote>
//           </li>