const musicModel = require('../models/music.model')
const albumModel = require('../models/album.model')
const { uploadFile } = require('../services/storage.service')
const jwt = require('jsonwebtoken')


const createMusic = async (req, res) => {

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You don't have access tp create any music" })
        }


        const { title } = req.body;
        const file = req.file

        if (!file) {
            return res.status(400).json({ message: "No music file uploaded" })
        }

        const result = await uploadFile(file.buffer.toString('base64'))

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id
        })

        res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        })
    }
    catch (error) {
        console.log(error)

        return res.status(401).json({ message: "Unauthorized" })
    }
}

const createAlbum = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({message: "You don;t have access to create an album"})
        }

        const {title, musics} = req.body;
        const album = await albumModel.create({
            title,
            artist: decoded.id,
            musics: musics
        })

        res.status(201).json({
            message: "Album created Successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                music: album.musics
            }   
        })


    } catch (error) {
        console.log(error)

        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

module.exports = { createMusic, createAlbum }