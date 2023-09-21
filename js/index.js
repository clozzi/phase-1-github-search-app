document.addEventListener('submit', (e) => {
    let userInput = document.getElementById('search').value
    fetch(`https://api.github.com/search/users?q=${userInput}`)
        .then((res) => res.json())
        .then(users => users['items'].forEach(user => {
            displayUser(user)
        }))
    e.preventDefault()
})

function displayUser(user) {
    let userDiv = document.createElement('div')
    let userName = document.createElement('h3')
    let userList = document.getElementById('user-list')
    userName.textContent = user['login']
    userDiv.append(userName)
    let userAvatar = document.createElement('img')
    userAvatar.src = user['avatar_url']
    userAvatar.width = 100
    userAvatar.height = 100
    userDiv.append(userAvatar)
    let userLink = document.createElement('p')
    userLink.href = user['url']
    userLink.textContent = "Git Link"
    userDiv.append(userLink)
    userDiv.addEventListener('click', () => {
        fetch (`https://api.github.com/users/${userName.textContent}/repos`)
            .then((res) => res.json())
            .then(repos => repos.forEach(repo => {
                displayRepos(repo)
            }))
    })
    userList.append(userDiv)
}

function displayRepos(repo) {
    console.log(repo['html_url'])
    let repoLink = document.createElement('p')
    repoLink.textContent = repo['html_url']
    let repoList = document.getElementById('repos-list')
    repoList.append(repoLink)
}
//console.log(repos[0]['html_url'])