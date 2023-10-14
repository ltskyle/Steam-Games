let games = [
    { name: 'Counter-Strike', appid: 10 },
    { name: 'Team Fortress 2', appid: 440 },
    { name: 'Dota 2', appid: 570 },
    { name: 'Counter-Strike: Global Offensive', appid: 730 },
    { name: 'PlayerUnknown’s Battlegrounds', appid: 578080 },
    { name: 'Sid Meier’s Civilization VI', appid: 289070 },
    { name: 'Rocket League', appid: 252950 },
    { name: 'The Elder Scrolls V: Skyrim', appid: 72850 },
    { name: 'Stardew Valley', appid: 413150 },
    { name: 'Terraria', appid: 105600 },
    { name: 'Portal 2', appid: 620 },
    { name: 'The Witcher 3: Wild Hunt', appid: 292030 },
    { name: 'Rust', appid: 252490 },
    { name: 'Garry’s Mod', appid: 4000 },
    { name: 'Among Us', appid: 945360 },
    { name: 'Cyberpunk 2077', appid: 1091500 },
    { name: 'ARK: Survival Evolved', appid: 346110 },
    { name: 'Grand Theft Auto V', appid: 271590 },
    { name: 'Fallout 4', appid: 377160 },
    { name: 'Valheim', appid: 892970 },
    { name: 'Factorio', appid: 427520 },
    { name: 'Hades', appid: 1145360 },
    { name: 'Phasmophobia', appid: 739630 },
    { name: 'DayZ', appid: 221100 },
    { name: 'Europa Universalis IV', appid: 236850 },
    { name: 'Wallpaper Engine', appid: 431960 },
    { name: 'Undertale', appid: 391540 },
    { name: 'Stellaris', appid: 281990 },
    { name: 'Hearts of Iron IV', appid: 394360 },
    { name: 'Warframe', appid: 230410 },
]

window.onload = populateDropdown

function populateDropdown() {
    const dropdown = document.getElementById('gameDropdown')
    games.forEach((game) => {
        let option = document.createElement('option')
        option.value = game.appid
        option.textContent = game.name
        dropdown.appendChild(option)
    })
}

function selectGame() {
    const dropdown = document.getElementById('gameDropdown')
    const selectedAppId = dropdown.value
    if (selectedAppId) {
        fetchGameDetails(selectedAppId)
    }
}

function fetchGameDetails(appid) {
    const apiUrl = `http://localhost:3000/game/${appid}`

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data[appid].success) {
                displayGameDetails(data[appid].data)
            } else {
                console.error('Failed to fetch game details')
            }
        })
        .catch((error) => console.error('Error:', error))
}

function displayGameDetails(game) {
    const gameDiv = document.getElementById('gameInfo')

    // Check if the game or its properties are null/undefined
    if (!game || !game.name || !game.header_image || !game.short_description) {
        gameDiv.innerHTML =
            '<p>Error: Unable to retrieve game details. Please try again later.</p>'
        console.error('Incomplete game data:', game)
        return
    }

    const websiteLink = game.website
        ? `<a href="${game.website}" target="_blank">Official Website</a>`
        : '<p>No official website available.</p>'

    gameDiv.innerHTML = `
        <h2>${game.name}</h2>
        <img src="${game.header_image}" alt="${game.name}">
        <p>${game.short_description}</p>
        ${websiteLink}
    `
}
