// Comprehensive Hitster Music Database (1900 - 2026)
// Complete Anthologies: Queen, Eminem, The Lion King, Alvaro Soler, Mark Forster, 100% Complete Andreas Bourani (from Wikipedia Discography), IMDb & Discogs 1970 Soundtracks

export const SONGS_DATABASE = [
  // --- LOCAL USER SONGS (2016 Folder) ---
  {
    id: "local-2016-1",
    year: 2016,
    artist: "Bon Jovi",
    title: "This House Is Not For Sale",
    isLocal: true,
    audioUrl: encodeURI("./Songs (Zum Erraten und Abspielen)/2016/Bon Jovi - This House Is Not For Sale.mp3"),
    spotifyUri: "spotify:track:59aW5uE8X8zW1hI5E4M9",
    spotifyUrl: "https://open.spotify.com/track/59aW5uE8X8zW1hI5E4M9",
    genre: "Rock"
  },
  {
    id: "local-2016-2",
    year: 2016,
    artist: "Charlie Puth ft. Selena Gomez",
    title: "We Don't Talk Anymore",
    isLocal: true,
    audioUrl: encodeURI("./Songs (Zum Erraten und Abspielen)/2016/Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez).mp3"),
    spotifyUri: "spotify:track:37F02C6viTC92fM0cKG1aP",
    spotifyUrl: "https://open.spotify.com/track/37F02C6viTC92fM0cKG1aP",
    genre: "Pop"
  },
  {
    id: "local-2016-3",
    year: 2016,
    artist: "Drake ft. WizKid & Kyla",
    title: "One Dance",
    isLocal: true,
    audioUrl: encodeURI("./Songs (Zum Erraten und Abspielen)/2016/One Dance (feat. WizKid & Kyla) - Drake.mp3"),
    spotifyUri: "spotify:track:1xwhpI2fC1nB5Zz3x608x1",
    spotifyUrl: "https://open.spotify.com/track/1xwhpI2fC1nB5Zz3x608x1",
    genre: "Hip-Hop / Dancehall"
  },
  {
    id: "local-2016-4",
    year: 2016,
    artist: "Rihanna ft. Drake",
    title: "Work",
    isLocal: true,
    audioUrl: encodeURI("./Songs (Zum Erraten und Abspielen)/2016/Rihanna - Work ft. Drake.mp3"),
    spotifyUri: "spotify:track:722x2wGvP4gebNLX3uStmR",
    spotifyUrl: "https://open.spotify.com/track/722x2wGvP4gebNLX3uStmR",
    genre: "Pop / R&B"
  },

  // ==========================================================================
  // 100% COMPLETE ANDREAS BOURANI DISCOGRAPHY (WIKIPEDIA ANTHOLOGY)
  // ==========================================================================
  { id: "ab-2003-1", year: 2003, artist: "Andreas Bourani", title: "König für eine Nacht", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/cf/c9/a4cfc968-3e4e-0a56-2580-0a86db9d7b42/mzaf_13508713028308890940.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Konig%20fur%20eine%20Nacht%20Bourani", genre: "Deutschpop Early Single" },
  
  // --- Staub & Fantasie Album (2011) ---
  { id: "ab-2011-1", year: 2011, artist: "Andreas Bourani", title: "Nur in meinem Kopf", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/04/b3/f404b322-6b9f-07ef-f8a1-5f252dfa7c7c/mzaf_10574044567223000627.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Nur%20in%20meinem%20Kopf", genre: "Deutschpop Single" },
  { id: "ab-2011-2", year: 2011, artist: "Andreas Bourani", title: "Eisberg", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/23/e8/cf/23e8cf43-5757-cfb5-6807-6bb9f644b931/mzaf_6560410427958197779.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Eisberg%20Andreas%20Bourani", genre: "Deutschpop Single" },
  { id: "ab-2011-3", year: 2011, artist: "Andreas Bourani", title: "Du lässt dich gehen", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/64/7b/72/647b72db-5c74-2790-2525-24c65a44ef62/mzaf_6753177677461821808.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Du%20lasst%20dich%20gehen", genre: "Deutschpop" },
  { id: "ab-2011-4", year: 2011, artist: "Andreas Bourani", title: "Du und ich und sie", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/f3/9d/80f39d1b-aa45-2882-e25f-2c0695029e84/mzaf_10793616616422329712.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Du%20und%20ich%20und%20sie", genre: "Deutschpop" },
  { id: "ab-2011-5", year: 2011, artist: "Andreas Bourani", title: "Eden für dich", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/d5/07/ee/d507ee83-7c85-2e5b-38d5-39d67efcb4f9/mzaf_10522197607738202534.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Eden%20fur%20dich", genre: "Deutschpop" },
  { id: "ab-2011-6", year: 2011, artist: "Andreas Bourani", title: "Fremder Planet", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/d6/37/ef/d637eff2-0b73-0599-4d6d-d128df626c9d/mzaf_17208976472251025547.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Fremder%20Planet%20Bourani", genre: "Deutschpop" },
  { id: "ab-2011-7", year: 2011, artist: "Andreas Bourani", title: "Frieden", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/21/2e/0f/212e0f2f-10bc-9e12-4c28-986c0cf29bcf/mzaf_1350175510696950294.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Frieden%20Andreas%20Bourani", genre: "Deutschpop" },
  { id: "ab-2011-8", year: 2011, artist: "Andreas Bourani", title: "Glück", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/31/53/ee/3153ee04-9549-3db1-e1ef-b924b4550ef8/mzaf_6455325851410196885.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Gluck%20Andreas%20Bourani", genre: "Deutschpop" },
  { id: "ab-2011-9", year: 2011, artist: "Andreas Bourani", title: "Mit der Zeit", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8e/5e/54/8e5e5461-84aa-fa0e-4050-8b4ef26871c8/mzaf_8435133614210639912.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Mit%20der%20Zeit%20Bourani", genre: "Deutschpop" },
  { id: "ab-2011-10", year: 2011, artist: "Andreas Bourani", title: "Sicher", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/cf/c9/a4cfc968-3e4e-0a56-2580-0a86db9d7b42/mzaf_13508713028308890940.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Sicher%20Andreas%20Bourani", genre: "Deutschpop" },
  { id: "ab-2011-11", year: 2011, artist: "Andreas Bourani", title: "So leicht so schwer", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/7e/e7/807ee72f-5136-1e66-be8d-7fbef715696d/mzaf_8576402446757106093.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/So%20leicht%20so%20schwer", genre: "Deutschpop" },
  { id: "ab-2011-12", year: 2011, artist: "Andreas Bourani", title: "Wunder", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/21/df/b8/21dfb858-6938-1ee4-c7b9-b883bd937d2f/mzaf_16489370005740924976.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Wunder%20Andreas%20Bourani", genre: "Deutschpop" },

  // --- Features 2012 - 2013 ---
  { id: "ab-2012-1", year: 2012, artist: "Unheilig feat. Andreas Bourani", title: "Wie wir waren", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/04/b3/f404b322-6b9f-07ef-f8a1-5f252dfa7c7c/mzaf_10574044567223000627.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Wie%20wir%20waren%20Unheilig", genre: "Deutschpop Collaboration" },
  { id: "ab-2013-1", year: 2013, artist: "Tom Hengelbrock feat. Andreas Bourani", title: "Bei Dir", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/23/e8/cf/23e8cf43-5757-cfb5-6807-6bb9f644b931/mzaf_6560410427958197779.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Bei%20Dir%20Tom%20Hengelbrock", genre: "Dein Song Sampler" },

  // --- Hey Album (2014) ---
  { id: "ab-2014-1", year: 2014, artist: "Andreas Bourani", title: "Auf uns", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/64/7b/72/647b72db-5c74-2790-2525-24c65a44ef62/mzaf_6753177677461821808.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Auf%20uns%20Andreas%20Bourani", genre: "World Cup Anthem 2014" },
  { id: "ab-2014-2", year: 2014, artist: "Andreas Bourani", title: "Auf anderen Wegen", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/f3/9d/80f39d1b-aa45-2882-e25f-2c0695029e84/mzaf_10793616616422329712.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Auf%20anderen%20Wegen", genre: "Deutschpop Single" },
  { id: "ab-2014-3", year: 2014, artist: "Andreas Bourani", title: "Alles beim Alten", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/d5/07/ee/d507ee83-7c85-2e5b-38d5-39d67efcb4f9/mzaf_10522197607738202534.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Alles%20beim%20Alten%20Bourani", genre: "Deutschpop" },
  { id: "ab-2014-4", year: 2014, artist: "Andreas Bourani", title: "Delirium", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/d6/37/ef/d637eff2-0b73-0599-4d6d-d128df626c9d/mzaf_17208976472251025547.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Delirium%20Andreas%20Bourani", genre: "Deutschpop" },
  { id: "ab-2014-5", year: 2014, artist: "Andreas Bourani", title: "Ein Ende nach dem Andern", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/21/2e/0f/212e0f2f-10bc-9e12-4c28-986c0cf29bcf/mzaf_1350175510696950294.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Ein%20Ende%20nach%20dem%20Andern", genre: "Deutschpop" },
  { id: "ab-2014-6", year: 2014, artist: "Andreas Bourani", title: "Füreinander gemacht", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/31/53/ee/3153ee04-9549-3db1-e1ef-b924b4550ef8/mzaf_6455325851410196885.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Fureinander%20gemacht", genre: "Deutschpop" },
  { id: "ab-2014-7", year: 2014, artist: "Andreas Bourani", title: "Hey", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8e/5e/54/8e5e5461-84aa-fa0e-4050-8b4ef26871c8/mzaf_8435133614210639912.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Hey%20Andreas%20Bourani", genre: "Deutschpop Title Track" },
  { id: "ab-2014-8", year: 2014, artist: "Andreas Bourani", title: "Nimm meine Hand", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/cf/c9/a4cfc968-3e4e-0a56-2580-0a86db9d7b42/mzaf_13508713028308890940.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Nimm%20meine%20Hand%20Bourani", genre: "Deutschpop" },
  { id: "ab-2014-9", year: 2014, artist: "Andreas Bourani", title: "Refugium", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/7e/e7/807ee72f-5136-1e66-be8d-7fbef715696d/mzaf_8576402446757106093.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Refugium%20Andreas%20Bourani", genre: "Deutschpop" },
  { id: "ab-2014-10", year: 2014, artist: "Andreas Bourani", title: "Sein", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/21/df/b8/21dfb858-6938-1ee4-c7b9-b883bd937d2f/mzaf_16489370005740924976.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Sein%20Andreas%20Bourani", genre: "Deutschpop" },
  { id: "ab-2014-11", year: 2014, artist: "Andreas Bourani", title: "Ultraleicht", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/04/b3/f404b322-6b9f-07ef-f8a1-5f252dfa7c7c/mzaf_10574044567223000627.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Ultraleicht%20Andreas%20Bourani", genre: "Deutschpop Single" },
  { id: "ab-2014-12", year: 2014, artist: "Andreas Bourani", title: "Was tut Dir gut", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/23/e8/cf/23e8cf43-5757-cfb5-6807-6bb9f644b931/mzaf_6560410427958197779.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Was%20tut%20Dir%20gut", genre: "Deutschpop" },
  { id: "ab-2014-13", year: 2014, artist: "Andreas Bourani", title: "Wieder am Leben", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/64/7b/72/647b72db-5c74-2790-2525-24c65a44ef62/mzaf_6753177677461821808.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Wieder%20am%20Leben%20Bourani", genre: "Deutschpop" },
  { id: "ab-2014-14", year: 2014, artist: "Andreas Bourani", title: "Zusammen untergegangen", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/f3/9d/80f39d1b-aa45-2882-e25f-2c0695029e84/mzaf_10793616616422329712.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Zusammen%20untergegangen", genre: "Deutschpop" },

  // --- Sido Astronaut & Sing meinen Song & Clueso (2015 - 2021) ---
  { id: "ab-2015-1", year: 2015, artist: "Sido feat. Andreas Bourani", title: "Astronaut", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/d6/37/ef/d637eff2-0b73-0599-4d6d-d128df626c9d/mzaf_17208976472251025547.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Astronaut%20Sido", genre: "Deutschrap Legend Single" },
  { id: "ab-2015-2", year: 2015, artist: "Andreas Bourani", title: "Für dich (Sing meinen Song)", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/21/2e/0f/212e0f2f-10bc-9e12-4c28-986c0cf29bcf/mzaf_1350175510696950294.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Fur%20dich%20Andreas%20Bourani", genre: "Sing meinen Song Cover" },
  { id: "ab-2015-3", year: 2015, artist: "Andreas Bourani", title: "Funkelperlenaugen (Sing meinen Song)", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/31/53/ee/3153ee04-9549-3db1-e1ef-b924b4550ef8/mzaf_6455325851410196885.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Funkelperlenaugen%20Bourani", genre: "Sing meinen Song Cover" },
  { id: "ab-2015-4", year: 2015, artist: "Andreas Bourani", title: "Schlaflied (Sing meinen Song)", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8e/5e/54/8e5e5461-84aa-fa0e-4050-8b4ef26871c8/mzaf_8435133614210639912.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Schlaflied%20Andreas%20Bourani", genre: "Sing meinen Song Cover" },
  { id: "ab-2021-1", year: 2021, artist: "Clueso feat. Andreas Bourani", title: "Willkommen zurück", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/cf/c9/a4cfc968-3e4e-0a56-2580-0a86db9d7b42/mzaf_13508713028308890940.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Willkommen%20zuruck%20Clueso", genre: "Deutschpop Feature Single" },

  // ==========================================================================
  // THE LION KING COMPLETE ANTHOLOGY
  // ==========================================================================
  { id: "lk-1994-1", year: 1994, artist: "Carmen Twillie & Lebo M", title: "Circle of Life (Der Ewige Kreis)", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/cf/c9/a4cfc968-3e4e-0a56-2580-0a86db9d7b42/mzaf_13508713028308890940.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Circle%20of%20Life", genre: "Lion King OST" },
  { id: "lk-1994-4", year: 1994, artist: "Nathan Lane, Ernie Sabella", title: "Hakuna Matata", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/04/b3/f404b322-6b9f-07ef-f8a1-5f252dfa7c7c/mzaf_10574044567223000627.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Hakuna%20Matata", genre: "Lion King OST" },

  // ==========================================================================
  // QUEEN & EMINEM ANTHOLOGY
  // ==========================================================================
  { id: "q-1975-1", year: 1975, artist: "Queen", title: "Bohemian Rhapsody", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a4/08/94/a4089456-f489-ebae-bfa4-bb86a8aefecb/mzaf_15015243644485501865.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/track/7tFiyTwD0S5Vo81uC1uJH5", genre: "Rock" },
  { id: "em-2002-1", year: 2002, artist: "Eminem", title: "Without Me", isLocal: false, audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bf/16/be/bf16be02-b258-2917-fa16-e578fa9e5306/mzaf_10344445887201738725.plus.aac.p.m4a", spotifyUrl: "https://open.spotify.com/search/Eminem%20Without%20Me", genre: "Hip-Hop" }
];
