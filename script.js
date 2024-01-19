var form = document.getElementById("myForm")


form.addEventListener("submit", function(e){
    e.preventDefault()

        var search = document.getElementById("search").value
    
        var avatarContainer=document.getElementById("avatar-container").innerHTML = ""

        fetch("https://api.github.com/users/" + search)
        .then((response) => response.json())
        .then( (data)  => {
            const avatarUrl = data.avatar_url;
            const avatarContainer =document.getElementById("avatar-container");
        
            const avatarImage = document.createElement("img");
            avatarImage.src = avatarUrl;
            avatarContainer.appendChild(avatarImage);
        
        })
        
    
    fetch(`https://api.github.com/users/${search}/repos`)
        .then( (response) =>response.json() )
        .then( (data) => {
            const repoList = document.getElementById("repo-container");
            repoList.innerHTML = "";
            
        

            for (const repo of data) {
            
            const languageId = `language-${repo.language}`
            const repoElement =document.createElement("li")
            repoElement.innerHTML =`
            <h4><a href= "${repo.html_url}" target="_blank"> ${repo.name}</a></h4>
            <p "> ${repo.description}</p>
            <span id="${languageId}"> ${repo.language}</span>`
            repoList.appendChild(repoElement)
            }
        } )
        
})   
    
    // .then((data)=>{
    //     console.log(data);
           
    //     document.getElementById("result").innerHTML =`
    //     <a href="https://www.github.com/${search}"> <img src="${data.avatar_url}" ></a>`
    // })
    
