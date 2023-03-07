/* eslint-disable no-unused-vars */
const { SongStore } = require('../stores')
const mongodb = require('../mongodb-config')

const {
  utils
} = require('../stores')

// ADD YOUR ARRAY HEAR
const songs = []

const test = async () => {
  try {
    let timestemp = Date.now()
    console.log('Script is started running on ', timestemp)

    await mongodb.getOrInitializeDatabase()

    for (const [ index, song ] of songs.entries()) {
      console.log('\x1B[31m test => workingOn :: ', index)
      await SongStore.save(song)
    }

    console.log('Script is started running on ', (Date.now() - timestemp) / 60)
  } catch (exception) {
    utils.logError('Error migrating. ', exception)
  }
  process.exit(1)
}

test()

// for browser Run
// const songs = []
// document.querySelectorAll('.table_row').forEach((raw, index) => {
//
//   const link = raw.children[4].children[0].children[0].children[2].value
//   let link_type = 'OTHER'
//
//   if (link.includes('youtu')) {
//     link_type = 'YOUTUBE'
//   }
//
//   if (link.includes('spotify')) {
//     link_type = 'SPOTIFY'
//   }
//
//   songs.push({
//     link,
//     link_type,
//     name: raw.children[1].children[0].innerText,
//     suggestion: raw.children[3].children[0].innerText,
//     tags: raw.children[2].children[0].innerText.split('\n')
//   })
// })
//
// const othersLink = songs.filter((song) => song.link_type === 'OTHER')
//
// console.log('othersLink', othersLink)
// console.log('Final links songs', songs)