var currentPage = 1;
var form = document.getElementById("myForm")
form.addEventListener('submit', formSubmit)



function formSubmit(e){
    e.preventDefault()
        currentPage =1;
        var search = document.getElementById("search").value
        
        fetchUserProfile(search,currentPage)
        
        
    
}
function fetchAllRepo(userProfile){
    const avatarContainer=document.getElementById("avatar-container").innerHTML = ""

    fetch("https://api.github.com/users/" + userProfile)
        .then((response) => response.json())
        .then( (data)  => {
            const avatarUrl = data.avatar_url;
            const avatarContainer =document.getElementById("avatar-container");
            const avatarImage = document.createElement("img");
            avatarImage.src = avatarUrl;
            avatarContainer.appendChild(avatarImage);
        
        });
    
        fetch(`https://api.github.com/users/${userProfile}/repos?per_page=100`)
        .then( (response) =>response.json() )
        .then( (data) => {
                console.log(data)
                const repoList = document.getElementById("repo-container");
                repoList.innerHTML = "";
                    
    
                for (const repo of data) {
                    const languageId = `language-${repo.language}`
                    
                    const repoElement =document.createElement("li")
                
                    repoElement.style.listStyleType = "none";
                    repoElement.innerHTML =`<div id="repo-list">
                    <h4><a href= "${repo.html_url}" target="_blank"> ${repo.name}</a></h4>
                    <p id="description"> ${repo.description}</p>
                    <span id="${languageId}" class="language-size"> ${repo.language}</span></div>`
                    
                    repoList.appendChild(repoElement)
                        
                    
                }
                
                
    
              
                    
        });    
        
       
}

function fetchUserProfile(userProfile,page){

    const avatarContainer=document.getElementById("avatar-container").innerHTML = ""
    
    //fetching user info
    fetch("https://api.github.com/users/" + userProfile)
        .then((response) => response.json())
        .then( (data)  => {
            const avatarUrl = data.avatar_url;
            const avatarContainer =document.getElementById("avatar-container");
            const avatarImage = document.createElement("img");
            avatarImage.src = avatarUrl;
            avatarContainer.appendChild(avatarImage);
        
        });

    //fetch user repo with pagination
    const perPage = 10
    const repoList = document.getElementById('repo-container')

    fetch(`https://api.github.com/users/${userProfile}/repos?page=${page}&per_page=${perPage}`)
    .then( (response) =>response.json() )
    .then( (data) => {
            console.log(data)
            const repoList = document.getElementById("repo-container");
            repoList.innerHTML = "";
                

            for (const repo of data) {
                const languageId = `language-${repo.language}`
                
                const repoElement =document.createElement("li")
            
                repoElement.style.listStyleType = "none";
                repoElement.innerHTML =`<div id="repo-list">
                <h4><a href= "${repo.html_url}" target="_blank"> ${repo.name}</a></h4>
                <p id="description"> ${repo.description}</p>
                <span id="${languageId}" class="language-size"> ${repo.language}</span></div>`
                
                repoList.appendChild(repoElement)
                    
                
            }
            
            
    });
    //update current page indication
    document.getElementById("currentPage").textContent = `Page ${page}`;

   

}

function paginationButton(event){
    const buttonId = event.target.id;
    // console.log(buttonId)
    
    
    if(buttonId === "prevPage" && currentPage > 1 ){
        
        currentPage --;
        
        

        
    }else if(buttonId ==="nextPage"){
        currentPage++;
        
    }
    //fetch user infor with updated page
    var search = document.getElementById("search").value
    fetchUserProfile(search,currentPage);
    
}
function allRepoBtn(event){
    const buttonId =event.target.id;

    var search=document.getElementById("search").value

    fetchAllRepo(search)
    


}





//add event 
document.getElementById("prevPage").addEventListener("click",paginationButton)
document.getElementById("nextPage").addEventListener("click",paginationButton)
document.getElementById("loadMoreButton").addEventListener("click",allRepoBtn)
    

     
