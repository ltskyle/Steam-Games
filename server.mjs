import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))

app.get('/game/:appid', async (req, res) => {
    const { appid } = req.params
    try {
        const response = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${appid}&l=english`
        )
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).send('Server error')
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
