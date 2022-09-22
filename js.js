//JavaScript source code

import Player from './player.js'
import createSilentAudio from './silent.js';


/* * * * * * * * * * * * Global Variables * * * * * * * * * * * */
var player = new Player(),
    p = document.getElementById('player'),
    pC = document.getElementById('player-controls'),
    pEx = document.getElementById('player-expander'),
    pI = p.querySelector('#player-inner'),
    pl = document.getElementById('playlist'),
    plEx = document.getElementById('playlist-expander'),
    plI = pl.querySelector('#playlist-inner'),
    sA = pC.querySelectorAll('img')[0],
    aA = pC.querySelectorAll('img')[1],
    audio = pC.querySelector('audio'),
    controls = {
        prev: document.getElementById('control-prev'),
        play: document.getElementById('control-play'),
        next: document.getElementById('control-next'),
        slider: {
            body: document.getElementsByTagName('slider')[0],
            progress: document.getElementsByTagName('slider')[0].querySelector('progress')
        },
        playlist: player.playlist.length,
        len: 0,
        curr: 0,
        percent: 0,
        persist: (callback, ms) => {
            var interval

            return {
                start: function () {
                    if (!interval) {
                        interval = setInterval(callback, ms)
                    }
                },
                stop: function () {
                    clearInterval(interval)
                    interval = ''
                }
            }
        }
    },

    body = document.getElementById('body'),
    playlist = document.getElementById('playlist-inner'),
    currIndex = player.playlistPos,
    persist = controls.persist(update, 500),
    md = 0

/* * * * * * * * * * * * end * * * * * * * * * * * */


/* * * * * * * * * * * * Initialize page * * * * * * * * * * * */

player.songs().forEach((x, y) => {
    let d = player.info(y),

        song = createSong(d)


    body.innerHTML += song

})
playlistCreate()
setCurr()

/* * * * * * * * * * * * end * * * * * * * * * * * */





/* * * * * * * * * * * * Functions * * * * * * * * * * * */

function playlistCreate() {
    plI.innerHTML = ''
    player.playlist.forEach((x, y) => {
        let d = player.info(x),

            song = createSong(d, currIndex == y ? 1 : 0, y)


        plI.innerHTML += song

    })
}
function playlistAdd(id, info) {
    player.playlist = id
    playlist.innerHTML += createSong(info)
}
function playlistRecreate(id, info) {
    player.playlist = -1
    player.playlist = id
    playlist.innerHTML = ''
    playlist.innerHTML += createSong(info)
    play(0)
}

function playPause() {
    controls.play.classList.contains('playing') ?
        pause() :
        resume()
}
function play(x) {
    player.playlistPos = x
    setCurr()
    resume()
}
function prev() {
    if (currIndex > 0) {
        player.playlistPos -= 1
        setCurr()
    }
}
function next() {
    if (currIndex < player.playlist.length - 1) {
        player.playlistPos += 1
        setCurr()
    } else {
        pause()
    }
}
function resume() {
    persist.start()
    audio.play()
    controls.play.classList.add('playing')
}
function pause() {
    audio.pause()
    persist.stop()
    controls.play.classList.remove('playing')
}
function playNext(id) {
    player.playNext(id)
    playlistCreate()
}

function createSong(s, a) {
    let fN = []
    s.artists.forEach((x) => {
        fN.push(x.name)
    })
    let song = `
                <song ${a ? 'id="current"' : ''}>
                <art id = "album-art" >
                <img src="${s.img}" />
                </art >
                <song-title>${s.title}</song-title>
                <song-artists>${fN[0]}</song-artists>
                <span class="material-symbols-outlined pNext" title="Play Next">playlist_play</span>
                <span class="material-symbols-outlined pAdd" title="Add to Playlist">playlist_add</span>
                </song>`;
    if (typeof (i) === 'function') {
        i()
    }
    return song
}
function scrub(e) {
    let i = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX
    let x = ((i - controls.slider.body.offsetLeft) /
        controls.slider.body.clientWidth * 100)
    audio.currentTime = x / 100 * controls.len
    update()
}
function update() {
    controls.len = audio.duration.toFixed(2)
    controls.curr = audio.currentTime.toFixed(2)
    controls.percent = (100 * controls.curr / controls.len).toFixed(2)
    controls.slider.progress.style.width = controls.percent + '%'
    if (controls.curr == controls.len) {
        next()
    }
}
function setCurr() {
    let curr = player.current(),
        current = document.getElementById('current'),
        fN = []

    currIndex = player.playlistPos

    let k = playlist.querySelectorAll('song')[currIndex]
    audio.src = createSilentAudio(curr.duration)

    current ?
        current.id = '' :
        ''
    k.id = 'current'
    curr.artists.forEach((x) => {
        fN.push(x.name)
    })
    sA.src = curr.img
    aA.src = curr.artists[0].img
    pC.querySelector('song-title').innerHTML = curr.title

    //Use [fN] to display all artists,
    //use fN[n] to display specific artist
    pC.querySelector('song-artists').innerHTML = fN[0]
    controls.play.classList.contains('playing') ?
        resume() :
        pause()

    setTimeout(update, 300)
}

/* * * * * * * * * * * * end * * * * * * * * * * * */



/* * * * * * * * * * * * Event Listeners * * * * * * * * * * * */

//Audio track controller
document.addEventListener('mousemove', (e) => {
    md ? scrub(e) : ''
})
document.addEventListener('mouseup', () => {
    md = 0
})
//Playlist handler
body.addEventListener('click', (e) => {
    if (e.target.closest('song')) {
        let songTitle = e.target.closest('song').querySelector('song-title').innerHTML,
            id = player.getSongId(songTitle)


        if (e.target.classList.contains('pNext'))
            playNext(id)
        else if (e.target.classList.contains('pAdd')) {
            let info = player.info(id)
            playlistAdd(id, info)
        } else {
            let info = player.info(id)
            playlistRecreate(id, info)
        }
    }
})
//Tray controller
pEx.addEventListener('click', () => {
    pl.classList.remove('playlist-full')
    pI.classList.toggle('player-full')
})
plEx.addEventListener('click', () => {
    pl.classList.toggle('playlist-full')
})
playlist.addEventListener('click', (e) => {
    let z = e.target.closest('song')
    playlist.querySelectorAll('song').forEach((x, y) => {
        if (x == z) {
            play(y)
        }
    })
})
//Music controls
controls.play.addEventListener('click', () => {
    playPause()
})
controls.next.addEventListener('click', () => {
    next()
})
controls.prev.addEventListener('click', () => {
    prev()
})
controls.slider.body.addEventListener('mousedown', (e) => {
    md = 1
    scrub(e)
})
controls.slider.body.addEventListener('touchmove', (e) => {
    scrub(e)
})

/* * * * * * * * * * * * end * * * * * * * * * * * */