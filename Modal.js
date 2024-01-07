import React from "react"

export default function Modal(){
    const apiKey = "0FAW6FOEdw9VHvwJNx18K9eSHIGJQf8u"
    const [gif, setGif] = React.useState("")
 
    React.useEffect(()=>{
        fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=celebration`)
        .then(res=>res.json())
        .then(data=>{setGif(data.data.images.fixed_height.url)})
    }, [])
    
    return(
    <div className="modal">
        <h2>CONGRATZ!!</h2>
        <div className="modal-inner">
        <img src={gif} />
        </div>
        <p>2023 Powered by Ruben Bliz Barradas</p>
    </div>
    )
}
