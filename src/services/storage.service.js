const ImageKit = require("@imagekit/nodejs")


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || process.env.IMAGE_KIT_PRIVATEKEY
})

async function uploadFile(file) {
    const result = await imagekit.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "spotify/music"
    })

    return result;
}

module.exports = { uploadFile }