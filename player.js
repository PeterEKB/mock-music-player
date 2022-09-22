// JavaScript source code
class Player {

    /* * * * * * * * * * * * Private Global Variables * * * * * * * * * * * */
    #_playlist = [0, 3, 4]
    #native = {
        current: 0,
    }

    /*   *   *   *   *   *   Relational DB Simulation(auto_increment)  *   *   *   *   *   */
    #_artists = [
        {
            name: 'Peter Blankson',
            dob: { y: 2022, m: 9, d: 11 },
            addr: { city: 'Chicago', state: 'Illinois' },
            img: 'https://media-exp1.licdn.com/dms/image/C5603AQEdkYTQb7OgeQ/profile-displayphoto-shrink_800_800/0/1659647574069?e=1668643200&v=beta&t=4oBupgj9_iejnY_FNWDLXBBhoW1VqAbjWgzz27Yle-g'
        },
        {
            name: 'John Doe',
            dob: { y: 2022, m: 9, d: 11 },
            addr: { city: 'Chicago', state: 'Illinois' },
            img: ''
        },
        {
            name: 'Omah Lay',
            dob: { y: 2022, m: 9, d: 11 },
            addr: { city: 'Chicago', state: 'Illinois' },
            img: 'https://i0.wp.com/austinemedia.com/wp-content/uploads/2021/03/2.jpeg?fit=1080%2C1350&ssl=1'
        },
        {
            name: 'Chris Brown',
            dob: { y: 2022, m: 9, d: 11 },
            addr: { city: 'Chicago', state: 'Illinois' },
            img: 'https://thesource.com/wp-content/uploads/2021/06/Screen-Shot-2021-06-22-at-9.10.12-AM.png'
        },
        {
            name: 'Wiz Kid',
            dob: { y: 2022, m: 9, d: 11 },
            addr: { city: 'Chicago', state: 'Illinois' },
            img: 'https://i0.wp.com/austinemedia.com/wp-content/uploads/2021/03/2.jpeg?fit=1080%2C1350&ssl=1'
        }
    ]
    #_songs = [
        {
            title: 'SDE',
            duration: 10,
            yearCreated: 2022,
            img: 'https://media-exp1.licdn.com/dms/image/C4D16AQEokgTG8u2WiA/profile-displaybackgroundimage-shrink_350_1400/0/1652297450697?e=1668643200&v=beta&t=jQKE4RsyIm9HFntvwcAbwNl5gBSSK6I6G4ZDti6xm8E'
        },
        {
            title: 'Full Stack',
            duration: 5,
            yearCreated: 2022,
            img: ''
        },
        {
            title: 'Node.js',
            duration: 20,
            yearCreated: 2022,
            img: ''
        },
        {
            title: 'Free My Mind',
            duration: 176,
            yearCreated: 2021,
            img: 'https://i.scdn.co/image/ab67616d0000b273ba2a2824b58fe7fc481c9c62'
        },
        {
            title: 'Call Me Every Day (feat. Wizkid)',
            duration: 147,
            yearCreated: 2022,
            img: 'https://i.ytimg.com/vi/syItp7nKTik/maxresdefault.jpg'
        }
    ]
    #_songArtist = [
        { song: 0, artist: 0 },
        { song: 0, artist: 1 },
        { song: 1, artist: 0 },
        { song: 2, artist: 0 },
        { song: 3, artist: 2 },
        { song: 4, artist: 3 },
        { song: 4, artist: 4 }
    ]
    /*   *   *   *   *   *   end  *   *   *   *   *   */
    /* * * * * * * * * * * * end * * * * * * * * * * * */


    constructor(obj) { }

    /* * * * * * * * * * * * Getters/Setters * * * * * * * * * * * */
    //Gets playlist
    get playlist() {
        return this.#_playlist
    }
    //Format playlist
    set playlist(s) {
        s == -1 || s === 'clear' ?
            this.#_playlist = [] :
            this.#_playlist.push(s)
    }
    //Get the currently playing song from playlist
    get playlistPos() {
        return this.#native.current;
    }
    //Set the currently playing song in playlist
    set playlistPos(s) {
        if (s < this.#_playlist.length)
            this.#native.current = s;
    }

    /* * * * * * * * * * * * end * * * * * * * * * * * */

    /* * * * * * * * * * * * Public Functions * * * * * * * * * * * */
    play(s) {
        let len = this.#_playlist.length

        this.#_playlist[len] = s
        this.#native.current = len
    }
    playNext(s) {
        this.#_playlist.splice(this.#native.current + 1, 0, s)
    }
    current() {
        return this.info(this.#_playlist[this.#native.current])
    }
    currentIndex() {
        return this.#_playlist[this.#native.current]
    }
    //Simulates SELECT songs.*, artist.* FROM songArtist INNER JOIN song ON songArtist.song_ID = songs.song_ID INNER JOIN artists ON songArtist.artist_ID = artists.artist_ID
    info(s) {
        let res = this.#_songs[s]
        res.artists = []
        res.id = s


        this.#_songArtist.forEach((x) => {
            if (x.song == s) {
                res.artists.push(this.#_artists[x.artist])
            }
        })

        return res
    }
    //Simulates SQL SELECT * FROM songs
    songs() {
        return this.#_songs
    }
    //Simulate SQL SELECT song_ID FROM songs WHERE song_Name = :s
    getSongId(s) {
        let res = -1
        this.#_songs.forEach((x, y) => {
            if (x.title == s) {
                res = y
            }
        })
        return res
    }

    /* * * * * * * * * * * * end * * * * * * * * * * * */
}

export default Player